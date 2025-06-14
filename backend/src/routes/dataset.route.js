import express from "express";
import {
  accessAllDataset,
  accessDatasetByID,
  accessPendingData,
  countByCategories,
  deleteDatasetByID,
  downloadDataset,
  getApprovedDatasets,
  getDatasetStats,
  getRejectedDatasets,
  updateDatasetById,
  updateDatasetStatus,
  uploadDataset,
} from "../controllers/dataset.controller.js";
import { cloudinary, storage } from "../config/cloudinary.js";
import multer from "multer";
import { handleUploadErrors, upload } from "../middlewares/multer.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const datasetRouter = express.Router();

// For admin
datasetRouter.get('/pending-dataset', accessPendingData)
datasetRouter.patch('/update-status/:id', updateDatasetStatus);
datasetRouter.get('/approved-dataset', getApprovedDatasets);
datasetRouter.get('/rejected-dataset', getRejectedDatasets);
datasetRouter.get('/stats', getDatasetStats);


// router.post(
//   "/upload",
//   upload.fields([
//     { name: "thumbnail", maxCount: 1 },
//     { name: "originalFiles", maxCount: 10 },
//     { name: "samplePreview", maxCount: 5 },
//   ]),
//   handleUploadErrors,
//   async (req, res) => {
//     try {
//       // Files are now in req.files
//       const { thumbnail, originalFiles, samplePreview } = req.files;

//       // Example response
//       res.status(200).json({
//         success: true,
//         thumbnail: thumbnail[0].path, // Cloudinary URL
//         datasetFiles: originalFiles.map(file => file.path),
//         previews: samplePreview?.map(file => file.path) || [],
//       });
//     } catch (error) {
//       res.status(500).json({ error: "Server error", details: error.message });
//     }
//   }
// );


datasetRouter.post(
  "/upload",
  jwtVerify,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "originalFiles", maxCount: 10 },
    { name: "samplePreview", maxCount: 10 },
  ]),
    handleUploadErrors, 
  (req, res, next) => {
    
    // Check if required files are uploaded
    if (!req.files?.thumbnail || !req.files?.originalFiles) {
      console.log({ 
        error: "Missing required files (thumbnail and originalFiles are required)" 
      });
    }
     const { thumbnail, originalFiles, samplePreview } = req.files;  
    console.log(   
    {
        success: true,
        thumbnail: thumbnail[0].path, // Cloudinary URL
        datasetFiles: originalFiles.map(file => file.path),
        previews: samplePreview?.map(file => file.path) || [],
      });
    next();
  },// This should come after the file processing
  uploadDataset
);
datasetRouter.get("/access", accessAllDataset);

datasetRouter.get("/categories", countByCategories);
datasetRouter.delete("/delete/:id", deleteDatasetByID);
datasetRouter.patch("/update/:id", updateDatasetById);
datasetRouter.get("/:id", accessDatasetByID);
// For download
datasetRouter.get("/download/:datasetId", jwtVerify, downloadDataset);




export default datasetRouter;
