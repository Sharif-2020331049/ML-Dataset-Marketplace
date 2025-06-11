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


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    // Determine resource type based on file
    let resourceType = 'auto';
    if (file.mimetype.startsWith('image/')) {
      resourceType = 'image';
    } else if (file.mimetype.includes('zip') || file.mimetype.includes('tar')) {
      resourceType = 'raw';
    }

    return {
      folder: 'datasets',
      resource_type: resourceType,
      // Remove format restrictions entirely
      allowed_formats: null 
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