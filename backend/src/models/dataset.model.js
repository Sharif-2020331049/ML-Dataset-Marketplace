import mongoose from "mongoose";
const { Schema } = mongoose;

const datasetSchema = new Schema(
  {
    datasetTitle: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    tags: {
      type: [String],
      required: true,
      default: []
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    license: {
      type: String,
      default: "commercial"
    },
    thumbnail: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
      mimetype: { type: String },
      size: { type: Number }
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,  // Changed to ObjectId reference
      ref: "User",
      required: true
    },
    originalFileId: {
      type: String,  // This stores the reference to the uploaded ZIP file
      required: true
    },
    samplePreview: {
      url: { type: String },
      public_id: { type: String },
      mimetype: { type: String },
      size: { type: Number }
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

// Add text index for search functionality
datasetSchema.index({
  datasetTitle: "text",
  description: "text",
  tags: "text"
});

export const Dataset = mongoose.model("Dataset", datasetSchema);