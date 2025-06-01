import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.router.js'
const app = express()

// Middlewares 
app.use([cors(), express.json(), express.urlencoded({extended: true})])

// Api endpoints
app.use('/api/v1/user', userRouter)

export { app }