CREATE TABLE "helpingHousePerson" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"helping_house_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(200) NOT NULL,
	"phone" varchar(20),
	"role" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "helpingHousePerson" ADD CONSTRAINT "helpingHousePerson_helping_house_id_helpingHouse_id_fk" FOREIGN KEY ("helping_house_id") REFERENCES "public"."helpingHouse"("id") ON DELETE no action ON UPDATE no action;