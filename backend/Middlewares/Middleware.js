const User = require('../Modals/UserModal')
const jwt = require('jsonwebtoken')
 const asyncHandler =require('express-async-handler')

 const authMiddleware = asyncHandler ( async(req,res,next) => {
        let token;
        if(req?.headers?.authorization?.startsWith('Bearer'))
        {
            token = req.headers.authorization.split(" ")[1]
            try {
                if(token){
                    const decoded = jwt.verify(token,process.env.SECRET_STR)
                    console.log(decoded)
                    const user = await User.findById(decoded?.id)
                    req.user = user;
                    next()
                }
            } catch (error) {
                throw new Error(" not authorized please login")
            }   
        }else{
            throw new Error("no token found")
        }
 })

const isAdmin = asyncHandler ( async(req,res,next) =>{
    try {
        const finduser = await User.findById(req?.user?._id)
        if(finduser?.role === 'Admin')
        {
            console.log('admin')
            next()
        }
        else{
            console.log('user')
            throw new Error('restricted : not an admin')
        }
    } catch (error) {
        throw new Error(error)
    }
    
})

 module.exports = {authMiddleware,isAdmin}