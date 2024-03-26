const express = require('express')
const {createCategory,updateCategory,deleteCategory,getaCategory,getallCategory} = require('../Controllers/blogCategCtrl')
const {authMiddleware,isAdmin} = require('../Middlewares/Middleware')

const router = express.Router()

router.post('/createBlogCategory',authMiddleware,isAdmin,createCategory)
router.put('/updateBlogCategory/:id',authMiddleware,isAdmin,updateCategory)
router.delete('/deleteBlogCategory/:id',authMiddleware,isAdmin,deleteCategory)
router.get('/getBlogCategory/:id',getaCategory)
router.get('/getallBlogCategory',getallCategory)


module.exports = router