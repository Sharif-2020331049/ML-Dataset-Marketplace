import express from "express";
import {
  accessAllDataset,
  accessDatasetByID,
  countByCategories,
  deleteDatasetByID,
  downloadDataset,
  updateDatasetById,
  uploadDataset,
} from "../controllers/dataset.controller.js";
import { cloudinary, storage } from "../config/cloudinary.js";
import multer from "multer";
import { handleUploadErrors, upload } from "../middlewares/multer.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const datasetRouter = express.Router();

datasetRouter.post(
  "/upload",
  jwtVerify,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "originalFiles", maxCount: 10 },
    { name: "samplePreview", maxCount: 10 },
  ]),
  handleUploadErrors,
  uploadDataset
);

datasetRouter.get("/access", accessAllDataset);

datasetRouter.get("/categories", countByCategories);
datasetRouter.delete("/delete/:id", deleteDatasetByID);
datasetRouter.patch("/update/:id", updateDatasetById);

datasetRouter.get("/:id", accessDatasetByID);

//  upload.fields([
//     { name: 'originalFiles', maxCount: 5 },
//     { name: 'samplePreview', maxCount: 1 }
// ]),

// For download
datasetRouter.get("/download/:id", jwtVerify, downloadDataset);

export default datasetRouter;
