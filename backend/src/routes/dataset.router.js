import express from 'express'
import { accessAllDataset, accessDatasetByID, deleteDatasetByID, updateDatasetById, uploadDataset } from '../controllers/dataset.controller.js'
import { cloudinary, storage } from '../config/cloudinary.js'
import multer from 'multer'
import { handleUploadErrors, upload } from '../middlewares/multer.js'

const datasetRouter = express.Router()
// const upload = multer({ storage })



datasetRouter.post('/upload',  upload.fields([
  { name: 'originalFiles', maxCount: 10 },
  { name: 'samplePreview', maxCount: 1 },
]),   handleUploadErrors, uploadDataset)

datasetRouter.get('/access', accessAllDataset)

datasetRouter.delete('/delete/:id', deleteDatasetByID)
datasetRouter.patch('/update/:id', updateDatasetById)

datasetRouter.get('/access/:id',accessDatasetByID )

//  upload.fields([
//     { name: 'originalFiles', maxCount: 5 },
//     { name: 'samplePreview', maxCount: 1 }
// ]),

export default datasetRouter