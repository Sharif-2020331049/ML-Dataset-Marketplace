import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
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

      //  console.log(createdUser);
       
       const {accessToken, refreshToken }= await generateAccessAndRefreshToken(createdUser._id)

 
      //  console.log(accessToken);
       
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
        return res.json({success: false, message: "Invalid user credentials"})
      }

      const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

      // const loggedInUser = await User.findById(user._id).
      // select("-password -refreshToken")

    //   const options = {
    //     httpOnly: true,
    //     secure: true
    //  }
 
     return res
     .status(200)
    //  .cookie("accessToken", accessToken, options)
    //  .cookie("refreshToken", refreshToken, options)
     .json(
 
       {success:true, token: accessToken, message: "User LoggedIn successfully!"}
     )

     
    } catch (error) {
      console.log(error);
    res.json({success:false, message: error.message || "Error occured during Login" })
        
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

const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ success: true, totalUsers });
  } catch (error) {
    console.error("Error getting user stats:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user statistics" });
  }
};


// const allUserForAdmin = async (req, res) => {
//   try {
//     // Get query parameters
//     const { search = '', status } = req.query;
    
//     // Build query
//     const query = {};
    
//     // Search filter
//     if (search) {
//       query.$or = [
//         { firstName: { $regex: search, $options: 'i' } },
//         { lastName: { $regex: search, $options: 'i' } },
//         { email: { $regex: search, $options: 'i' } }
//       ];
//     }
    
//     // Status filter
//     if (status && ['active', 'suspended'].includes(status)) {
//       query.status = status;
//     }

//     // Get all users matching query (without pagination for now)
//     const users = await User.find(query)
//       .select('-password -refreshToken -cartData')
//       .sort({ createdAt: -1 });

//     // Format response data to match frontend expectations
//     const formattedUsers = users.map(user => ({
//       _id: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       status: user.status,
//       uploads: user.uploads?.length || 0,
//       purchases: user.purchases?.length || 0,
//       createdAt: user.createdAt
//     }));

//     return res.status(200).json(formattedUsers); // Directly return the array

//   } catch (error) {
//     console.error('Error fetching users for admin:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to fetch users'
//     });
//   }
// };

const allUserForAdmin = async (req, res) => {
  try {
    const { search = '' } = req.query;
    
    const query = {};
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('-password -refreshToken -cartData')
      .sort({ createdAt: -1 })
      .lean();

    const formattedUsers = users.map(user => ({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      status: user.status || 'active', // Default to active if not set
      uploads: user.uploads?.length || 0,
      purchases: user.purchases?.length || 0,
      createdAt: user.createdAt
    }));

    res.status(200).json({ 
      success: true,
      users: formattedUsers 
    });

  } catch (error) {
    console.error('Error fetching users for admin:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
};

export {
    registerUser,
    loginUser,
    adminLogin,
    getUserStats,
    allUserForAdmin
}







// import { User } from "../models/user.model.js";
// import { ApiError } from "../utils/ApiError.js";
// // import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import validator from 'validator'
// import jwt from "jsonwebtoken";


// const generateAccessAndRefreshToken = async (userId)=>{
//   try {
//      const user = await User.findById(userId)
//      const accessToken = user.generateAccessToken()
//      const refreshToken = user.generateRefreshToken()
  
//      user.refreshToken = refreshToken
  
//      await user.save({validateBeforeSave: false})
  
//      return {accessToken, refreshToken}
//   } catch (error) {
//     console.log(error);
//     throw new ApiError(500, 'Problem occurred while creating Access and Refresh token')
    
    
//   }
// }

// const registerUser = asyncHandler( async (req, res)=>{
  
//     try {
//         const { firstName, lastName, email, password } = req.body
//         const exist = await User.findOne({email})

//         if(exist){
//             // throw new ApiError(401, 'User already exists')
//             return res.json({success: false, message: "User already exists"})
//         }

//         if(!validator.isEmail(email)){
//             // throw new ApiError(401, 'Please enter a valid email')
//             return res.json({success: false, message: "Please enter a valid email"})
//         }

//         if (password.length < 4) {
//             // throw new ApiError(401, 'Please enter a strong password') 
//             return res.json({success: false, message: "Please enter a strong password"})
//           }

//         const user = await User.create({
//             firstName,
//             lastName,
//             email,
//             password
//         })

//        const createdUser = await User.findById(user._id).select(
//         "-password -refreshToken"
//        )

//       //  console.log(createdUser);
       
//        const {accessToken, refreshToken }= await generateAccessAndRefreshToken(createdUser._id)

 
//       //  console.log(accessToken);
       
//        if(!createdUser) {
//         // throw new ApiError(500, "Something went wrong while regitering the user")
//         return res.json({success: false, message: "Something went wrong while regitering the user"})
//       }

//       // return res.status(201).json(
//       //   new ApiResponse(200, createdUser, "User registered successfully!")
//       // )

//         res.json({success:true, token: accessToken, message: "User registered successfully!"})

//     } catch (error) {

//         console.log(error);
//          res.json({success:false, message: error.message })
        
//         // throw new ApiError(500, 'Something happens while registering user')
        
//     }
// })

// const loginUser = asyncHandler( async (req, res)=>{

//     try {
//         const { email, password } = req.body

//         if(!email && !password){
//             throw new ApiError(400, 'username or email is required!')
//           }
  
//       const user =  await User.findOne({email})

//       if(!user){
//          return res.json({success:false, message: "User doesn't exist"})
//       }

//       const isPasswordMatch = await user.isPasswordCorrect(password)

//       if(!isPasswordMatch){
//         return res.json({success: false, message: "Invalid user credentials"})
//       }

//       const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

//       // const loggedInUser = await User.findById(user._id).
//       // select("-password -refreshToken")

//     //   const options = {
//     //     httpOnly: true,
//     //     secure: true
//     //  }
 
//      return res
//      .status(200)
//     //  .cookie("accessToken", accessToken, options)
//     //  .cookie("refreshToken", refreshToken, options)
//      .json(
 
//        {success:true, token: accessToken, message: "User LoggedIn successfully!"}
//      )

     
//     } catch (error) {
//       console.log(error);
//     res.json({success:false, message: error.message || "Error occured during Login" })
        
//     }

// })

// const adminLogin = async (req, res)=>{

//   try {

//     const { email, password } = req.body

//     if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

//        const token = jwt.sign(
//         {
//           email,
//           password

//         }, 
//         process.env.ACCESS_TOKEN_SECRET
//       )

//        res.json(
//         {
//           success: true,
//           message: "Admin login successfully",   
//           token
//         }
//       )
//     }else{
//       res.json({success:false, message: "Invalid credentials"})
//     }
    
//   } catch (error) {
//     console.log(error);
//     res.json({success:false, message: error.message })
    
//   }

// }

// export {
//     registerUser,
//     loginUser,
//     adminLogin
// }