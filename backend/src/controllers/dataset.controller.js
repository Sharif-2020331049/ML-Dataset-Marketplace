import { Dataset } from "../models/dataset.model.js";
import { Purchase } from "../models/purchase.model.js";

const uploadDataset = async (req, res) => {
    try {


        const {
            datasetTitle,
            category,
            licence,
            description,
            tags,
            price,
            uploadedBy
        } = req.body;

        const originalFiles =
            req.files.originalFiles?.map((file) => ({
                url: file.path,
                public_id: file.filename,
            })) || [];

        const sampleFile = req.files.samplePreview?.[0];

        const samplePreview = {
            url: sampleFile?.path,
            public_id: sampleFile?.filename,
        };



        const newDataset = new Dataset({
            datasetTitle,
            category,
            licence,
            description,
            tags: tags.split(",").map((tag) => tag.trim()),
            price,
            uploadedBy,
            originalFiles,
            samplePreview,
        });

        await newDataset.save();
        res.status(201).json({ success: true, dataset: newDataset });
    } catch (err) {
        console.error("UPLOAD ERROR:", err);
        res
            .status(500)
            .json({ success: false, message: "Server Error", error: err.message });
        res.status(500).json({ success: false, message: 'Server Error', error: err.message, stack: err.stack });

    }
};

const accessAllDataset = async (req, res) => {
    try {
        const datasets = await Dataset.find().populate("uploadedBy", "name email");
        res.status(200).json({ success: true, datasets });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const accessDatasetByID = async (req, res) => {
    try {
        const { id } = req.params;

        const dataset = await Dataset.findById(id).populate("uploadedBy", "name email");

        if (!dataset) {
            return res.status(404).json({ success: false, message: "Dataset not found" });
        }

        res.status(200).json({ success: true, dataset });
    } catch (err) {
        console.error("Error fetching dataset by ID:", err);
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};

const deleteDatasetByID = async (req, res) => {
    try {
        const { id } = req.body;

        const deleted = await Dataset.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Dataset not found" });
        }

        res.status(200).json({ success: true, message: "Dataset deleted successfully" });
    } catch (err) {
        console.error("Error deleting dataset:", err);
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
 };

const updateDatasetById = async (req, res) => { 
    
};

const downloadDataset = async (req, res) => {
  const userId = req.user._id;
  const datasetId = req.params.id;

  const purchase = await Purchase.findOne({
    userId,
    datasetId,
  });

  if (!purchase) {
    return res.status(403).json({ success: false, message: "You must purchase this dataset first." });
  }

  const dataset = await Dataset.findById(datasetId);
  res.status(200).json({
    success: true,
    originalFiles: dataset.originalFiles, // Direct download URLs
  });
};

export {
    uploadDataset,
    accessAllDataset,
    deleteDatasetByID,
    updateDatasetById,
    accessDatasetByID,
    downloadDataset
};
