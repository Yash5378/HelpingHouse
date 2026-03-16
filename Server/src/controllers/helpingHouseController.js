import { db } from "../db/DbConnection.js";
import { helpingHouse } from "../db/schema/helpingHouseSchema.js";
import { helpingHousePerson } from "../db/schema/helpingHousePerson.js";
import {
  SignupHelpingHouse,
  SigninHelpingHouse,
} from "../modules/helping_house/helpingHouseAuth.js";
import multer from "multer";
import { eq } from "drizzle-orm";

// Configure multer for memory storage (to upload to Firebase)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only allow PDF files
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only PDF files are allowed for NGO registration certificate"
        ),
        false
      );
    }
  },
});

// Middleware for handling NGO certificate upload
export const uploadNgoCertificate = upload.single("ngoCertificate");

export const getAllHelpingHouses = async (req, res) => {
  try {
    const allHelpingHouses = await db
      .select({
        id: helpingHouse.id,
        name: helpingHouse.name,
        email: helpingHouse.email,
        address: helpingHouse.address,
        phone: helpingHouse.phone,
        website: helpingHouse.website,
        // ngoCertificateUrl: helpingHouse.ngoCertificateUrl,
        isActive: helpingHouse.isActive,
        createdAt: helpingHouse.createdAt,
        ngoType: helpingHouse.ngoType,
        isApproved: helpingHouse.isApproved,
      })
      .from(helpingHouse);

    res.status(200).json(allHelpingHouses);
  } catch (error) {
    console.error("Error fetching helping houses:", error);
    res.status(500).json({ error: "Failed to fetch helping houses" });
  }
};

export const Signup = async (req, res) => {
  try {
    const { name, email, phone, address, password, website, ngoType } =
      req.body;

    console.log("Helping House Signup:", {
      name,
      email,
      phone,
      address,
      website,
      ngoType,
    });

    const newHelpingHouse = await SignupHelpingHouse({
      name,
      email,
      phone,
      address,
      password,
      website,
      ngoType,
    });

    res.status(201).json({
      ...newHelpingHouse,
      message: "Signup successful",
      status_code: 201,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const Logout = async (req, res) => {
  try {
    // For JWT, logout is typically handled client-side by removing the token
    // Server-side logout would require token blacklisting (not implemented here)
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const GetAllHelpingHousePerson = async (req, res) => {
  try {
    // Get helping house ID from authenticated user (not from params for security)
    const helpingHouseId = req.user.id;

    const allHelpingHousePerson = await db
      .select()
      .from(helpingHousePerson)
      .where(eq(helpingHousePerson.helpingHouseId, helpingHouseId));

    res.status(200).json({
      success: true,
      data: allHelpingHousePerson,
      count: allHelpingHousePerson.length,
      message: "Helping house persons retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching helping house persons:", error);
    res.status(500).json({
      error: "Failed to fetch helping house persons",
      message: error.message,
    });
  }
};

export const GetHelpingHouseDashboard = async (req, res) => {
  try {
    const helpingHouseId = req.user.id;

    // Get helping house profile
    const [helpingHouseProfile] = await db
      .select({
        id: helpingHouse.id,
        name: helpingHouse.name,
        email: helpingHouse.email,
        address: helpingHouse.address,
        phone: helpingHouse.phone,
        website: helpingHouse.website,
        ngoType: helpingHouse.ngoType,
        isActive: helpingHouse.isActive,
        createdAt: helpingHouse.createdAt,
      })
      .from(helpingHouse)
      .where(eq(helpingHouse.id, helpingHouseId));

    if (!helpingHouseProfile) {
      return res.status(404).json({
        error: "Helping house not found",
      });
    }

    // Get all persons associated with this helping house
    const persons = await db
      .select()
      .from(helpingHousePerson)
      .where(eq(helpingHousePerson.helpingHouseId, helpingHouseId));

    // Get statistics
    const stats = {
      totalPersons: persons.length,
      personsByRole: persons.reduce((acc, person) => {
        acc[person.role] = (acc[person.role] || 0) + 1;
        return acc;
      }, {}),
    };

    res.status(200).json({
      success: true,
      data: {
        profile: helpingHouseProfile,
        persons: persons,
        statistics: stats,
      },
      message: "Dashboard data retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({
      error: "Failed to fetch dashboard data",
      message: error.message,
    });
  }
};

export const CreateHelpingHousePerson = async (req, res) => {
  try {
    const { name, email, phone, role, helpingHouseId } = req.body;
    if (!helpingHouseId) {
      return res.status(422).json({ error: "Helping House ID is required" });
    }

    const [newHelpingHousePerson] = await db
      .insert(helpingHousePerson)
      .values({
        name,
        email,
        phone,
        role,
        helpingHouseId,
      })
      .returning();
    res.status(201).json({
      ...newHelpingHousePerson,
      message: "Helping House Person created successfully",
      status_code: 201,
    });
  } catch (error) {
    console.error("Error creating helping house person:", error);
    res.status(500).json({ error: "Failed to create helping house person" });
  }
};
