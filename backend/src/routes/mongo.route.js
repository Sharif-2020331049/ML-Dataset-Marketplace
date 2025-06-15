import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose'; // <-- Add this import
import { getGFSBucket } from '../cloud/mongodbstore.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('zip'), (req, res) => {
  const file = req.file;

  if (!file || file.mimetype !== 'application/zip') {
    return res.status(400).json({ error: 'Only .zip files are allowed' });
  }

  try {
    const bucket = getGFSBucket();

    const uploadStream = bucket.openUploadStream(file.originalname);
    uploadStream.end(file.buffer);

    uploadStream.on('error', (error) => {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Upload failed' });
    });

    uploadStream.on('finish', () => {
      res.status(201).json({ message: 'ZIP uploaded to GridFS', fileId: uploadStream.id });
    });
  } catch (error) {
    console.error('Bucket error:', error);
    res.status(500).json({ error: 'GridFS not initialized or other error' });
  }
});

router.get('/download/:id', async (req, res) => {
  try {
    const bucket = getGFSBucket();
    const { id } = req.params;
    const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(id));

    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="downloaded.zip"`
    });

    downloadStream.pipe(res).on('error', (err) => {
      res.status(500).json({ error: 'Download error', details: err.message });
    });
  } catch (err) {
    res.status(500).json({ error: 'Invalid file ID', details: err.message });
  }
});

export default router;
