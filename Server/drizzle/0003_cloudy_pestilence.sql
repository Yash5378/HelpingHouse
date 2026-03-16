ALTER TABLE "doner" ADD COLUMN "firebaseUID" varchar(200);--> statement-breakpoint
ALTER TABLE "doner" ADD COLUMN "password_hash" varchar(255);--> statement-breakpoint
ALTER TABLE "doner" ADD COLUMN "auth_provider" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "doner" ADD COLUMN "is_active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "doner" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "helpingHouse" ADD COLUMN "password_hash" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "helpingHouse" ADD COLUMN "is_active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "helpingHouse" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "doner" DROP COLUMN "password";--> statement-breakpoint
ALTER TABLE "helpingHouse" DROP COLUMN "password";--> statement-breakpoint
ALTER TABLE "doner" ADD CONSTRAINT "doner_firebaseUID_unique" UNIQUE("firebaseUID");