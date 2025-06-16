import { app } from "./src/app.js";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import { initGridFS } from "./src/cloud_mongo/mongodb_store.js";

dotenv.config({
  path: './env'
});

const PORT = process.env.PORT || 8000;

connectDB()
  .then(async () => {  // Make this callback async
    try {
      // Initialize GridFS after DB connection is established
      await initGridFS();
      
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}...`);
      });
    } catch (error) {
      console.error('GridFS initialization failed:', error);
      process.exit(1); // Exit if GridFS fails to initialize
    }
  })
  .catch((err) => {
    console.log('MongoDB connection failed', err);
  });