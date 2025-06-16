import multer from "multer";
import { storage } from "../config/cloudinary.js";
import path from 'path'

// const upload = multer({
//   storage,
//   limits: { fileSize: 1024 * 1024 * 1024 }, // 1GB limit
//   fileFilter: (req, file, cb) => {
//     cb(null, true);
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 1024 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     // Different rules for different fields
//     if (file.fieldname === "thumbnail") {
//       // Allow only image files for thumbnail
//       if (file.mimetype.startsWith("image/")) {
//         return cb(null, true);
//       }
//       return cb(new Error("Only image files are allowed for thumbnail"));
//     } else if (file.fieldname === "originalFiles") {
//       // Allow only specific data files for originalFiles
//       if (
//         file.mimetype === "text/csv" ||
//         file.originalname.match(/\.(csv|zip|tar|json)$/i)
//       ) {
//         return cb(null, true);
//       }
//       return cb(
//         new Error(
//           "Only CSV, ZIP, TAR, and JSON files are allowed for dataset files"
//         )
//       );
//     } else if (file.fieldname === "samplePreview") {
//       // More permissive for sample previews
//       return cb(null, true);
//     }

//     // Default deny for unknown fields
//     cb(new Error("Unexpected file field"));
//   },
// });

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 1024, // 1GB
    files: 10, // Max files per field
  },
  // fileFilter: (req, file, cb) => {
  //   // Thumbnail - Only images
  //   if (file.fieldname === "thumbnail") {
  //     if (file.mimetype.startsWith("image/")) {
  //       return cb(null, true);
  //     }
  //     return cb(new Error("Thumbnail must be an image (JPEG/PNG)"), false);
  //   }

  //   // Original Files - Strict extensions
  //   // if (file.fieldname === "originalFiles") {
  //   //   const allowed = [".zip", ".csv", ".json", ".tar"];
  //   //   const ext = path.extname(file.originalname).toLowerCase();

  //   //   if (allowed.includes(ext)) {
  //   //     return cb(null, true);
  //   //   }
  //   //   return cb(new Error("Only ZIP/CSV/JSON/TAR files allowed"), false);
  //   // }

  //   // Previews - More flexible
  //   if (file.fieldname === "samplePreview") {
  //     return cb(null, true); // Allow all for previews
  //   }

  //   return cb(new Error("Unexpected file field"), false);
  // },
});

const handleUploadErrors = (err, req, res, next) => {
  if (err) {
    console.error("Full Upload Error:", {
      message: err.message,
      stack: err.stack,
      originalError: err,
    });

    let userMessage = "File upload failed";
    if (err.message.includes("format") || err.message.includes("type")) {
      userMessage = `Unsupported file type: ${
        req.files ? Object.keys(req.files).join(", ") : "unknown"
      }`;
    }

    return res.status(400).json({
      error: userMessage,
      details:
        process.env.NODE_ENV === "development"
          ? {
              code: err.code,
              storageErrors: err.storageErrors,
              fileTypes:
                req.files &&
                Object.entries(req.files).map(([field, files]) => ({
                  field,
                  types: files.map((f) => f.mimetype),
                })),
              stack: err.stack,
            }
          : null,
    });
  }
  next();
};

export { upload, handleUploadErrors };
