import {
  pgTable,
  varchar,
  uuid,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const helpingHouse = pgTable("helpingHouse", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 200 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  address: varchar("address", { length: 225 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  website: varchar("website", { length: 200 }),
  ngoCertificateUrl: varchar("ngo_certificate_url", { length: 500 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  ngoType: varchar("ngo_type", { length: 100 }).notNull(),
  isApproved: boolean("is_approved").default(false),
});
