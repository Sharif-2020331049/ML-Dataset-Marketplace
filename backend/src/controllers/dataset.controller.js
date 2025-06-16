import { Dataset } from "../models/dataset.model.js";
import { Purchase } from "../models/purchase.model.js";
import { User } from "../models/user.model.js";
import axios from "axios";
import { getGFSBucket } from "../cloud_mongo/mongodb_store.js";

//   try {
//     console.log("Files received:", req.files);
//     console.log("Body received:", req.body);

//     res.json({message: checked})

//     // Validate required fields
//     const requiredFields = ["datasetTitle", "category", "description", "price"];
//     const missingFields = requiredFields.filter(field => !req.body[field]);

//     if (missingFields.length > 0) {
//       return res.status(400).json({
//         success: false,
//         message: `Missing required fields: ${missingFields.join(", ")}`
//       });
//     }

//     // Validate files
//     const { thumbnail, originalFiles, samplePreview } = req.files;

//     if (!thumbnail || !originalFiles) {
//       return res.status(400).json({
//         success: false,
//         error: "Missing required files: thumbnail and originalFiles."
//       });
//     }

//     // Process files
//     const processFile = (file) => ({
//       url: file.path,
//       public_id: file.filename
//     });

//     // Create new dataset
//     const newDataset = new Dataset({
//       ...req.body,
//       tags: req.body.tags?.split(",").map(tag => tag.trim()) || [],
//       thumbnail: processFile(thumbnail[0]),
//       originalFiles: originalFiles.map(processFile),
//       samplePreview: samplePreview ? samplePreview.map(processFile) : [],
//       uploadedBy: req.user?.email,
//       status: 'pending'
//     });

//     // Save to database
//     const dataset = await newDataset.save();

//     // Add to user's uploads
//     const user = await User.findById(req.user?._id);
//     await user.addUpload(dataset._id);

//     res.status(201).json({
//       success: true,
//       dataset: dataset
//     });

//   } catch (error) {
//     console.error("uploadDataset error:", error);
//     res.status(500).json({
//       success: false,
//       error: "Server error while uploading dataset.",
//       message: error.message
//     });
//   }
// };

// const uploadDataset = async (req, res) => {
//   try {
//     // Debugging: Check what's being received
//     console.log("Files received:", req.files);
//     console.log("Body received:", req.body);

//     // Validate required fields
//     const requiredFields = ["datasetTitle", "category", "description", "price"];
//     const missingFields = requiredFields.filter((field) => !req.body[field]);

//     if (missingFields.length > 0) {
//       return res.status(400).json({
//         success: false,
//         message: `Missing required fields: ${missingFields.join(", ")}`,
//       });
//     }

//     // Validate files
//     if (!req.files) {
//       return res.status(400).json({
//         success: false,
//         error: "No files were uploaded",
//       });
//     }

//     const { thumbnail, originalFiles, samplePreview } = req.files;

//     if (!thumbnail || !originalFiles) {
//       return res.status(400).json({
//         success: false,
//         error: "Missing required files: thumbnail and originalFiles.",
//       });
//     }

//     // Validate at least one original file is a ZIP
//     const hasZipFile = originalFiles.some(
//       (file) =>
//         file.mimetype === "application/zip" ||
//         file.mimetype === "application/x-zip-compressed" ||
//         file.originalname.toLowerCase().endsWith(".zip")
//     );

//     if (!hasZipFile) {
//       return res.status(400).json({
//         success: false,
//         error: "At least one original file must be a ZIP archive",
//       });
//     }

//     // Process files
//     const processFile = (file) => ({
//       url: file.path,
//       public_id: file.filename,
//       mimetype: file.mimetype,
//       size: file.size,
//     });

//     // Create new dataset
//     const newDataset = new Dataset({
//       ...req.body,
//       tags: req.body.tags?.split(",").map((tag) => tag.trim()) || [],
//       thumbnail: processFile(thumbnail[0]),
//       originalFiles: originalFiles.map(processFile),
//       samplePreview: samplePreview ? samplePreview.map(processFile) : [],
//       uploadedBy: req.user?._id, // Store user ID instead of email
//       status: "pending",
//     });

//     // Save to database
//     const dataset = await newDataset.save();

//     // Add to user's uploads
//     if (req.user?._id) {
//       const user = await User.findById(req.user._id);
//       if (user) {
//         await user.addUpload(dataset._id);
//       }
//     }

//     res.status(201).json({
//       success: true,
//       dataset: dataset,
//     });
//   } catch (error) {
//     console.error("uploadDataset error:", error);
//     res.status(500).json({
//       success: false,
//       error: "Server error while uploading dataset.",
//       message: error.message,
//     });
//   }
// };

// const uploadDataset = async (req, res) => {
//   try {
//     // Debugging logs
//     console.log("Authenticated user:", req.user);
//     console.log("Received files:", req.files);
//     console.log("Received body:", req.body);

//     // Validate required fields
//     const requiredFields = [
//       "datasetTitle",
//       "category",
//       "description",
//       "price",
//       "tags",
//       "license",
//     ];

//     // const missingFields = requiredFields.filter((field) => !req.body[field]);
//     // if (missingFields.length > 0) {
//     //   return res.status(400).json({
//     //     success: false,
//     //     message: `Missing required fields: ${missingFields.join(", ")}`,
//     //   });
//     // }

//     // Validate files
//     if (!req.files) {
//       return res.status(400).json({
//         success: false,
//         error: "No files were uploaded",
//       });
//     }

//       const { thumbnail, samplePreview } = req.files;

//     console.log({ thumbnail, samplePreview });
//     console.log(req.body.originalFilesId);

//     // Validate required files
//     if (!thumbnail || !req.body.originalFilesId) {
//       return res.status(400).json({
//         success: false,
//         error: "Missing required files: thumbnail and originalFiles",
//       });
//     }

//     // Validate ZIP files
//     // const hasZipFile = originalFiles.some(
//     //   (file) =>
//     //     file.mimetype === "application/zip" ||
//     //     file.mimetype === "application/x-zip-compressed" ||
//     //     file.originalname.toLowerCase().endsWith(".zip")
//     // );

//     // if (!hasZipFile) {
//     //   return res.status(400).json({
//     //     success: false,
//     //     error: "At least one original file must be a ZIP archive",
//     //   });
//     // }

//     // Process files
//     const processFile = (file) => ({
//       url: file.path,
//       public_id: file.filename,
//       mimetype: file.mimetype,
//       size: file.size,
//     });

//     // Create dataset document
//     const newDataset = new Dataset({
//       datasetTitle: req.body.datasetTitle,
//       category: req.body.category,
//       description: req.body.description,
//       price: req.body.price,
//       tags: req.body.tags?.split(",").map((tag) => tag.trim()) || [],
//       license: req.body.license,
//       thumbnail: processFile(thumbnail[0]),
//       // originalFiles: originalFiles.map(processFile),
//       samplePreview: samplePreview?.map(processFile) || [],
//       uploadedBy: req.user._id, // From JWT middleware
//       status: "pending",
//     });

//     // Save to database
//     const savedDataset = await newDataset.save();

//     // Update user's uploads
//     await User.findByIdAndUpdate(req.user._id, {
//       $push: { uploads: savedDataset._id },
//     });

//     res.status(201).json({
//       success: true,
//       dataset: savedDataset,
//     });
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(500).json({
//       success: false,
//       error: "Server error while uploading dataset",
//       details:
//         process.env.NODE_ENV === "development" ? error.message : undefined,
//     });
//   }
// };

const uploadDataset = async (req, res) => {
  try {
    // Debugging logs
    console.log("Authenticated user:", req.user);
    console.log("Received files:", req.files);
    console.log("Received body:", req.body);

    // Validate required fields
    const requiredFields = [
      "datasetTitle",
      "category",
      "description",
      "price",
      "tags",
      "license",
      "originalFileId", // Added this required field
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Validate files
    if (!req.files) {
      return res.status(400).json({
        success: false,
        error: "No files were uploaded",
      });
    }

    const { thumbnail, samplePreview } = req.files;

    console.log({ thumbnail, samplePreview });
    console.log(req.body.originalFileId);

    // Validate required files
    if (!thumbnail || !req.body.originalFileId) {
      return res.status(400).json({
        success: false,
        error: "Missing required files: thumbnail and originalFiles",
      });
    }

    // Process files
    const processFile = (file) => ({
      url: file.path,
      public_id: file.filename,
      mimetype: file.mimetype,
      size: file.size,
    });

    // Create dataset document
    const newDataset = new Dataset({
      datasetTitle: req.body.datasetTitle,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      tags: req.body.tags?.split(",").map((tag) => tag.trim()) || [],
      license: req.body.license,
      thumbnail: processFile(thumbnail[0]),
      originalFileId: req.body.originalFileId, // Added this field
      samplePreview: samplePreview?.map(processFile) || [],
      uploadedBy: req.user._id, // From JWT middleware
      status: "pending",
    });

    // Save to database
    const savedDataset = await newDataset.save();

    // Update user's uploads
    await User.findByIdAndUpdate(req.user._id, {
      $push: { uploads: savedDataset._id },
    });

    res.status(201).json({
      success: true,
      dataset: savedDataset,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      error: "Server error while uploading dataset",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const accessAllDataset = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const filter = { status: "approved" }; // Only fetch approved datasets

    const [datasets, total] = await Promise.all([
      Dataset.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Dataset.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      datasets,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const accessDatasetByID = async (req, res) => {
  try {
    const { id } = req.params;

    const dataset = await Dataset.findById(id).populate(
      "uploadedBy",
      "name email"
    );

    if (!dataset) {
      return res
        .status(404)
        .json({ success: false, message: "Dataset not found" });
    }

    res.status(200).json({ success: true, dataset });
  } catch (err) {
    console.error("Error fetching dataset by ID:", err);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};

const deleteDatasetByID = async (req, res) => {
  try {
    const { id } = req.body;

    const deleted = await Dataset.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Dataset not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Dataset deleted successfully" });
  } catch (err) {
    console.error("Error deleting dataset:", err);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};

const updateDatasetById = async (req, res) => {
  // Implementation goes here
};

// const downloadDataset = async (req, res) => {
//   try {
//     const dataset = await Dataset.findById(req.params.datasetId);

//     if (!dataset || !dataset.originalFiles[0]?.url) {
//       return res.status(404).json({ error: "Dataset not found" });
//     }

//     const cloudinaryUrl = dataset.originalFiles[0].url;

//     // Fetch the file from Cloudinary
//     const response = await axios.get(cloudinaryUrl, {
//       responseType: "stream", // Stream the file instead of loading into memory
//     });

//     // Set proper download headers
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename="${dataset.title}"` // Fixed: Added backticks
//     );
//     res.setHeader("Content-Type", response.headers["content-type"]);

//     // Pipe the file directly to the client
//     response.data.pipe(res);
//   } catch (error) {
//     console.error("Download error:", error);
//     res.status(500).json({ error: "Failed to download file" });
//   }
// };

const downloadDataset = async (req, res) => {
  try {
    const { datasetId } = req.params;

    // 1. Find the dataset
    const dataset = await Dataset.findById(datasetId);
    if (!dataset || !dataset.originalFileId) {
      return res.status(404).json({ error: "Dataset not found" });
    }

    // 2. Get GridFS bucket
    const gfsBucket = getGFSBucket();

    // 3. Find the file in GridFS
    const files = await gfsBucket
      .find({ _id: new mongoose.Types.ObjectId(dataset.originalFileId) })
      .toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ error: "File not found" });
    }

    // 4. Set proper download headers
    res.set("Content-Type", files[0].contentType);
    res.set(
      "Content-Disposition",
      `attachment; filename="${dataset.datasetTitle}.zip"`
    );

    // 5. Stream the file to the client
    const downloadStream = gfsBucket.openDownloadStream(files[0]._id);
    downloadStream.pipe(res);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Failed to download file" });
  }
};

const countByCategories = async (req, res) => {
  try {
    const result = await Dataset.aggregate([
      {
        $group: {
          _id: "$category", // Group by category
          count: { $sum: 1 }, // Count datasets in each category
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1,
        },
      },
    ]);

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch category data" });
  }
};

// Admin controller functions
const accessPendingData = async (req, res) => {
  try {
    const pendingDatasets = await Dataset.find({ status: "pending" }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, datasets: pendingDatasets });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateDatasetStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  try {
    const updatedDataset = await Dataset.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedDataset) {
      return res
        .status(404)
        .json({ success: false, message: "Dataset not found" });
    }

    res.status(200).json({ success: true, dataset: updatedDataset });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getApprovedDatasets = async (req, res) => {
  try {
    const datasets = await Dataset.find({ status: "approved" });
    res.status(200).json(datasets);
  } catch (error) {
    console.error("Error fetching approved datasets:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRejectedDatasets = async (req, res) => {
  try {
    const datasets = await Dataset.find({ status: "rejected" }).sort({
      updatedAt: -1,
    });
    res.status(200).json(datasets);
  } catch (error) {
    console.error("Error fetching rejected datasets:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDatasetStats = async (req, res) => {
  try {
    // 1. Count by status
    const approved = await Dataset.countDocuments({ status: "approved" });
    const pending = await Dataset.countDocuments({ status: "pending" });
    const rejected = await Dataset.countDocuments({ status: "rejected" });

    // 2. Group by category
    const categoryStatsRaw = await Dataset.aggregate([
      {
        $group: {
          _id: "$category",
          datasets: { $sum: 1 },
          revenue: { $sum: "$price" }, // Assuming price is stored as number
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          datasets: 1,
          revenue: 1,
        },
      },
    ]);

    // 3. Send response
    res.json({
      statusCounts: { approved, pending, rejected },
      categoryStats: categoryStatsRaw,
    });
  } catch (error) {
    console.error("Error getting dataset stats:", error);
    res.status(500).json({ message: "Failed to fetch dataset statistics" });
  }
};

// In your dataset controller
const getDatasetDetails = async (req, res) => {
  try {
    const { datasetId } = req.params;
    
    // Find dataset and only return necessary fields (for security)
    const dataset = await Dataset.findById(datasetId)
      .select('originalFileId')
      .lean();
 
      console.log(dataset);
      
    if (!dataset) {
      return res.status(404).json({ error: "Dataset not found" });
    }

    res.json({
      success: true,
      originalFileId: dataset.originalFileId,
    });
    
  } catch (error) {
    console.error("Dataset details error:", error);
    res.status(500).json({ error: "Failed to get dataset details" });
  }
};

export {
  uploadDataset,
  accessAllDataset,
  deleteDatasetByID,
  updateDatasetById,
  accessDatasetByID,
  downloadDataset,
  countByCategories,
  accessPendingData,
  updateDatasetStatus,
  getApprovedDatasets,
  getRejectedDatasets,
  getDatasetStats,
  getDatasetDetails
};
