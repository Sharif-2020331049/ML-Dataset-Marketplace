import express from 'express'
import cors from 'cors'
import cookieParser  from 'cookie-parser'
import userRouter from './routes/user.route.js'
import datasetRouter from './routes/dataset.route.js'
import purchaseRouter from './routes/purchase.route.js'

const app = express()

// Middlewares 
app.use(cors({
  origin: '*'
}));

app.use([express.json(), express.urlencoded({extended: true}), cookieParser()])

// Api endpoints
app.use('/api/v1/user', userRouter)
app.use('/api/v1/dataset', datasetRouter)

// payment
app.use('/api/v1/dataset', purchaseRouter)

export { app }