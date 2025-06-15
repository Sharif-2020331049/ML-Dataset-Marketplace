import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // New fields
    uploads: [{
      type: Schema.Types.ObjectId,
      ref: 'Dataset',
      default: []
    }],
    purchases: [{
      type: Schema.Types.ObjectId,
      ref: 'Dataset',
      default: []
    }],
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active"
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Existing pre-save hook for password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Existing methods
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: `${this.firstName} ${this.lastName}`,
      email: this.email,
      status: this.status
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

// New helper methods
userSchema.methods.addUpload = function(datasetId) {
  if (!this.uploads.includes(datasetId)) {
    this.uploads.push(datasetId);
  }
  return this.save();
};

userSchema.methods.addPurchase = function(datasetId) {
  if (!this.purchases.includes(datasetId)) {
    this.purchases.push(datasetId);
  }
  return this.save();
};

userSchema.methods.changeStatus = function(newStatus) {
  if (["active", "suspended"].includes(newStatus)) {
    this.status = newStatus;
    return this.save();
  }
  throw new Error("Invalid status value");
};

export const User = mongoose.model("User", userSchema);