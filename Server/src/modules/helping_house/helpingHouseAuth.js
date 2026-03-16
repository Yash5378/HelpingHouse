import { eq } from "drizzle-orm";
import { db } from "../../db/DbConnection.js";
import { helpingHouse } from "../../db/schema/helpingHouseSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Register a new helping house
 * @param {Object} data - Registration data
 * @param {string} data.fullName - Full name or organization name
 * @param {string} data.email - Email address
 * @param {string} data.phone - Phone number
 * @param {string} data.address - Physical address
 * @param {string} data.password - Password
 * @param {string} data.website - Website URL (optional)
 * @param {Buffer} data.ngoCertificateBuffer - NGO certificate file buffer
 * @param {string} data.ngoCertificateFileName - NGO certificate original file name
 * @param {string} data.ngoCertificateMimeType - NGO certificate MIME type
 * @returns {Promise<Object>} Newly created helping house
 */
export const SignupHelpingHouse = async ({
  name,
  email,
  phone,
  address,
  password,
  website,
  ngoType,
  // ngoCertificateBuffer,
  // ngoCertificateFileName,
  // ngoCertificateMimeType,
}) => {
  try {
    // Validate required fields
    // if (!ngoCertificateBuffer || !ngoCertificateFileName) {
    //   throw new Error("NGO registration certificate is required");
    // }

    // // Validate file type (must be PDF)
    // if (ngoCertificateMimeType !== "application/pdf") {
    //   throw new Error("NGO registration certificate must be a PDF file");
    // }

    // Check if user already exists
    const existUser = await db
      .select()
      .from(helpingHouse)
      .where(eq(helpingHouse.email, email));

    if (existUser.length > 0) {
      throw new Error("User with this email already exists");
    }

    // Upload NGO certificate to Firebase Storage
    // const { uploadToFirebaseStorage } = await import(
    //   "../../utils/firebaseStorage.js"
    // );
    // const certificateUrl = await uploadToFirebaseStorage(
    //   ngoCertificateBuffer,
    //   ngoCertificateFileName,
    //   ngoCertificateMimeType,
    //   "ngo-certificates/"
    // );

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create new helping house
    const [newHelpingHouse] = await db
      .insert(helpingHouse)
      .values({
        name,
        email,
        passwordHash,
        address,
        phone,
        website,
        ngoType,
        // ngoCertificateUrl: certificateUrl,
        isActive: true,
      })
      .returning({
        id: helpingHouse.id,
        name: helpingHouse.name,
        email: helpingHouse.email,
        address: helpingHouse.address,
        phone: helpingHouse.phone,
        website: helpingHouse.website,
        // ngoCertificateUrl: helpingHouse.ngoCertificateUrl,
      });

    return newHelpingHouse;
  } catch (error) {
    // Handle database errors
    if (
      error.message &&
      error.message.includes("client password must be a string")
    ) {
      throw new Error(
        "Database connection error: The password in DATABASE_URL must be a string. Please check your .env file and ensure the password is properly formatted. If your password contains special characters, make sure they are URL-encoded."
      );
    }
    if (error.code === "42P01") {
      throw new Error(
        "Database table 'helpingHouse' does not exist. Please run migrations using: npm run db:push"
      );
    }
    if (error.code === "23505") {
      throw new Error("User with this email already exists");
    }
    if (error.code === "ECONNREFUSED" || error.message?.includes("connect")) {
      throw new Error(
        "Cannot connect to database. Please ensure PostgreSQL is running and DATABASE_URL is correct."
      );
    }
    throw error;
  }
};

/**
 * Sign in an existing helping house
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - Email address
 * @param {string} credentials.password - Password
 * @returns {Promise<string>} JWT token
 */
export const SigninHelpingHouse = async ({ email, password }) => {
  try {
    // Find user by email
    const [existingUser] = await db
      .select()
      .from(helpingHouse)
      .where(eq(helpingHouse.email, email));

    if (!existingUser) {
      throw new Error("User with this email does not exist");
    }

    // Validate password
    const validatePassword = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!validatePassword) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign(
      { id: existingUser.id, role: "helping_house" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return token;
  } catch (error) {
    // Handle database errors
    if (
      error.message &&
      error.message.includes("client password must be a string")
    ) {
      throw new Error(
        "Database connection error: The password in DATABASE_URL must be a string. Please check your .env file and ensure the password is properly formatted. If your password contains special characters, make sure they are URL-encoded."
      );
    }
    if (error.code === "42P01") {
      throw new Error(
        "Database table 'helpingHouse' does not exist. Please run migrations using: npm run db:push"
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
