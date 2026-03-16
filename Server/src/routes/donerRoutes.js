import e from "express";
import {
  Signup,
  OAuthLogin,
  Logout,
} from "../controllers/donerController.js";
const router = e.Router();

router.post("/signup_doner", Signup);

router.post("/oauth_doner", OAuthLogin);
router.post("/logout", Logout);

export default router;
