import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let gfsBucket;
let isInitialized = false;

const initGridFS = async () => {
  try {
    // Wait for mongoose connection if not ready
    if (mongoose.connection.readyState !== 1) {
      await new Promise(resolve => mongoose.connection.once('open', resolve));
    }

    const db = mongoose.connection.db;
    gfsBucket = new GridFSBucket(db, {
      bucketName: "zips",
    });

    isInitialized = true;
    console.log("✅ GridFSBucket initialized");
    return gfsBucket;
  } catch (error) {
    console.error("❌ GridFS initialization failed:", error);
    throw error;
  }
};

const getGFSBucket = () => {
  if (!isInitialized) {
    throw new Error("GridFSBucket not initialized. Call initGridFS() first.");
  }
  return gfsBucket;
};

export { initGridFS, getGFSBucket };