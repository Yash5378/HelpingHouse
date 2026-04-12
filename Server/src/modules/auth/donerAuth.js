import { eq } from "drizzle-orm";
import admin from "../../config/firebase.js";
import { db } from "../../db/DbConnection.js";
import { doner } from "../../db/schema/donerSchema.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export const SignupDoner = async ({ name, email, password }) => {
  try {
    const existUser = await db
      .select()
      .from(doner)
      .where(eq(doner.email, email));
    console.log(existUser);

    if (existUser.length > 0) {
      throw new Error("User with this email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const [newDoner] = await db
      .insert(doner)
      .values({
        name,
        email,
        passwordHash,
        authProvider: "local",
      })
      .returning({
        id: doner.id,
        name: doner.name,
        email: doner.email,
      });

    const token = jwt.sign(
      { id: newDoner.id, role: "doner" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { token, user: { ...newDoner, role: "doner" }, userType: "doner" };
  } catch (error) {
    // Check if it's a PostgreSQL authentication error
    if (
      error.message &&
      error.message.includes("client password must be a string")
    ) {
      throw new Error(
        "Database connection error: The password in DATABASE_URL must be a string. Please check your .env file and ensure the password is properly formatted. If your password contains special characters, make sure they are URL-encoded."
      );
    }
    // Check if it's a PostgreSQL error (table doesn't exist, etc.)
    if (error.code === "42P01") {
      throw new Error(
        "Database table 'doner' does not exist. Please run migrations using: npm run db:push"
      );
    }
    // Check for other common PostgreSQL errors
    if (error.code === "23505") {
      throw new Error("User with this email already exists");
    }
    if (error.code === "ECONNREFUSED" || error.message?.includes("connect")) {
      throw new Error(
        "Cannot connect to database. Please ensure PostgreSQL is running and DATABASE_URL is correct."
      );
    }
    if (error.message && error.message.includes("Failed query")) {
      const originalError = error.cause || error.original || error;
      throw new Error(
        `Database error: ${
          originalError.message || error.message
        }. Please ensure the database table exists and migrations are run. Original error code: ${
          error.code || "unknown"
        }`
      );
    }
    throw error;
  }
};

export const SigninDoner = async ({ email, password }) => {
  try {
    const [existingUser] = await db
      .select()
      .from(doner)
      .where(eq(doner.email, email));

    if (!existingUser) {
      throw new Error("User with this email does not exist");
    }
    const validatePassword = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!validatePassword) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      { id: existingUser.id, role: "doner" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return token;
  } catch (error) {
    // Check if it's a PostgreSQL authentication error
    if (
      error.message &&
      error.message.includes("client password must be a string")
    ) {
      throw new Error(
        "Database connection error: The password in DATABASE_URL must be a string. Please check your .env file and ensure the password is properly formatted. If your password contains special characters, make sure they are URL-encoded."
      );
    }
    // Check if it's a PostgreSQL error (table doesn't exist, etc.)
    if (error.code === "42P01") {
      throw new Error(
        "Database table 'doner' does not exist. Please run migrations using: npm run db:push"
      );
    }
    if (error.code === "ECONNREFUSED" || error.message?.includes("connect")) {
      throw new Error(
        "Cannot connect to database. Please ensure PostgreSQL is running and DATABASE_URL is correct."
      );
    }
    throw error;
  }
};

export const OAuthSignin = async (token) => {
  try {
    if (!admin) {
        throw new Error("Firebase Admin not initialized");
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name, uid, picture } = decodedToken;

    let [user] = await db
      .select()
      .from(doner)
      .where(eq(doner.email, email));

    if (!user) {
      // Create new user
      [user] = await db
        .insert(doner)
        .values({
          name: name || "Unknown",
          email,
          firebaseUid: uid,
          authProvider: "firebase",
          isActive: true, // scalable to other providers
        })
        .returning();
    } else {
        // Update firebaseUid if missing
        if (!user.firebaseUid) {
             [user] = await db.update(doner).set({ firebaseUid: uid, authProvider: 'firebase' }).where(eq(doner.id, user.id)).returning();
        }
    }

    const jwtToken = jwt.sign(
      { id: user.id, role: "doner" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return jwtToken;
  } catch (error) {
    console.error("OAuth Error:", error);
    throw new Error(error.message || "Authentication failed");
  }
};
