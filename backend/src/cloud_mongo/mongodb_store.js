// src/cloud/mongodbstore.js
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let gfsBucket;

const initGridFS = () => {
  const db = mongoose.connection.db; // ✅ native db object
  if (!db) {
    throw new Error("MongoDB not connected yet (db is undefined)");
  }

  gfsBucket = new GridFSBucket(db, {
    bucketName: "zips", // you can customize this
  });

  console.log("✅ GridFSBucket initialized");
};

const getGFSBucket = () => {
  if (!gfsBucket) {
    throw new Error("GridFSBucket not initialized");
  }
  return gfsBucket;
};

export { initGridFS, getGFSBucket };
