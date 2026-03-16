import admin from "../config/firebase.js";

/**
 * Upload a file to Firebase Storage
 * @param {Buffer} fileBuffer - The file buffer
 * @param {string} fileName - The original file name
 * @param {string} mimeType - The MIME type of the file
 * @param {string} folder - The folder path in storage (e.g., 'ngo-certificates/')
 * @returns {Promise<string>} The download URL of the uploaded file
 */
export const uploadToFirebaseStorage = async (
  fileBuffer,
  fileName,
  mimeType,
  folder = "ngo-certificates/"
) => {
  try {
    if (!admin) {
      throw new Error("Firebase Admin SDK not initialized");
    }

    // Create a unique filename
    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}_${fileName}`;
    const filePath = `${folder}${uniqueFileName}`;

    // Get the storage bucket
    const bucket = admin.storage().bucket();

    // Create a file reference
    const file = bucket.file(filePath);

    // Upload the file
    await file.save(fileBuffer, {
      metadata: {
        contentType: mimeType,
        metadata: {
          originalName: fileName,
          uploadedAt: new Date().toISOString(),
        },
      },
      public: true, // Make the file publicly accessible
    });

    // Get the download URL
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: "03-09-2491", // Far future date for permanent access
    });

    return url;
  } catch (error) {
    console.error("Error uploading to Firebase Storage:", error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
};

/**
 * Delete a file from Firebase Storage
 * @param {string} fileUrl - The download URL of the file to delete
 * @returns {Promise<void>}
 */
export const deleteFromFirebaseStorage = async (fileUrl) => {
  try {
    if (!admin) {
      throw new Error("Firebase Admin SDK not initialized");
    }

    // Extract the file path from the URL
    const bucket = admin.storage().bucket();
    const filePath = extractFilePathFromUrl(fileUrl);

    if (filePath) {
      await bucket.file(filePath).delete();
    }
  } catch (error) {
    console.error("Error deleting from Firebase Storage:", error);
    throw new Error(`Failed to delete file: ${error.message}`);
  }
};

/**
 * Extract file path from Firebase Storage URL
 * @param {string} url - The Firebase Storage URL
 * @returns {string|null} The file path or null if extraction fails
 */
const extractFilePathFromUrl = (url) => {
  try {
    // Firebase Storage URLs typically look like:
    // https://firebasestorage.googleapis.com/v0/b/bucket-name.appspot.com/o/folder%2Ffilename?alt=media&token=...
    const urlParts = url.split("/o/");
    if (urlParts.length > 1) {
      const encodedPath = urlParts[1].split("?")[0];
      return decodeURIComponent(encodedPath);
    }
    return null;
  } catch (error) {
    console.error("Error extracting file path from URL:", error);
    return null;
  }
};
