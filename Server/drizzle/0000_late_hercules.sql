CREATE TABLE "doner" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(200) NOT NULL,
	"password" varchar(225) NOT NULL,
	CONSTRAINT "doner_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "helpingHouse" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(200) NOT NULL,
	"password" varchar(225) NOT NULL,
	"address" varchar(300) NOT NULL,
	"location" varchar(300) NOT NULL,
	CONSTRAINT "helpingHouse_email_unique" UNIQUE("email")
);
