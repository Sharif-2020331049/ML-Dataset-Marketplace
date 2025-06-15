import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.route.js'
import datasetRouter from './routes/dataset.route.js'
import purchaseRouter from './routes/purchase.route.js'
import adminRoutes from './routes/admin.route.js';
import aiRoutes from './routes/aiRoutes.js';
import mongoRoutes from './routes/mongo.route.js'
const app = express()

// Middlewares 
app.use([cors(), express.json(), express.urlencoded({extended: true})])

// Api endpoints
app.use('/api/v1/user', userRouter)
app.use('/api/v1/dataset', datasetRouter)
app.use('/api/v1/purchase', purchaseRouter)
// app.js or index.js
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/mongo', mongoRoutes);
export { app }