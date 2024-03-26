const express = require('express')
const {createBlog,updateBlog,getBlog,getAllBlog,deleteBlog,likeBlog,dislikeBlog,uploadImages} = require('../Controllers/blogCtrl')
const {authMiddleware,isAdmin} = require('../Middlewares/Middleware')
const { blogImgResize, uploadPhoto } = require('../Middlewares/uploadimages')
const router = express.Router()

router.post('/createBlog',authMiddleware,isAdmin,createBlog)
router.put("/upload/:id",authMiddleware,isAdmin,uploadPhoto.array('images',5), blogImgResize,uploadImages)

router.patch('/updateBlog/:id',authMiddleware,isAdmin,updateBlog)
router.get('/getBlog/:id',getBlog)
router.get('/getAllBlog',getAllBlog)
router.delete('/deleteBlog/:id',authMiddleware,isAdmin,deleteBlog)
router.put('/likes',authMiddleware,likeBlog)
router.put('/dislikes',authMiddleware,dislikeBlog)

module.exports = router