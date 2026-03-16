ALTER TABLE "doner" DROP CONSTRAINT "doner_firebaseUid_unique";--> statement-breakpoint
ALTER TABLE "doner" ADD COLUMN "firebase_uid" varchar(200);--> statement-breakpoint
ALTER TABLE "doner" DROP COLUMN "firebaseUid";--> statement-breakpoint
ALTER TABLE "doner" ADD CONSTRAINT "doner_firebase_uid_unique" UNIQUE("firebase_uid");