import { db } from "../db/DbConnection.js";
import { helpingHouse } from "../db/schema/helpingHouseSchema.js";
import { helpingHousePerson } from "../db/schema/helpingHousePerson.js";
import {
  SignupHelpingHouse,
  SigninHelpingHouse,
} from "../modules/helping_house/helpingHouseAuth.js";
import multer from "multer";
import { and, eq, sql } from "drizzle-orm";
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
          "Only PDF files are allowed for NGO registration certificate",
        ),
        false,
      );
    }
  },
});

// Middleware for handling NGO certificate upload
export const uploadNgoCertificate = upload.single("ngoCertificate");

// export const getAllHelpingHouses = async (req, res) => {
//   try {
//     const { ngoType, page = 1, limit = 10 } = req.query;

//     const pageNumber = Number(page);
//     const limitNumber = Number(limit);
//     const offset = (pageNumber - 1) * limitNumber;

//     const conditions = [];

//     if (ngoType) {
//       conditions.push(eq(helpingHouse.ngoType, ngoType));
//     }

//     const totalResult = await db
//       .select({ count: sql`count(*)` })
//       .from(helpingHouse)
//       .where(conditions.length ? and(...conditions) : undefined);

//     const total = Number(totalResult[0].count);

//     let data = await db
//       .select({
//         id: helpingHouse.id,
//         name: helpingHouse.name,
//         email: helpingHouse.email,
//         address: helpingHouse.address,
//         phone: helpingHouse.phone,
//         website: helpingHouse.website,
//         // ngoCertificateUrl: helpingHouse.ngoCertificateUrl,
//         isActive: helpingHouse.isActive,
//         createdAt: helpingHouse.createdAt,
//         ngoType: helpingHouse.ngoType,
//         isApproved: helpingHouse.isApproved,
//       })
//       .from(helpingHouse)
//       .where(whereClause) // ✅ WHERE FIRST
//       .limit(limitNumber) // ✅ THEN LIMIT
//       .offset(offset);

//     res.status(200).json({
//       data,
//       pagination: {
//         total,
//         page: pageNumber,
//         limit: limitNumber,
//         totalPages: Math.ceil(total / limitNumber),
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching helping houses:", error);
//     res.status(500).json({ error: "Failed to fetch helping houses" });
//   }
// };

export const getAllHelpingHouses = async (req, res) => {
  try {
    const { ngoType, page = 1, limit = 10 } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const offset = (pageNumber - 1) * limitNumber;

    const conditions = [];

    if (ngoType) {
      conditions.push(eq(helpingHouse.ngoType, ngoType));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    const totalResult = await db
      .select({ count: sql`count(*)` })
      .from(helpingHouse)
      .where(whereClause);

    const total = Number(totalResult[0].count);
    const data = await db
      .select({
        id: helpingHouse.id,
        name: helpingHouse.name,
        email: helpingHouse.email,
        address: helpingHouse.address,
        phone: helpingHouse.phone,
        website: helpingHouse.website,
        isActive: helpingHouse.isActive,
        createdAt: helpingHouse.createdAt,
        ngoType: helpingHouse.ngoType,
        isApproved: helpingHouse.isApproved,
      })
      .from(helpingHouse)
      .where(whereClause)
      .limit(limitNumber)
      .offset(offset);

    res.status(200).json({
      data,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    console.error("Error fetching helping houses:", error);
    res.status(500).json({ error: "Failed to fetch helping houses" });
  }
};

export const getHelpingHouseById = async (req, res) => {
  try {
    const { id } = req.params;

    const house = await db
      .select()
      .from(helpingHouse)
      .where(eq(helpingHouse.id, id));

    if (!house.length) {
      return res.status(404).json({
        message: "Helping House not found",
      });
    }

    const persons = await db
      .select()
      .from(helpingHousePerson)
      .where(eq(helpingHousePerson.helpingHouseId, id));

    return res.status(200).json({
      id: house[0].id,
      name: house[0].name,
      email: house[0].email,
      address: house[0].address,
      phone: house[0].phone,
      website: house[0].website,
      ngoCertificateUrl: house[0].ngoCertificateUrl,
      isActive: house[0].isActive,
      createdAt: house[0].createdAt,
      ngoType: house[0].ngoType,
      ngoName: house[0].ngoName,
      isApproved: house[0].isApproved,
      helpingHousePersons: persons,
      description: house[0].description,
    });
  } catch (error) {
    console.error("Error fetching helping house by id:", error);
    return res.status(500).json({ error: "Failed to fetch helping house" });
  }
};

export const Signup = async (req, res) => {
  try {
    const { name, email, phone, address, password, website, ngoType, ngoName } =
      req.body;

    console.log("Helping House Signup:", {
      name,
      email,
      phone,
      address,
      website,
      ngoType,
    });

    if (!ngoName) {
      return res
        .status(422)
        .json({ error: "NGO Name is required", status_code: 422 });
    }

    const newHelpingHouse = await SignupHelpingHouse({
      name,
      email,
      phone,
      address,
      password,
      website,
      ngoType,
      ngoName,
    });

    res.status(201).json({
      ...newHelpingHouse,
      message: "Signup successful",
      status_code: 201,
    });
  } catch (error) {
    res.status(400).json({ error: error.message, status_code: 400 });
  }
};

export const Logout = async (req, res) => {
  try {
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const GetAllHelpingHousePerson = async (req, res) => {
  try {
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
    const helpingHouseId = req.params.id;
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
        ngoName: helpingHouse.ngoName,
        isApproved: helpingHouse.isApproved,
        description: helpingHouse.description,
      })
      .from(helpingHouse)
      .where(eq(helpingHouse.id, helpingHouseId));

    if (!helpingHouseProfile) {
      return res.status(404).json({
        error: "Helping house not found",
      });
    }
    const persons = await db
      .select()
      .from(helpingHousePerson)
      .where(eq(helpingHousePerson.helpingHouseId, helpingHouseId));
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

export const DeletePerson = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(422).json({ error: "Person ID is required" });
    }

    await db.delete(helpingHousePerson).where(eq(helpingHousePerson.id, id));
    res
      .status(200)
      .json({ message: "Person deleted successfully", status_code: 200 });
  } catch (error) {
    console.error("Error deleting helping house person:", error);
    res.status(500).json({
      error: "Failed to delete helping house person",
      status_code: 500,
    });
  }
};

export const EditHelpingHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const helpingHouseId = req.user?.id;

    if (!id) {
      return res.status(422).json({ error: "Helping house ID is required" });
    }

    if (!helpingHouseId || id !== helpingHouseId) {
      return res.status(403).json({
        error: "Forbidden",
        message: "You can only edit your own helping house profile",
      });
    }

    const {
      name,
      email,
      address,
      phone,
      website,
      ngoType,
      ngoName,
      description,
      isActive,
    } = req.body;

    const existingHouse = await db
      .select()
      .from(helpingHouse)
      .where(eq(helpingHouse.id, id));

    if (!existingHouse.length) {
      return res.status(404).json({ error: "Helping house not found" });
    }

    const updateData = {};
    if (typeof name !== "undefined") updateData.name = name;
    if (typeof email !== "undefined") updateData.email = email;
    if (typeof address !== "undefined") updateData.address = address;
    if (typeof phone !== "undefined") updateData.phone = phone;
    if (typeof website !== "undefined") updateData.website = website;
    if (typeof ngoType !== "undefined") updateData.ngoType = ngoType;
    if (typeof ngoName !== "undefined") updateData.ngoName = ngoName;
    if (typeof isActive !== "undefined") updateData.isActive = isActive;
    if (typeof description !== "undefined")
      updateData.description = description;

    if (!Object.keys(updateData).length) {
      return res.status(400).json({
        error: "No update data provided",
        message: "Please provide at least one field to update",
      });
    }

    if (updateData.email) {
      const existingEmail = await db
        .select()
        .from(helpingHouse)
        .where(eq(helpingHouse.email, updateData.email));

      if (existingEmail.length && existingEmail[0].id !== id) {
        return res.status(409).json({
          error: "Email already in use",
          message: "Another helping house is already using this email",
        });
      }
    }

    const [updatedHouse] = await db
      .update(helpingHouse)
      .set(updateData)
      .where(eq(helpingHouse.id, id))
      .returning();

    return res.status(200).json({
      message: "Helping house updated successfully",
      status_code: 200,
      data: updatedHouse,
    });
  } catch (error) {
    console.error("Error updating helping house:", error);
    return res.status(500).json({
      error: "Failed to update helping house",
      message: error.message,
    });
  }
};
