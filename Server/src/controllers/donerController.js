import {
  SignupDoner,
  SigninDoner,
  OAuthSignin,
} from "../modules/auth/donerAuth.js";

export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Doner Signup:", { name, email, password });
    console.log(name, email, password);
    const newDoner = await SignupDoner({ name, email, password });
    res
      .status(201)
      .json({ ...newDoner, message: "Signup successful", status_code: 201 });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const OAuthLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const authToken = await OAuthSignin(token);
    res.status(200).json({ token: authToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const Logout = async (req, res) => {
  try {
    // For JWT, logout is typically handled client-side by removing the token
    // Server-side logout would require token blacklisting (not implemented here)
    res.status(200).json({ message: "Logout successful", status_code: 200 });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
