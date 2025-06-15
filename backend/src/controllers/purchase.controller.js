// import { Dataset } from "../models/dataset.model.js";
// import { Purchase } from "../models/purchase.model.js";
// import Stripe from "stripe";
// import dotenv from 'dotenv'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const confirmPayment = async (req, res) => {
//   try {
//     const { email, address, city, zipCode, datasetId } = req.body;
//     const { origin } = req.headers;
//     // Fetch dataset details
//     console.log("Authenticated user:", req.user);
//     console.log("passing origin: ", origin);

//     const dataset = await Dataset.findById(datasetId);
//     if (!dataset) {
//       return res.status(404).json({ error: "Dataset not found" });
//     }

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: dataset.datasetTitle,
//               description: dataset.description,
//               images: [dataset.thumbnail.url],
//             },
//             unit_amount: Math.round(dataset.price * 100), // Stripe needs price in cents
//           },
//           quantity: 1,
//         },
//       ],
//       metadata: {
//         userId: req.user._id.toString(),
//         datasetId: dataset._id.toString(),
//         email,
//         address,
//         city,
//         zipCode,
//       },
//       success_url: `${origin}/payment-success`,
//       cancel_url: `${origin}/dataset/${datasetId}`,
//       customer_email: email,
//     });

//     return res.status(200).json({ success: true, session_url: session.url });
//   } catch (error) {
//     console.error("Stripe session error:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// const checkIfPurchased = () => {};

// export { confirmPayment, checkIfPurchased };

import { Dataset } from "../models/dataset.model.js";
import { Purchase } from "../models/purchase.model.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const confirmPayment = async (req, res) => {
  try {
    const { email, address, city, zipCode, datasetId } = req.body;
    const { origin } = req.headers;
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
            unit_amount: Math.round(dataset.price * 100),
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
      // Add client_reference_id to identify the user
      client_reference_id: req.user._id.toString(),
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dataset/${datasetId}`,
      customer_email: email,
    });

    return res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// const handlePaymentSuccess = async (req, res) => {
//   try {
//     const { session_id } = req.query;

//     if (!session_id) {
//       return res.status(400).json({ error: "Session ID is required" });
//     }

//     // Verify the payment with Stripe
//     const session = await stripe.checkout.sessions.retrieve(session_id);

//     if (session.payment_status !== "paid") {
//       return res.status(400).json({ error: "Payment not completed" });
//     }

//     // Extract metadata from the session
//     const { userId, datasetId } = session.metadata;

//     // Record the purchase in your database
//     const purchase = await Purchase.create({
//       userId: userId,
//       datasetId: datasetId,
//       amount: session.amount_total / 100,
//       paymentId: session.id,
//       purchaseDate: new Date(),
//     });

//     // Get the dataset download link
//     const dataset = await Dataset.findById(datasetId);
//     const downloadLink = dataset.originalFiles[0].url;

//     // In your handlePaymentSuccess controller
//     console.log("Original file URL:", dataset.originalFiles[0].url);
//     res.json({
//       success: true,
//       downloadLink,
//       datasetId,
//     });
//   } catch (error) {
//     console.error("Payment processing error:", error);
//     res.status(500).json({ error: "Payment processing failed" });
//   }
// };

const handlePaymentSuccess = async (req, res) => {
  try {
    const { session_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    const { datasetId } = session.metadata;
    const downloadLink = `/api/datasets/download/${datasetId}`; // Use the new endpoint


    const user = await User.findById(req.user?._id);
    await user.addPurchase(datasetId);
    
    res.json({
      success: true,
      downloadLink, // This now points to your server, not Cloudinary directly
      datasetId,
    });
  } catch (error) {
    console.error("Payment processing error:", error);
    res.status(500).json({ error: "Payment processing failed" });
  }
};

const checkIfPurchased = async (req, res) => {
  // Implementation for checking if user purchased a dataset
};

export { confirmPayment, handlePaymentSuccess, checkIfPurchased };
