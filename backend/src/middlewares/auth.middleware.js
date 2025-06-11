import  jwt  from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const jwtVerify = async (req, res, next) => {
  try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

        // console.log(`Token chekck in middleware: ${token}`);
        

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, token missing" });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid access token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("JWT error:", error);
    res.status(401).json({ success: false, message: "Unauthorized: " + error.message });
  }
};


export { jwtVerify }