import { Purchase  } from "../models/purchase.model.js";

const confirmPayment = async (req, res) => {
  const { datasetId, transactionId, amount, paymentMethod } = req.body;
  const userId = req.user._id;

  const alreadyPurchased = await Purchase.findOne({ userId, datasetId });
  if (alreadyPurchased) {
    return res.status(400).json({ message: "Already purchased." });
  }

  const purchase = new Purchase({
    userId,
    datasetId,
    transactionId,
    amount,
    paymentMethod,
  });

  await purchase.save();
  res.status(201).json({ success: true, purchase });
};

const checkIfPurchased = async (req, res) => {
  const userId = req.user._id;
  const datasetId = req.params.id;

  const purchase = await Purchase.findOne({ userId, datasetId });
  res.status(200).json({ purchased: !!purchase });
};





export {
     confirmPayment,
    checkIfPurchased
    }