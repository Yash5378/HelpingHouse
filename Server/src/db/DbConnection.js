import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Validate DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set. Please check your .env file.");
}

// Validate DATABASE_URL format
const dbUrl = process.env.DATABASE_URL;
if (typeof dbUrl !== "string") {
  throw new Error(`DATABASE_URL must be a string, but got ${typeof dbUrl}. Please check your .env file.`);
}

// Check if it's a valid PostgreSQL connection string format
if (!dbUrl.startsWith("postgresql://") && !dbUrl.startsWith("postgres://")) {
  throw new Error(`DATABASE_URL must start with "postgresql://" or "postgres://". Current value starts with: ${dbUrl.substring(0, 20)}...`);
}

const pool = new Pool({
  connectionString: dbUrl,
});

// Test the connection
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

export const db = drizzle(pool);