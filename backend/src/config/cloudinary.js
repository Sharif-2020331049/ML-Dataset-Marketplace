import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv'

dotenv.config(
  {
   path: "./.env" 
  }
)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});


// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: (req, file) => {
//     // Determine resource type based on file
//     let resourceType = 'auto';
//     if (file.mimetype.startsWith('image/')) {
//       resourceType = 'image';
//     } else if (file.mimetype.includes('zip') || file.mimetype.includes('tar')) {
//       resourceType = 'raw';
//     }

//     return {
//       folder: 'datasets',
//       resource_type: resourceType,
//       // Remove format restrictions entirely
//       allowed_formats: null 
//     };
//   }
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: (req, file) => {
//     // Common params for all files
//     const baseParams = {
//       folder: 'datasets',
//       original_filename: true, // Preserve original filename
//       use_filename: true
//     };

//     // Special handling for different file types
//     if (file.fieldname === 'thumbnail') {
//       return {
//         ...baseParams,
//         resource_type: 'image',
//         allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
//         transformation: [{ width: 800, height: 600, crop: 'limit' }] // Optional thumbnail optimization
//       };
//     }
//     else if (file.fieldname === 'originalFiles') {
//       return {
//         ...baseParams,
//         resource_type: 'raw', // Force raw for original dataset files
//         format: '', // No format conversion
//       };
//     }
//     else if (file.fieldname === 'samplePreview') {
//       // Handle sample previews based on actual file type
//       if (file.mimetype.startsWith('image/')) {
//         return {
//           ...baseParams,
//           resource_type: 'image',
//           transformation: [{ width: 1200, crop: 'scale' }] // Optional preview optimization
//         };
//       }
//       return {
//         ...baseParams,
//         resource_type: 'raw'
//       };
//     }

//     // Default case
//     return {
//       ...baseParams,
//       resource_type: 'auto'
//     };
//   }
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: (req, file) => {
//     // Default parameters (for thumbnails, etc.)
//     const baseParams = {
//       folder: 'datasets',
//       use_filename: true,
//       unique_filename: false,
//       overwrite: false,
//     };

//     // Handle ZIP files (force raw, no transformations)
//     if (file.originalname.match(/\.(zip|tar|gz)$/i)) {
//       return {
//         ...baseParams,
//         resource_type: 'raw',  // Critical for non-media files
//         format: '',            // Prevents format conversion
//         transformation: null,  // Disables any transformations
//       };
//     }

//     // Handle images (thumbnails, previews)
//     if (file.mimetype.startsWith('image/')) {
//       return {
//         ...baseParams,
//         resource_type: 'image',
//         allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
//       };
//     }

//     // Default case (other files like CSV, JSON)
//     return {
//       ...baseParams,
//       resource_type: 'raw',
//     };
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    // Common parameters for all files
    const baseParams = {
      folder: 'datasets',
      use_filename: true,
      unique_filename: false,
      overwrite: false
    };

    // RAW FILES (ZIP/CSV/JSON/TAR) - NO PROCESSING
    if (file.originalname.match(/\.(zip|csv|json|tar)$/i)) {
      return {
        ...baseParams,
        resource_type: 'raw',       // Force as raw file
        format: '',                 // No format conversion
        transformation: null,       // Disable all transformations
        type: 'authenticated'       // Extra control over delivery
      };
    }

    // IMAGES (Thumbnails/Previews)
    if (file.mimetype.startsWith('image/')) {
      return {
        ...baseParams,
        resource_type: 'image',
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif']
      };
    }

    // Default case (shouldn't reach here with proper fileFilter)
    return {
      ...baseParams,
      resource_type: 'raw' // Fallback to raw
    };
  }
});

export { cloudinary, storage };










// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import dotenv from 'dotenv';
// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'ml_datasets',
//     allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'csv', 'zip', 'json'],
//     resource_type: 'auto',
//   },
// });
// export { cloudinary, storage };