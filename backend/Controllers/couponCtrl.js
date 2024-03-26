const Coupon = require('../Modals/CouponModal')
const validaMongodbId = require('../Utils/validateMongodbId')
const asyncHandler = require('express-async-handler')

const createCoupon = asyncHandler (async(req,res) =>{
    try {
        const newCoupon = await Coupon.create(req.body)
        res.status(200).json({
            status:"success",
            message:"coupon created succesfully",
            data:{
                coupon : newCoupon
            }
        })
    } catch (error) {
        throw new Error(error)
    }
})

const getallCoupon = asyncHandler (async(req,res) =>{
    try {
        const allCoupon = await Coupon.find()
        res.status(200).json({
            status:"success",
            message:"coupon  fetched succesfully",
            data:{
                coupon : allCoupon
            }
        })
    } catch (error) {
        throw new Error(error)
    }
})

const updateCoupon = asyncHandler (async(req,res) =>{
    try {
        const {id} = req.params
        validaMongodbId(id)
        const updateCoupon = await Coupon.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            status:"success",
            message:"update  succesfully",
            data:{
                coupon : updateCoupon
            }
        })
    } catch (error) {
        throw new Error(error)
    }
})
const deleteCoupon = asyncHandler (async(req,res) =>{
    try {
        const {id} = req.params
        validaMongodbId(id)
        const deletedCoupon = await Coupon.findByIdAndDelete(id)
        res.status(200).json({
            status:"success",
            message:"deelted  succesfully",
            data:{
                coupon : deletedCoupon
            }
        })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {createCoupon,getallCoupon,updateCoupon,deleteCoupon}