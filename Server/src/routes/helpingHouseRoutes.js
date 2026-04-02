import express from "express";
import {
  getAllHelpingHouses,
  Signup,
  Logout,
  uploadNgoCertificate,
  GetAllHelpingHousePerson,
  CreateHelpingHousePerson,
  GetHelpingHouseDashboard,
  getHelpingHouseById,
  EditHelpingHouse,
  DeletePerson,
} from "../controllers/helpingHouseController.js";
import { authenticateHelpingHouse } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllHelpingHouses);
router.post("/signup", Signup);
router.post("/logout", Logout);
router.get("/:id", getHelpingHouseById);
router.put("/:id", authenticateHelpingHouse, EditHelpingHouse);
router.delete("/persons/:id", authenticateHelpingHouse, DeletePerson);

// Protected routes - require helping house authentication
router.get(
  "/dashboard/:id",
  authenticateHelpingHouse,
  GetHelpingHouseDashboard,
);
router.get(
  "/dashboard/persons",
  authenticateHelpingHouse,
  GetAllHelpingHousePerson,
);
router.post("/persons", authenticateHelpingHouse, CreateHelpingHousePerson);

export default router;
