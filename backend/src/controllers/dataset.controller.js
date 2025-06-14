import { Dataset } from "../models/dataset.model.js";
import { Purchase } from "../models/purchase.model.js";

// const uploadDataset = async (req, res) => {
//   try {
//     const { datasetTitle, category, description, tags, price, license } =
//       req.body;

//     const uploadedBy = req.user?.email;
//     const thumbnailFile = req.files.thumbnail?.[0];

//     const thumbnail = {
//       url: thumbnailFile?.path,
//       public_id: thumbnailFile?.filename,
//     };
//     const originalFiles =
//       req.files.originalFiles?.map((file) => ({
//         url: file.path,
//         public_id: file.filename,
//       })) || [];

//     const sampleFile = req.files.samplePreview?.[0];

//     const samplePreview = {
//       url: sampleFile?.path,
//       public_id: sampleFile?.filename,
//     };

//     // console.log("Sample Preview: ");
//     // console.log(samplePreview);
//     // console.log("thumbnail file");
//     // console.log(thumbnail);

//     const newDataset = new Dataset({
//       datasetTitle,
//       category,
//       license,
//       description,
//       tags: tags.split(",").map((tag) => tag.trim()),
//       price,
//       thumbnail,
//       uploadedBy,
//       originalFiles,
//       samplePreview,
//     });

//     await newDataset.save();

//     console.log(newDataset);

//     res.status(201).json({ success: true, dataset: newDataset });

//     // res.json({success: true, message: "It's good till now"})
//   } catch (err) {
//     console.error("UPLOAD ERROR:", err);
//     res
//       .status(500)
//       .json({ success: false, message: "Server Error", error: err.message });
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: "Server Error",
//         error: err.message,
//         stack: err.stack,
//       });
//   }
// };

const uploadDataset = async (req, res) => {
  try {
    //   console.log('Received files:', {
    //   thumbnail: req.files?.thumbnail?.[0]?.mimetype,
    //   originalFiles: req.files?.originalFiles?.map(f => f.mimetype),
    //   samplePreview: req.files?.samplePreview?.[0]?.mimetype
    // });

    // Validate required fields first
    const requiredFields = ["datasetTitle", "category", "description", "price"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Process files only if they exist
    const processFile = (file) =>
      file
        ? {
            url: file.path,
            public_id: file.filename,
          }
        : null;

    const newDataset = new Dataset({
      ...req.body,
      tags: req.body.tags?.split(",").map((tag) => tag.trim()) || [],
      thumbnail: processFile(req.files?.thumbnail?.[0]),
      originalFiles: req.files?.originalFiles?.map(processFile) || [],
      samplePreview: processFile(req.files?.samplePreview?.[0]),
      uploadedBy: req.user?.email,
    });

    await newDataset.save();
    res.status(201).json({ success: true, dataset: newDataset });
  } catch (err) {
    console.error("DATABASE SAVE ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to save dataset",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

// const accessAllDataset = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = 6;
//     const skip = (page - 1) * limit;

//     const [datasets, total] = await Promise.all([
//       Dataset.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
//       Dataset.countDocuments(),
//     ]);

//     res.status(200).json({
//       success: true,
//       datasets,
//       totalPages: Math.ceil(total / limit),
//       currentPage: page,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

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

const updateDatasetById = async (req, res) => {};

const downloadDataset = async (req, res) => {
  try {
    const dataset = await Dataset.findById(req.params.datasetId);

    if (!dataset || !dataset.originalFiles[0]?.url) {
      return res.status(404).json({ error: "Dataset not found" });
    }

    const cloudinaryUrl = dataset.originalFiles[0].url;

    // Fetch the file from Cloudinary
    const response = await axios.get(cloudinaryUrl, {
      responseType: "stream", // Stream the file instead of loading into memory
    });

    // Set proper download headers
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${dataset.title}"`
    );
    res.setHeader("Content-Type", response.headers["content-type"]);

    // Pipe the file directly to the client
    response.data.pipe(res);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Failed to download file" });
  }
};

//   if (!purchase) {
//     return res
//       .status(403)
//       .json({
//         success: false,
//         message: "You must purchase this dataset first.",
//       });
//   }

//   const dataset = await Dataset.findById(datasetId);
//   res.status(200).json({
//     success: true,
//     originalFiles: dataset.originalFiles, // Direct download URLs
//   });
// };

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
    // res.status(500).json({ error: 'Failed to fetch category data' });
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch category data" });
  }
};

// Admin  controller

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
  getDatasetStats
};
