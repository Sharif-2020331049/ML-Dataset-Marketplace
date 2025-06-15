import express from 'express'
import { adminLogin, allUserForAdmin, getUserStats, loginUser, registerUser } from '../controllers/user.controller.js'


const userRouter = express.Router()
userRouter.get('/userForAdmin', allUserForAdmin)

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.get('/stats', getUserStats)

export default userRouter

// import express from 'express'
// import { adminLogin, loginUser, registerUser } from '../controllers/user.controller.js'


// const userRouter = express.Router()

// userRouter.post('/register', registerUser)
// userRouter.post('/login', loginUser)
// userRouter.post('/admin', adminLogin)

// export default userRouter


// import express from "express";
// import { jwtVerify } from "../middlewares/auth.middleware.js";
// import { confirmPayment,  checkIfPurchased, handlePaymentSuccess } from "../controllers/purchase.controller.js";

// const purchaseRouter = express.Router();


// purchaseRouter.post('/payment',jwtVerify, confirmPayment)
// purchaseRouter.get('/status/:id', jwtVerify, checkIfPurchased);
// purchaseRouter.get('/payment/success', jwtVerify,  handlePaymentSuccess);


// export default purchaseRouter;



// import express from "express";
// import { jwtVerify } from "../middlewares/auth.middleware.js";
// import { confirmPayment,  checkIfPurchased, handlePaymentSuccess } from "../controllers/purchase.controller.js";

// const purchaseRouter = express.Router();


// purchaseRouter.post('/payment',jwtVerify, confirmPayment)
// purchaseRouter.get('/status/:id', jwtVerify, checkIfPurchased);
// purchaseRouter.get('/payment/success', jwtVerify,  handlePaymentSuccess);


// export default purchaseRouter;