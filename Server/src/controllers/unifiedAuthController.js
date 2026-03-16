import { db } from "../db/DbConnection.js";
import { doner } from "../db/schema/donerSchema.js";
import { helpingHouse } from "../db/schema/helpingHouseSchema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Unified sign-in function for both doners and helping houses
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - Email address
 * @param {string} credentials.password - Password
 * @returns {Promise<Object>} User data with JWT token and role
 */
export const unifiedSignin = async ({ email, password }) => {
  try {
    // First, try to find user in doner table
    let [user] = await db.select().from(doner).where(eq(doner.email, email));

    let userType = "doner";

    // If not found in doner table, check helping house table
    if (!user) {
      [user] = await db
        .select()
        .from(helpingHouse)
        .where(eq(helpingHouse.email, email));

      userType = "helping_house";
    }

    // If user not found in either table
    if (!user) {
      throw new Error("User with this email does not exist");
    }

    // Check if user is active (for helping houses)
    if (userType === "helping_house" && user.isActive === false) {
      throw new Error("Account is deactivated. Please contact support.");
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    // Generate JWT token with role
    const token = jwt.sign(
      {
        id: user.id,
        role: userType,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Return user data (excluding sensitive information)
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: userType,
      ...(userType === "helping_house" && {
        address: user.address,
        phone: user.phone,
        website: user.website,
        ngoType: user.ngoType,
        isActive: user.isActive,
        isApproved: user.isApproved,
      }),
    };

    return {
      token,
      user: userData,
      userType,
    };
  } catch (error) {
    // Handle database errors
    if (error.code === "ECONNREFUSED" || error.message?.includes("connect")) {
      throw new Error("Database connection error. Please try again later.");
    }
    throw error;
  }
};

export const unifiedSigninHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
        message: "Please provide both email and password",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
        message: "Please provide a valid email address",
      });
    }

    const result = await unifiedSignin({ email, password });

    res.status(200).json({
      success: true,
      token: result.token,
      user: result.user,
      userType: result.userType,
      message: "Login successful",
      status_code: 200,
    });
  } catch (error) {
    console.error("Unified sign-in error:", error);

    // Handle specific error types
    if (error.message === "User with this email does not exist") {
      return res.status(404).json({
        error: "User not found",
        message: "No account found with this email address",
      });
    }

    if (error.message === "Invalid password") {
      return res.status(400).json({
        error: "Invalid password",
        message: "The password you entered is incorrect",
      });
    }

    // Generic error response
    res.status(500).json({
      error: "Login failed",
      message: error.message || "An error occurred during login",
    });
  }
};
