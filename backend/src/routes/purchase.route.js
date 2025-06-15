import express from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { confirmPayment,  checkIfPurchased, handlePaymentSuccess } from "../controllers/purchase.controller.js";

const purchaseRouter = express.Router();


purchaseRouter.post('/payment',jwtVerify, confirmPayment)
purchaseRouter.get('/status/:id', jwtVerify, checkIfPurchased);
purchaseRouter.get('/payment/success', jwtVerify,  handlePaymentSuccess);


export default purchaseRouter;


// import express from "express";
// import { jwtVerify } from "../middlewares/auth.middleware.js";
// import { confirmPayment,  checkIfPurchased, handlePaymentSuccess } from "../controllers/purchase.controller.js";

// const purchaseRouter = express.Router();


// purchaseRouter.post('/payment',jwtVerify, confirmPayment)
// purchaseRouter.get('/status/:id', jwtVerify, checkIfPurchased);
// purchaseRouter.get('/payment/success', handlePaymentSuccess);


// export default purchaseRouter;