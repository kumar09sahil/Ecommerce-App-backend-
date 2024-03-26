const express = require('express')
const {createCoupon,getallCoupon,updateCoupon,deleteCoupon} = require('../Controllers/couponCtrl')
const {authMiddleware,isAdmin} = require('../Middlewares/Middleware')



const router = express.Router()
router.post('/createCoupon',authMiddleware,isAdmin,createCoupon)
router.get('/getallCoupon',authMiddleware,isAdmin,getallCoupon)
router.patch('/updateCoupon/:id',authMiddleware,isAdmin,updateCoupon)
router.delete('/deleteCoupon/:id',authMiddleware,isAdmin,deleteCoupon)

module.exports = router