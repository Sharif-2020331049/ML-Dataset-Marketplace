import dotenv from "dotenv";
import { app } from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { initGridFS } from "./src/cloud_mongo/mongodb_store.js"; // ✅ Missing import added

dotenv.config({ path: './env' });

const PORT = process.env.PORT || 8000; // ✅ Move PORT before usage

connectDB()
  .then(() => {
    initGridFS(); // ✅ Initialize GridFS after DB is connected
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err);
  });