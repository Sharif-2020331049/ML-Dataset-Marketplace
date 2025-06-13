import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  datasetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dataset",
    required: true,
  },
  amount: { type: Number, required: true },
  paymentId: String,
  purchaseDate: { type: Date, default: Date.now },
});

export const Purchase = mongoose.model("Purchase", purchaseSchema);
