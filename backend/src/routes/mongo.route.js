import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose'; // Import Mongoose to handle ObjectId
import { getGFSBucket } from '../cloud/mongodbstore.js'; // Function that returns the GridFS bucket

const router = express.Router();

// Configure Multer to store uploaded file in memory (RAM)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to handle .zip file upload to GridFS
router.post('/upload', upload.single('zip'), (req, res) => {
  const file = req.file;

  // Check if a file was uploaded and that it's a ZIP file
  if (!file || file.mimetype !== 'application/zip') {
    return res.status(400).json({ error: 'Only .zip files are allowed' });
  }

  try {
    const bucket = getGFSBucket(); // Get the GridFSBucket instance

    // Create a writable stream to GridFS using the original filename
    const uploadStream = bucket.openUploadStream(file.originalname);
    uploadStream.end(file.buffer); // Write file data to GridFS

    // Handle stream error event
    uploadStream.on('error', (error) => {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Upload failed' });
    });

    // Handle stream finish event
    uploadStream.on('finish', () => {
      res.status(201).json({
        message: 'ZIP uploaded to GridFS',
        fileId: uploadStream.id // Return the file ID for future reference
      });
    });
  } catch (error) {
    // Handle general errors (e.g., bucket not initialized)
    console.error('Bucket error:', error);
    res.status(500).json({ error: 'GridFS not initialized or other error' });
  }
});

// Route to download a ZIP file from GridFS using file ID
router.get('/download/:id', async (req, res) => {
  try {
    const bucket = getGFSBucket(); // Get the GridFSBucket instance
    const { id } = req.params;

    // Convert string ID to MongoDB ObjectId
    const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(id));

    // Set response headers for file download
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="downloaded.zip"`
    });

    // Pipe the download stream into the response
    downloadStream.pipe(res).on('error', (err) => {
      res.status(500).json({ error: 'Download error', details: err.message });
    });
  } catch (err) {
    // Handle errors like invalid ObjectId format
    res.status(500).json({ error: 'Invalid file ID', details: err.message });
  }
});

export default router;
