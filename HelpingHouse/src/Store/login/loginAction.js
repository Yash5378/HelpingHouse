import axios from "axios";
import { DONER_LOGIN, SIGNUP_DONER } from "./loginType";
import { DonerLogin, SignupDonerUrl } from "../../utils/Api";

export const donerLogin = (values) => async (dispatch) => {
  try {
    dispatch({ type: DONER_LOGIN.DONER_LOGIN_REQUEST });
    const response = await axios.post(DonerLogin, values);
    dispatch({ type: DONER_LOGIN.DONER_LOGIN_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({
      type: DONER_LOGIN.DONER_LOGIN_FAILURE,
      payload: error.response.data,
    });
    return error.response.data;
  }
};

export const SignupDoner = (value) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_DONER.SIGNUP_DONER_REQUEST });
    const response = await axios.post(SignupDonerUrl, value);
    dispatch({
      type: SIGNUP_DONER.SIGNUP_DONER_SUCCESS,
      payload: response?.data,
    });
    return response?.data;
  } catch (error) {
    dispatch({
      type: SIGNUP_DONER.SIGNUP_DONER_FAILURE,
      payload: response.data,
    });
    return response.data;
  }
};

/**
 * Login user with email and password
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} Login response with token
 */
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post("http://localhost:3000/signin_doner", {
      email: credentials.email,
      password: credentials.password,
    });

    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || error.message || "Login failed";
    throw new Error(errorMessage);
  }
};

/**
 * Login with Google OAuth
 * Uses the authService for Google authentication
 * @returns {Promise<Object>} Login response with token
 */
export const loginWithGoogle = async () => {
  try {
    // Import dynamically to avoid circular dependencies
    const { loginWithGoogle: googleAuth } =
      await import("../../services/authService");
    const response = await googleAuth();

    if (response.token) {
      localStorage.setItem("userData", JSON.stringify(response));
    }

    return response;
  } catch (error) {
    throw error;
  }
};
