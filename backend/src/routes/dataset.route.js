import express from "express";
import {
  accessAllDataset,
  accessDatasetByID,
  accessPendingData,
  countByCategories,
  deleteDatasetByID,
  downloadDataset,
  getApprovedDatasets,
  getDatasetDetails,
  getDatasetStats,
  getRejectedDatasets,
  updateDatasetById,
  updateDatasetStatus,
  uploadDataset,
} from "../controllers/dataset.controller.js";
import { cloudinary, storage } from "../config/cloudinary.js";
import multer from "multer";
import { handleUploadErrors, upload  } from "../middlewares/multer.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const datasetRouter = express.Router();
// const upload = multer({ dest: 'uploads/' });
// For admin
datasetRouter.get('/pending-dataset', accessPendingData)
datasetRouter.patch('/update-status/:id', updateDatasetStatus);
datasetRouter.get('/approved-dataset', getApprovedDatasets);
datasetRouter.get('/rejected-dataset', getRejectedDatasets);
datasetRouter.get('/stats', getDatasetStats);





// datasetRouter.post(
//   "/upload",
//   jwtVerify, // This middleware adds req.user
//   upload.fields([
//     { name: "thumbnail", maxCount: 1 },
//     { name: "samplePreview", maxCount: 10 },
//     { name: "originalFiles", maxCount: 10 }
//   ]),
//   async (req, res) => {
//     try {
//       // Debugging
//       console.log('Received files:', req.files);
//       console.log('Received body:', req.body);
//       console.log('Authenticated user:', req.user); // From jwtVerify

//       const { thumbnail, samplePreview, originalFiles } = req.files;
//       const body = req.body;

//       // Validate required data (removed uploadedBy from required fields)
//       const required = [
//         'datasetTitle', 'category', 'description', 
//         'tags', 'price', 'originalFileId' // No longer requiring uploadedBy in body
//       ];
      
//       const missing = required.filter(field => !body[field]);
//       if (missing.length > 0 || !thumbnail || !originalFiles) {
//         return res.status(400).json({ 
//           error: `Missing: ${missing.join(', ')}${missing.length ? ' and ' : ''}${
//             !thumbnail ? 'thumbnail ' : ''
//           }${
//             !originalFiles ? 'originalFiles' : ''
//           }`.trim()
//         });
//       }

//       // Process tags safely
//       let tagsArray;
//       try {
//         tagsArray = Array.isArray(body.tags) ? body.tags : JSON.parse(body.tags || "[]");
//       } catch (e) {
//         tagsArray = [];
//       }

//       // Create dataset - using req.user._id from JWT
//       const newDataset = new Dataset({
//         datasetTitle: body.datasetTitle,
//         category: body.category,
//         description: body.description,
//         tags: tagsArray,
//         price: body.price,
//         license: body.license,
//         uploadedBy: req.user._id, // Using authenticated user's ID
//         originalFileId: body.originalFileId,
//         thumbnail: {
//           url: thumbnail[0].path,
//           public_id: thumbnail[0].filename || ""
//         },
//         samplePreview: samplePreview?.length > 0 ? {
//           url: samplePreview[0].path,
//           public_id: samplePreview[0].filename || ""
//         } : null,
//         status: 'pending'
//       });

//       await newDataset.save();

//       // Update user's uploads array
//       await User.findByIdAndUpdate(req.user._id, {
//         $push: { uploads: newDataset._id }
//       });

//       return res.status(201).json({
//         success: true,
//         dataset: newDataset
//       });

//     } catch (error) {
//       console.error("Upload error:", error);
//       res.status(500).json({ 
//         error: "Server error",
//         details: process.env.NODE_ENV === 'development' ? error.message : undefined
//       });
//     }
//   }
// );

datasetRouter.post(
  '/upload',
  jwtVerify,
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    // { name: 'originalFiles', maxCount: 10 },
    { name: 'samplePreview', maxCount: 10 }
  ]),
  uploadDataset
);
datasetRouter.get("/:datasetId/details", jwtVerify, getDatasetDetails)
datasetRouter.get("/access", accessAllDataset);

datasetRouter.get("/categories", countByCategories);
datasetRouter.delete("/delete/:id", deleteDatasetByID);
datasetRouter.patch("/update/:id", updateDatasetById);
datasetRouter.get("/:id", accessDatasetByID);
// For download
datasetRouter.get("/download/:datasetId", jwtVerify, downloadDataset);




export default datasetRouter;
