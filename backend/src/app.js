import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.router.js'
import datasetRouter from './routes/dataset.router.js'
const app = express()

// Middlewares 
app.use([cors(), express.json(), express.urlencoded({extended: true})])

// Api endpoints
app.use('/api/v1/user', userRouter)
app.use('/api/v1/dataset', datasetRouter)

export { app }