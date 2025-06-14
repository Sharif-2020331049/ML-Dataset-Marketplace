// models/admin.model.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const adminSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  refreshToken: String
});

adminSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, role: 'admin' },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );
};

adminSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const Admin = mongoose.model('Admin', adminSchema);