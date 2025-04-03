// const asyncHandler = () => {}

const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
}



export {asyncHandler}

/*
// understanding

const asuncHandler = () => {}

//passing "func" as an parameter to another function
const asyncHandler = (func) => {() => {}}

// we have just removes "{}" and added "async" keyword
const asyncHandler = (func) => async () => {}
*/




// const asyncHandler = (fn) => async (req,res,next) => {
//     try {
//         await fn(req,res,next)
//     }catch (error) {
//         res.ststus(error.code || 500).json({
//             sussess: false,
//             message: error.message
//         })
//     }
// }