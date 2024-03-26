const express = require('express')
const {createProduct, getaProduct,getAllProduct,updateProduct, deleteProduct,addToWishlist,rating,uploadImages} = require('../Controllers/ProductCtrl')
const {authMiddleware,isAdmin} = require('../Middlewares/Middleware')
const {uploadPhoto, productImgResize} = require('../Middlewares/uploadimages')
const router = express.Router();

router.post('/createProduct',authMiddleware,isAdmin,createProduct)
router.put("/upload/:id",authMiddleware,isAdmin,uploadPhoto.array('images',10), productImgResize,uploadImages)
router.get('/getAllProduct',getAllProduct)
router.get('/:id',authMiddleware,getaProduct)
router.put('/wishlist',authMiddleware,addToWishlist)
router.put('/rating',authMiddleware,rating)

router.patch('/:id',authMiddleware,isAdmin,updateProduct)
router.delete('/:id',authMiddleware,isAdmin,deleteProduct)

module.exports = router