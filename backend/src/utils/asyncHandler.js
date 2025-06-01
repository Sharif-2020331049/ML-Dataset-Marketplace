const asyncHandler = ( requestHandler )=>{
    return   (req, res, next)=>{
        Promise.resolve(requestHandler(req,res,next)).
        catch(err=> next(err))
    }
}


export {asyncHandler}



/* Example of higher order function */
// const asyncHandler = (fn)=> async ()=> {} 
// const asyncHandler1 = (func)=> { return async ()=> { 
//     // in this function we use func parameter which is come as a parameter and this function we return
// }  }  

// using try-catch

// const asyncHandler = (fn) => async (req, res, next)=> {

//     try {
//         await fn(req, res, next)
        
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }