// controllers/admin.controller.js

import { Admin } from "../models/admin.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * Generate access and refresh tokens for the admin
 */
const generateAccessAndRefreshToken = async (adminId) => {
  const admin = await Admin.findById(adminId);
  const accessToken = admin.generateAccessToken();
  const refreshToken = admin.generateRefreshToken();
  admin.refreshToken = refreshToken;
  await admin.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

/**
 * Register a new admin
 */
const registerAdmin = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return res.status(400).json({ success: false, message: "Admin email already exists" });
  }

  if (password.length < 4) {
    return res.status(400).json({ success: false, message: "Weak password" });
  }

  const newAdmin = await Admin.create({ firstName, lastName, email, password });

  const { accessToken } = await generateAccessAndRefreshToken(newAdmin._id);

  res.status(201).json({
    success: true,
    token: accessToken,
    message: "Admin registered successfully!",
  });
});

/**
 * Log in an existing admin
 */
const loginAdmin = async (req, res) => {
 try {
  
    const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(404).json({ success: false, message: "Admin not found" });
  }

  const isPasswordCorrect = await admin.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(admin._id);

  // Set secure = true only in production
  // const isProduction = process.env.NODE_ENV === 'production';

  res
    .status(200)
    // .cookie("accessToken", accessToken, {
    //   httpOnly: true,
    //   secure: isProduction,    // <-- false in dev, true in prod
    //   sameSite: "Strict",
    //   maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    // })
    // .cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: isProduction,
    //   sameSite: "Strict",
    //   maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    // })
    .json({
      success: true,
      token: accessToken,
      message: "Admin logged in successfully!",
    });

 } catch (error) {
    console.log(error);
    res.json({success: false, message: "Failed in Admin login "})
    
 }
};

export { registerAdmin, loginAdmin };
