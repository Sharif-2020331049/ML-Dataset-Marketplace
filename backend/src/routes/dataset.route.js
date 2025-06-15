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
    { name: "samplePreview", maxCount: 10 }, // no originalFiles here
  ]),
  handleUploadErrors,
  async (req, res) => {
    try {
      const { thumbnail, samplePreview } = req.files;
      const {
        datasetTitle,
        category,
        description,
        tags,
        price,
        license,
        uploadedBy,
        originalFileId,  // This is a string from form data
      } = req.body;

      // Validate required data
      if (!thumbnail || !originalFileId || !datasetTitle || !category || !description || !tags || !price || !uploadedBy) {
        return res.status(400).json({ error: "Missing required fields or files." });
      }

      // Create dataset document
      const newDataset = new Dataset({
        datasetTitle,
        category,
        description,
        tags: Array.isArray(tags) ? tags : JSON.parse(tags), // in case tags is sent as JSON string
        price,
        license,
        uploadedBy,
        originalFileId,
        thumbnail: {
          url: thumbnail[0].path,
          public_id: thumbnail[0].filename || "", // or wherever you store public_id from cloudinary
        },
        samplePreview: samplePreview
          ? {
              url: samplePreview[0].path,
              public_id: samplePreview[0].filename || "",
            }
          : null,
      });

      await newDataset.save();

      return res.status(201).json({
        success: true,
        dataset: newDataset,
      });
    } catch (error) {
      console.error("uploadDataset error:", error);
      res.status(500).json({ error: "Server error while uploading dataset.", details: error.message });
    }
  }
);

datasetRouter.get("/access", accessAllDataset);

datasetRouter.get("/categories", countByCategories);
datasetRouter.delete("/delete/:id", deleteDatasetByID);
datasetRouter.patch("/update/:id", updateDatasetById);
datasetRouter.get("/:id", accessDatasetByID);
// For download
datasetRouter.get("/download/:datasetId", jwtVerify, downloadDataset);




export default datasetRouter;
