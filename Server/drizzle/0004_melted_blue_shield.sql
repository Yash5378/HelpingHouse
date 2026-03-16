ALTER TABLE "doner" DROP CONSTRAINT "doner_firebaseUID_unique";--> statement-breakpoint
ALTER TABLE "doner" ADD COLUMN "firebaseUid" varchar(200);--> statement-breakpoint
ALTER TABLE "doner" DROP COLUMN "firebaseUID";--> statement-breakpoint
ALTER TABLE "doner" ADD CONSTRAINT "doner_firebaseUid_unique" UNIQUE("firebaseUid");