import express from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { confirmPayment,  checkIfPurchased } from "../controllers/purchase.controller.js";

const purchaseRouter = express.Router();


purchaseRouter.post('/confirm',jwtVerify, confirmPayment)
purchaseRouter.get('/status/:id', jwtVerify, checkIfPurchased);


export default purchaseRouter;