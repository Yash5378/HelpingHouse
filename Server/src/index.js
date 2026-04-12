import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/donerRoutes.js";
import helpingHouseRouter from "./routes/helpingHouseRoutes.js";
import {
  unifiedSigninHandler,
  unifiedOAuthSigninHandler,
} from "./controllers/unifiedAuthController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Hello guys ");
});

app.use(express.json());

// Unified sign-in endpoint for both doners and helping houses
app.post("/api/signin", unifiedSigninHandler);
app.post("/api/oauth", unifiedOAuthSigninHandler);

// Existing routes
app.use("/api", router);
app.use("/api/helping_house", helpingHouseRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
