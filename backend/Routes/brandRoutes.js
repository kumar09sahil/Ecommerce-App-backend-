const express = require('express')
const {createCategory,updateCategory,deleteCategory,getaCategory,getallCategory} = require('../Controllers/brandCtrl')
const {authMiddleware,isAdmin} = require('../Middlewares/Middleware')

const router = express.Router()

router.post('/createBrand',authMiddleware,isAdmin,createCategory)
router.put('/updateBrand/:id',authMiddleware,isAdmin,updateCategory)
router.delete('/deleteBrand/:id',authMiddleware,isAdmin,deleteCategory)
router.get('/getBrand/:id',getaCategory)
router.get('/getallBrand',getallCategory)


module.exports = router