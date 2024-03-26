const { response } = require('express');
const User = require('../Modals/UserModal')
const Product = require('../Modals/productModal')
const Cart = require('../Modals/cartModal')
const Coupon = require('../Modals/CouponModal')
const Order = require('../Modals/orderModal')
const asyncHandler = require("express-async-handler")
const jsonwebtoken = require('../Config/jwtToken');
const validateMongoDBid = require('../Utils/validateMongodbId');
const { Refreshjsonwebtoken } = require('../Config/refreshToken');
const jwt = require('jsonwebtoken');
const sendEmail = require('./emailCtrl');
const crypto = require('crypto')
const uniqid = require('uniqid')

 const createuser =asyncHandler (async(req,res) =>{
  
        const email = req.body.email
        const finduser =await User.findOne({email})
        if(!finduser)
        {
            //* create a new user
            const newUser =await User.create(req.body);
            res.status(200).json({
                status:"success",
                data:{
                    user:newUser
                }
            })
        }
        else
        {
            //*user already exists
            throw new Error('user already exists')
        }
    
})

const loginuser = asyncHandler( async(req,res) =>{
        const {email,password} = req.body;
        const finduser = await User.findOne({email})
        if(!password)
        {
            throw new Error('enter the password')
        }
        if(!finduser)
        {
            throw new Error('user does not exists : please enter a valid email')
        }
        const match =  await finduser.IspasswordMatch(password,finduser.password)
        if(!match)
        {
            throw new Error('invalid password')
        }
        const token = jsonwebtoken(finduser?._id)
        const refreshToken = await Refreshjsonwebtoken(finduser?._id)
        const updateUser = await User.findByIdAndUpdate(finduser?.id,{
            refreshToken
        }, { new:true})
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            maxAge: 72*60*60*1000
        })
        res.status(200).json({
            status:'success',
            token,
            data:{
                user:finduser
            }
        })
}  )


const loginAdmin = asyncHandler( async(req,res) =>{
        const {email,password} = req.body;
        const findAdmin = await User.findOne({email})
        if(findAdmin.role !== 'Admin')
        {
            throw new Error('not authorized');
        }
        if(!password)
        {
            throw new Error('enter the password')
        }
        if(!findAdmin)
        {
            throw new Error('user does not exists : please enter a valid email')
        }
        const match =  await findAdmin.IspasswordMatch(password,findAdmin.password)
        if(!match)
        {
            throw new Error('invalid password')
        }
        const token = jsonwebtoken(findAdmin?._id)
        const refreshToken = await Refreshjsonwebtoken(findAdmin?._id)
        const updateUser = await User.findByIdAndUpdate(findAdmin?.id,{
            refreshToken
        }, { new:true})
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            maxAge: 72*60*60*1000
        })
        res.status(200).json({
            status:'success',
            token,
            data:{
                user:findAdmin
            }
        })
}  )

//* handle a refresh token

const handleRefreshToken = asyncHandler( async (req,res) =>{
    const cookie = req.cookies;
    console.log(cookie)
    if(!cookie?.refreshToken)
        throw new Error('no refresh token in cookies')
    const refreshToken = cookie.refreshToken;
    console.log(refreshToken)
    const user = await User.findOne({refreshToken});
    if(!user)
    {
        throw new Error('no refreash token is present in db')
    }
    jwt.verify(refreshToken,process.env.SECRET_STR, ((err,decoded) =>{
        // console.log(decoded)
        if(err || user?.id !== decoded.id)
        {
            throw new Error("there is something wrong woth refredh token")
        }
        const accessToken = jsonwebtoken(user?._id)
        res.json({
            accessToken
        })
    }))
    // res.status(200).json({
    //     status:"success",
    //     data:{
    //         user
    //     }
    // })
})

const logout  = asyncHandler (async(req,res) =>{
    const cookie = req.cookies;
    if(!cookie?.refreshToken)
    throw new Error('no refresh token in cookies')
    const refreshToken = cookie.refreshToken;
    console.log(refreshToken)
    const user = await User.findOne({refreshToken});
    if(!user)
    {
        res.clearCookie('refreshToken',{
            httpOnly:true,
            secure:true,
        })
        return res.status(204).json({
            status:"fail"
        })
    }
    await User.findOneAndUpdate({
        refreshToken:""
    })
    res.clearCookie('refreshToken',{
        httpOnly:true,
        secure:true,
    })
    return res.status(200).json({
        status:"success"
    })
})

//* update a user 
const updateUser = asyncHandler( async(req,res) =>{
    const id = req.user._id;
    validateMongoDBid(id)
    try {
        const updatedUser = await User.findByIdAndUpdate(id,{
            firstname:req?.body?.firstname,
            lastname:req?.body?.lastname,
            email:req?.body?.email,
            mobile:req?.body?.mobile
        },{new:true})
        res.status(200).json({
            status:"success",
            data:{
                user:updatedUser
            }
        })
        
    } catch (error) {
        throw new Error(error)
    }
})

//* get all user
const fetchAll = asyncHandler( async (req,res) =>{
    try {
        const allusers = await User.find()
        res.status(200).json({
            status:"success",
            data:{
                users:allusers
            }
        })
    } catch (error) {
        throw new Error(error)
    }
    
})

const getuser = asyncHandler( async(req,res) =>{
    try {
        const id = req.user._id;
        validateMongoDBid(id)
        console.log(id)
        const findUser = await User.findById(id)
        res.status(200).json({
        status:"success",
        data:{
            user:findUser
        } 
        })
    } catch (error) {
        throw new Error(error)
    }
    

})
const deleteuser = asyncHandler( async(req,res) =>{
    try {
        const id = req.user._id;
        validateMongoDBid(id)
        console.log(id)
        const deleteUser = await User.findByIdAndDelete(id)
        res.status(200).json({
        status:"success",
        message:'user deleted succesfully',
        data:{
            user:deleteUser
        }
        })
    } catch (error) {
        throw new Error(error)
    }
    

})

const blockUser = asyncHandler( async(req,res) =>{
    try {
        const {id } = req.params;
        validateMongoDBid(id)
        const findUser = await User.findByIdAndUpdate(id,{isBlocked:true},{new:true})
        res.status(400).json({
            status:"success",
            message:"user blocked",
            data:{
                user:findUser
            }
        })
    } catch (error) {
        throw new Error(error)
    }
    
})
const unblockUser = asyncHandler( async(req,res) =>{
    try {
        const {id } = req.params;
        validateMongoDBid(id)
        const findUser = await User.findByIdAndUpdate(id,{isBlocked:false},{new:true})
        res.status(400).json({
            status:"success",
            message:"user unblocked",
            data:{
                user:findUser
            }
        })
    } catch (error) {
        throw new Error(error)
    }
})

const updatePassword = asyncHandler( async(req,res) =>{
    try {
        const {_id} = req.user
        const password = req.body.password;
        const newPassword = req.body.newPassword
        validateMongoDBid(_id)
        const finduser = await User.findById(_id)
        const match =  await finduser.IspasswordMatch(password,finduser.password)
        if(!match || !password)
        {
            throw new Error('invalid password')
        }
        finduser.password = newPassword
        finduser.passwordChangeAt=Date.now()
        await finduser.save()
        res.status(400).json({
            status:"success",
            message:"password updated",
            
        })
    } catch (error) {
        throw new Error(error)
    }

})

const forgotPssordToken = asyncHandler(async(req,res) =>{
    try {
        const email = req.body.email;
        const finduser = await User.findOne({email})
        if(!email || !finduser) 
            throw new Error('no user with this email found ')

        const token = await finduser.createPasswordResetToken();
        await finduser.save();
        var url = `<a href='http://localhost:6000/api/user/ResetPassword/${token}'> click here </a> `
        const html = `please click on the url below to change password \n\n
                        ${url} \n\n link expires in 10 minutes`
        const data = {
            to:email,
            subject:`reset password link`,
            text:'hey user....!',
            html,
        } 
        sendEmail(data)
        res.status(400).json({
            status:"success",
            message:"email sent succesfully",
            token
            
        })
    } catch (error) {
        throw new Error(error)
    }
    
})

const ResetPassword = asyncHandler( async(req,res) =>{
    const {password} = req.body;
    const { token } = req.params;
    const resetToken = crypto.createHash('sha256').update(token).digest('hex')
    const finduser = await User.findOne({passwordResetToken:resetToken, passwordResetExpires:{$gt:Date.now()}})
    if(!finduser )
    {
        throw new Error('invalid token or token expired')
    }
    finduser.password = password;
    finduser.passwordResetExpires=undefined;
    finduser.passwordResetToken=undefined;
    finduser.passwordChangeAt = Date.now();
    await finduser.save();
    res.status(400).json({
        status:"success",
        message:"password cahnged succcesfully",
        data:{
            user:finduser
        }
    })
})

const getWishlist = asyncHandler (async(req,res)=>{
    try {
        const {_id} = req.user
        const finduser = await User.findById(_id).populate('wishlist')
        res.status(400).json({
            status:"success",
            message:"wishlisht fetched",
            data:{
                user:finduser
            }
        })
    } catch (error) {
        throw new Error(error)
    }

})

const saveAddress = asyncHandler(async(req,res,next) =>{
    const id = req.user._id;
    validateMongoDBid(id)
    try {
        const updatedUser = await User.findByIdAndUpdate(id,{
            address:req?.body?.address,
        },{new:true})
        res.status(200).json({
            status:"success",
            data:{
                user:updatedUser
            }
        })
        
    } catch (error) {
        throw new Error(error)
    }
})

const userCart = asyncHandler( async(req,res) =>{
    const {_id} = req.user
    validateMongoDBid(_id)
    const {cart} = req.body
    try {
        let products = []
        const finduser = await User.findById(_id)

        //* check if user already have products in cart
        const alredyExistscart = await Cart.findOne({orderby:finduser._id})
        if(alredyExistscart)
        {
            alredyExistscart.remove()
        }
        for(let i=0;i<cart.length; i++)
        {
            let object = {};
            object.product = cart[i]._id;
            object.count = cart[i].count;
            object.color = cart[i].color;
            let getPrice = await Product.findById(cart[i]._id).select("price").exec();
            object.price = getPrice.price;
            products.push(object)
        }
       let cartTotal = 0;
       for(let i=0;i<products.length;i++)
       {
        cartTotal = cartTotal+ products[i].price * products[i].count
       } 
       let newCart = await new Cart({
        products,
        cartTotal,
        orderby:finduser?._id
       }).save()
       res.status(200).json({
        status:"success",
        message:"added to cart succesfully",
        data:{
            cart:newCart
        }
       })

    } catch (error) {
        throw new Error(error)
    }
})

const getUserCart = asyncHandler( async(req,res) =>{
    const {_id} = req.user;
    validateMongoDBid(_id)
    try {
        const cart = await Cart.findOne({orderby:_id}).populate("products.product");
        res.status(200).json({
            status:"success",
            message:"cart fetched succesfull",
            data:{
                cart
            }
        })
    } catch (error) {
        throw new Error(error)
    }
})

const emptyCart = asyncHandler( async(req,res)=>{
    const {_id} = req.user;
    validateMongoDBid(_id)
    try {
       const user = await User.findById(_id)
       const cart = await Cart.findOneAndDelete({ orderby:user._id})
        res.status(200).json({
            status:"success",
            message:"cart empted succesfull",
            data:{
                cart
            }
        })
    } catch (error) {
        throw new Error(error)
    }
})

const applyCoupon = asyncHandler(async(req,res) =>{
    const {coupon} = req.body
    const {_id} = req.user;
    validateMongoDBid(_id)
    const validCoupon = await Coupon.findOne({name:coupon})
    if(validCoupon === null)
    {
        throw new Error('invalid coupon')
    }
    const user = await User.findById(_id);
    let {products,cartTotal} = await Cart.findOne({orderby:user._id}).populate("products.product")
    let totalAfterDiscount = (cartTotal - (cartTotal*validCoupon.discount)/100).toFixed(2)
    const cart = await Cart.findOneAndUpdate({orderby:user._id},{
        totalAfterDiscount
    }, {new:true}) 
    res.status(200).json({
        status:"success",
        message:"coupon apllied succesfully",
        data:{
            cart
        }
    })
})  

const createOrder = asyncHandler(async(req,res) =>{
    const {COD, couponApplied} = req.body
    const {_id} = req.user;
    validateMongoDBid(_id)
    try {
        if(!COD) throw new Error('create cash order failed')
        const user = await User.findById(_id)
    let userCart = await Cart.findOne({orderby : user._id})
    let finalAmount = 0;
    if(couponApplied && userCart.totalAfterDiscount){
        finalAmount = userCart.totalAfterDiscount;
    }else{
        finalAmount = userCart.cartTotal
    }

    let newOrder = await new Order({
        products:userCart.products,
        paymentIntent:{
            id:uniqid(),
            method:"COD" ,
            amount:finalAmount,
            status:"cash on delievery ",
            created : Date.now(),
            currency:"usd",
        },
        orderby:user._id,
        orderStatus:"cash on Delievery"
    }).save()
    let update = userCart.products.map((item)=>{
        return {
            updateOne :{
                filter:{ _id : item.product._id},
                update:{$inc :{ quantity : -item.count, sold: +item.count}}
            }
        }
    })
    const updated = await Product.bulkWrite(update, {});
    res.status(200).json({
        status:"success",
        message:"order created "
    })
    } catch (error) {
        throw new Error(error)
    }
})

const getOrders = asyncHandler( async(req,res) =>{
    const {_id} = req.user;
    validateMongoDBid(_id)
    try {
        const userorders = await Order.findOne({ orderby:_id}).populate('products.product').exec()
        res.status(200).json({
            status:"success",
            message:"fetched all orders",
            data:{
                oders:userorders
            }
        })
    } catch (error) {
        throw new Error(error)
    }
})

const updateOrderStatus =asyncHandler( async(req,res ) =>{
    const {id } = req.params
    const {status} = req.body
    try {
        const updatedOrderStatus = await Order.findByIdAndUpdate(id,{
            orderStatus:status,
            paymentIntent:{
                status:status,
            }
        },{new:true})
        res.status(200).json({
            status:"success",
            message:"order updated succesfully",
            data:{
                order:updatedOrderStatus
            }
        })

    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {createuser,
                loginuser,
                fetchAll,
                getuser,
                deleteuser,
                updateUser,
                blockUser,
                unblockUser,
                handleRefreshToken,
                logout,
                updatePassword,
                forgotPssordToken,
                ResetPassword,
                loginAdmin,
                getWishlist,
                saveAddress,
                userCart,
                getUserCart,
                emptyCart,
                applyCoupon,
                createOrder,
                getOrders,
                updateOrderStatus
            }

