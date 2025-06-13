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
  fileFilter: (req, file, cb) => {
    // Thumbnail - Only images
    if (file.fieldname === "thumbnail") {
      if (file.mimetype.startsWith("image/")) {
        return cb(null, true);
      }
      return cb(new Error("Thumbnail must be an image (JPEG/PNG)"), false);
    }

    // Original Files - Strict extensions
    if (file.fieldname === "originalFiles") {
      const allowed = [".zip", ".csv", ".json", ".tar"];
      const ext = path.extname(file.originalname).toLowerCase();

      if (allowed.includes(ext)) {
        return cb(null, true);
      }
      return cb(new Error("Only ZIP/CSV/JSON/TAR files allowed"), false);
    }

    // Previews - More flexible
    if (file.fieldname === "samplePreview") {
      return cb(null, true); // Allow all for previews
    }

    return cb(new Error("Unexpected file field"), false);
  },
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

// import multer from "multer";
// import { storage } from "../config/cloudinary.js";

// const allowedOriginalTypes = [
//   'application/zip',
//   'application/x-zip-compressed',
//   'application/x-tar',
//   'application/gzip',
//   'application/json',
//   'text/csv',
//   'text/plain', // For CSV files that report as plain text
//   'application/octet-stream' // Fallback for compressed files
// ];

// // if (!allowedTypes.includes(file.mimetype)) {
// //   return res.status(400).json({ error: 'Original file must be ZIP, TAR, CSV, or JSON' });
// // }

// const allowedImageTypes = [
//   "image/jpeg",
//   "image/png",
//   "image/jpg",
//   "image/webp",
// ];

// const fileFilter = (req, file, cb) => {
//   console.log(
//     `Received file in field: ${file.fieldname}, type: ${file.mimetype}`
//   );

//   if (file.fieldname === "thumbnail") {
//     if (allowedImageTypes.includes(file.mimetype)) cb(null, true);
//     else cb(new Error("Thumbnail must be an image"));
//   } else if (file.fieldname === "originalFiles") {
//     if (allowedOriginalTypes.includes(file.mimetype)) cb(null, true);
//     else cb(new Error("Original file must be ZIP, TAR, CSV, or JSON"));
//   } else if (file.fieldname === "samplePreview") {
//     // Allow all types for samplePreview
//     cb(null, true);
//   } else {
//     console.log("Unknown field name:", file.fieldname);
//     cb(new Error("An unknown file format not allowed"));
//   }
// };

// const upload = multer({
//   storage,
//   limits: { fileSize: 1024 * 1024 * 1024 }, // 50MB limit per file
//   fileFilter,
// });

// // Error handling middleware
// const handleUploadErrors = (err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     console.error('Multer error:', err);
//     return res.status(400).json({
//       error: err.message,
//       type: 'MulterError',
//       code: err.code
//     });
//   } else if (err) {
//     console.error('Upload error:', err);
//     return res.status(500).json({
//       error: err.message,
//       stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
//     });
//   }
//   next();
// };
// export { upload, handleUploadErrors };
