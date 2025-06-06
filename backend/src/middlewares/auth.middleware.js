import  jwt  from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const jwtVerify = async (req, res, next)=>{
       try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
 
      if(!token){
        return res.json( {success: false, message: "Not Authorized Login Again"} )
    }
 
     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
     
 
     const user = await User.findById(decodedToken?._id).
     select("-password -refreshToken")
 
     if (!user) {
         //  Next_Video: discuss about frontend
        return res.json( {success: false, message: "Invalid access token"} )
         
     }
 
     req.user = user;
     next()
   } catch (error) {

       console.log(error);
        res.json({success: false, message: error?.message  || "Invalid access token" })
        
    
   }

}

export { jwtVerify }