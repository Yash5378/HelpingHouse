/**
 * authService.js
 * ─────────────────────────────────────────────────────────────
 * Authentication service for Helping House application.
 * Handles donor and helping house registration, and Google OAuth.
 * ─────────────────────────────────────────────────────────────
 */

import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// ── Firebase Configuration ────────────────────────────────────
// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "your-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-auth-domain",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-storage-bucket",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "your-sender-id",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "your-app-id",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ── API Base URL ──────────────────────────────────────────────
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// ─────────────────────────────────────────────────────────────

/**
 * Register a new donor account
 * @param {Object} userData - Donor registration data
 * @param {string} userData.fullName - Full name of the donor
 * @param {string} userData.email - Email address
 * @param {string} userData.phone - Phone number
 * @param {string} userData.password - Password
 * @returns {Promise<Object>} Registration response
 */
export const registerDonor = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup_doner`, {
      name: userData.fullName,
      email: userData.email,
      password: userData.password,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || "Registration failed";
    throw new Error(errorMessage);
  }
};

/**
 * Register a new helping house account
 * @param {Object} userData - Helping house registration data
 * @param {string} userData.fullName - Full name or organization name
 * @param {string} userData.email - Email address
 * @param {string} userData.phone - Phone number
 * @param {string} userData.address - Physical address
 * @param {string} userData.password - Password
 * @returns {Promise<Object>} Registration response
 */
export const registerHelpingHouse = async (userData) => {
  try {

    console.log("userData",userData)
    const response = await axios.post(`${API_BASE_URL}/api/helping_house/signup`, {
      name: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      password: userData.password,
      ngoType:userData.ngoType,
      website:userData.website
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || "Registration failed";
    throw new Error(errorMessage);
  }
};

/**
 * Sign in with Google OAuth
 * @returns {Promise<Object>} Authentication response with token
 */
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
    const response = await axios.post(`${API_BASE_URL}/oauth_doner`, {
      token: idToken,
    });
    
    return response.data;
  } catch (error) {
    if (error.code === "auth/popup-closed-by-user") {
      throw new Error("Sign-in cancelled");
    }
    const errorMessage = error.response?.data?.error || error.message || "Google sign-in failed";
    throw new Error(errorMessage);
  }
};
