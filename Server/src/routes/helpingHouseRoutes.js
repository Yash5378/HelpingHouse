import express from "express";
import {
  getAllHelpingHouses,
  Signup,
  Logout,
  uploadNgoCertificate,
  GetAllHelpingHousePerson,
  CreateHelpingHousePerson,
  GetHelpingHouseDashboard,
} from "../controllers/helpingHouseController.js";
import { authenticateHelpingHouse } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllHelpingHouses);
router.post("/signup", Signup);
router.post("/logout", Logout);

// Protected routes - require helping house authentication
router.get("/dashboard", authenticateHelpingHouse, GetHelpingHouseDashboard);
router.get(
  "/dashboard/persons",
  authenticateHelpingHouse,
  GetAllHelpingHousePerson
);
router.post("/persons", authenticateHelpingHouse, CreateHelpingHousePerson);

export default router;
