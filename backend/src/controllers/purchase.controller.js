import { Dataset } from "../models/dataset.model.js";
import { Purchase } from "../models/purchase.model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const confirmPayment = async (req, res) => {
  try {
    const { email, address, city, zipCode, datasetId } = req.body;
    const { origin } = req.headers;
    // Fetch dataset details
    console.log("Authenticated user:", req.user);
    console.log("passing origin: ", origin);


    console.log({ email, address, city, zipCode, datasetId });
    // console.log(origin);

    const dataset = await Dataset.findById(datasetId);
    if (!dataset) {
      return res.status(404).json({ error: "Dataset not found" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: dataset.datasetTitle,
              description: dataset.description,
              images: [dataset.thumbnail.url],
            },
            unit_amount: Math.round(dataset.price * 100), // Stripe needs price in cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: req.user._id.toString(),
        datasetId: dataset._id.toString(),
        email,
        address,
        city,
        zipCode,
      },
      success_url: `${origin}/payment-success`,
      cancel_url: `${origin}/dataset/${datasetId}`,
      customer_email: email,
    });

    return res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// const checkIfPurchased = async (req, res) => {
//   const userId = req.user._id;
//   const datasetId = req.params.id;

//   const purchase = await Purchase.findOne({ userId, datasetId });
//   res.status(200).json({ purchased: !!purchase });
// };

const checkIfPurchased = () => {};

export { confirmPayment, checkIfPurchased };

// const { datasetId, transactionId, amount, paymentMethod } = req.body;
// const userId = req.user._id;

// const alreadyPurchased = await Purchase.findOne({ userId, datasetId });
// if (alreadyPurchased) {
//   return res.status(400).json({ message: "Already purchased." });
// }

// const purchase = new Purchase({
//   userId,
//   datasetId,
//   transactionId,
//   amount,
//   paymentMethod,
// });

// await purchase.save();
// res.status(201).json({ success: true, purchase });
