import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import { getGFSBucket } from '../cloud_mongo/mongodb_store.js';

const router = express.Router();

// Setup multer to keep uploaded files in memory
const inMemoryStorage = multer.memoryStorage();
const fileUploader = multer({ storage: inMemoryStorage });

// Route to handle uploading ZIP archives to GridFS
router.post('/upload', fileUploader.single('archive'), (req, res) => {
  const zipFile = req.file;

  // Reject if file is missing or is not a .zip
  if (!zipFile || zipFile.mimetype !== 'application/zip') {
    return res.status(400).json({ error: 'Only ZIP files are supported for upload' });
  }

  try {
    const gridBucket = getGFSBucket();

    // Initiate upload stream into GridFS
    const streamToGridFS = gridBucket.openUploadStream(zipFile.originalname);
    streamToGridFS.end(zipFile.buffer);

    streamToGridFS.on('error', (err) => {
      console.error('Error while saving to GridFS:', err);
      res.status(500).json({ error: 'Failed to store the archive' });
    });

    streamToGridFS.on('finish', () => {
      res.status(201).json({
        message: 'Archive successfully stored in GridFS',
        fileId: streamToGridFS.id
      });
    });
  } catch (err) {
    console.error('GridFS error:', err);
    res.status(500).json({ error: 'Internal server issue during upload' });
  }
});

// Route to download a ZIP file using its ObjectId
router.get('/download/:fileId', async (req, res) => {
  try {
    const gridBucket = getGFSBucket();
    const fileObjectId = new mongoose.Types.ObjectId(req.params.fileId);

    const streamFromGridFS = gridBucket.openDownloadStream(fileObjectId);

    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="archive.zip"'
    });

    streamFromGridFS.pipe(res).on('error', (streamError) => {
      res.status(500).json({ error: 'Error during download', details: streamError.message });
    });
  } catch (err) {
    res.status(500).json({ error: 'Provided ID is invalid or corrupted', details: err.message });
  }
});

export default router;
