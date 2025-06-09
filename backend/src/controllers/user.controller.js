import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import validator from 'validator'
import jwt from "jsonwebtoken";


const generateAccessAndRefreshToken = async (userId)=>{
  try {
     const user = await User.findById(userId)
     const accessToken = user.generateAccessToken()
     const refreshToken = user.generateRefreshToken()
  
     user.refreshToken = refreshToken
  
     await user.save({validateBeforeSave: false})
  
     return {accessToken, refreshToken}
  } catch (error) {
    console.log(error);
    throw new ApiError(500, 'Problem occurred while creating Access and Refresh token')
    
    
  }
}

const registerUser = asyncHandler( async (req, res)=>{
  
    try {
        const { firstName, lastName, email, password } = req.body
        const exist = await User.findOne({email})

        if(exist){
            // throw new ApiError(401, 'User already exists')
            return res.json({success: false, message: "User already exists"})
        }

        if(!validator.isEmail(email)){
            // throw new ApiError(401, 'Please enter a valid email')
            return res.json({success: false, message: "Please enter a valid email"})
        }

        if (password.length < 4) {
            // throw new ApiError(401, 'Please enter a strong password') 
            return res.json({success: false, message: "Please enter a strong password"})
          }

        const user = await User.create({
            firstName,
            lastName,
            email,
            password
        })

       const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
       )

       console.log(createdUser);
       
       const {accessToken, refreshToken }= await generateAccessAndRefreshToken(createdUser._id)

 
       console.log(accessToken);
       
       if(!createdUser) {
        // throw new ApiError(500, "Something went wrong while regitering the user")
        return res.json({success: false, message: "Something went wrong while regitering the user"})
      }

      // return res.status(201).json(
      //   new ApiResponse(200, createdUser, "User registered successfully!")
      // )

        res.json({success:true, token: accessToken, message: "User registered successfully!"})

    } catch (error) {

        console.log(error);
         res.json({success:false, message: error.message })
        
        // throw new ApiError(500, 'Something happens while registering user')
        
    }
})

const loginUser = asyncHandler( async (req, res)=>{

    try {
        const { email, password } = req.body

        if(!email && !password){
            throw new ApiError(400, 'username or email is required!')
          }
  
      const user =  await User.findOne({email})

      if(!user){
         return res.json({success:false, message: "User doesn't exist"})
      }

      const isPasswordMatch = await user.isPasswordCorrect(password)

      if(!isPasswordMatch){
        // throw new ApiError(401, "Invalid user credentials")
        return res.json({success: false, message: "Invalid user credentials"})
      }

      const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

      const loggedInUser = await User.findById(user._id).
      select("-password -refreshToken")

      const options = {
        httpOnly: true,
        secure: true
     }
 
     return res
     .status(200)
     .cookie("accessToken", accessToken, options)
     .cookie("refreshToken", refreshToken, options)
     .json(
      //  new ApiResponse(
      //    200, 
      //    {
      //      user: loggedInUser, accessToken, 
      //             refreshToken
      //    },
      //    "User logged In Successfully"
      //  )
       {success:true, token: accessToken, message: "User LoggedIn successfully!"}
     )

     
    } catch (error) {
      console.log(error);
    res.json({success:false, message: error.message || "Error occured during Login" })
      // throw new ApiError(500, "Problem while login user")  
        
    }

})

const adminLogin = async (req, res)=>{

  try {

    const { email, password } = req.body

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

       const token = jwt.sign(
        {
          email,
          password

        }, 
        process.env.ACCESS_TOKEN_SECRET
      )

       res.json(
        {
          success: true,
          message: "Admin login successfully",   
          token
        }
      )
    }else{
      res.json({success:false, message: "Invalid credentials"})
    }
    
  } catch (error) {
    console.log(error);
    res.json({success:false, message: error.message })
    
  }

}

export {
    registerUser,
    loginUser,
    adminLogin
}