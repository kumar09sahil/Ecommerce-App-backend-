const express = require('express')
const {createCategory,updateCategory,deleteCategory,getaCategory,getallCategory} = require('../Controllers/prodcategoryCtrl')
const {authMiddleware,isAdmin} = require('../Middlewares/Middleware')
const { get } = require('mongoose')
const router = express.Router()

router.post('/createprodCategory',authMiddleware,isAdmin,createCategory)
router.put('/updateprodCategory/:id',authMiddleware,isAdmin,updateCategory)
router.delete('/deleteprodCategory/:id',authMiddleware,isAdmin,deleteCategory)
router.get('/getprodCategory/:id',getaCategory)
router.get('/getallprodCategory',getallCategory)


module.exports = router