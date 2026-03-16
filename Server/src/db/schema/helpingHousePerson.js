import {
  pgTable,
  varchar,
  uuid,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

import {helpingHouse} from "./helpingHouseSchema.js";

export const helpingHousePerson = pgTable("helpingHousePerson", {
    id:uuid("id").primaryKey().defaultRandom(),
    helpingHouseId: uuid("helping_house_id").references(()=> helpingHouse.id).notNull(),
    name: varchar("name",{length:100}).notNull(),
    email: varchar("email",{length:200}).notNull(),
    phone: varchar("phone",{length:20}),
    role: varchar("role",{length:50}).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
}
)