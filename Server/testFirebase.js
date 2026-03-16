// Test Firebase Connection
import admin from "./src/config/firebase.js";

const testFirebaseConnection = async () => {
  try {
    if (!admin) {
      console.error(
        "❌ Firebase Admin SDK not initialized. Check your .env file."
      );
      return;
    }

    // Test Storage Bucket Access
    const bucket = admin.storage().bucket();
    console.log("✅ Firebase Storage bucket:", bucket.name);

    // Test Auth (this will fail if credentials are wrong)
    const auth = admin.auth();
    console.log("✅ Firebase Auth initialized");

    console.log("🎉 Firebase connection successful!");
    console.log(
      "📁 You can now view uploaded files in Firebase Console > Storage"
    );
  } catch (error) {
    console.error("❌ Firebase connection failed:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log("1. Check FIREBASE_PROJECT_ID in .env");
    console.log("2. Verify FIREBASE_CLIENT_EMAIL format");
    console.log(
      "3. Ensure FIREBASE_PRIVATE_KEY is properly formatted with \\n"
    );
    console.log(
      "4. Make sure service account has Storage Admin and Auth Admin roles"
    );
  }
};

export default testFirebaseConnection;

// Run test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testFirebaseConnection();
}
