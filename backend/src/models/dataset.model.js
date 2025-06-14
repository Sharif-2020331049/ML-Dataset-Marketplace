import mongoose from "mongoose";
const { Schema } = mongoose;  // Destructure Schema from mongoose

const datasetSchema = new Schema(
  {
    datasetTitle: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String], // Array of tags for better filtering
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    license: {
      type: String,
    },
    thumbnail: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    uploadedBy: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "User", // Assuming you have a user schema
      // required: true,
      type: String,
      required: true,
    },
    originalFiles: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    samplePreview: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"], // added 'rejected'
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Dataset = mongoose.model("Dataset", datasetSchema);



// import mongoose, { Schema } from "mongoose";

// const datasetSchema = new Schema(
//   {
//     datasetTitle: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     category: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     tags: {
//       type: [String], // Array of tags for better filtering
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     license: {
//       type: String,
//     },
//     thumbnail: {
//       url: { type: String, required: true },
//       public_id: { type: String, required: true },
//     },
//     uploadedBy: {
//       // type: mongoose.Schema.Types.ObjectId,
//       // ref: "User", // Assuming you have a user schema
//       // required: true,
//       type: String,
//       required: true,
//     },
//     originalFiles: [
//       {
//         url: { type: String, required: true },
//         public_id: { type: String, required: true },
//       },
//     ],
//     samplePreview: {
//       url: { type: String, required: true },
//       public_id: { type: String, required: true },
//     },
//     status: {
//       type: String,
//       enum: ["pending", "approved", "rejected"], // added 'rejected'
//       default: "pending",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export const Dataset = mongoose.model("Dataset", datasetSchema);
