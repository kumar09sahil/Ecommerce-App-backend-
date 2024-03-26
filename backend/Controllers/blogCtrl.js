const Blog = require('../Modals/blogModal')
const User = require('../Modals/UserModal')
const asyncHandler = require('express-async-handler')
const validateMongoDBid = require('../Utils/validateMongodbId')
const cloudinaryUploadImg = require('../Utils/cloudinary')
const fs = require('fs')

const createBlog = asyncHandler( async( req,res) =>{
    try {
        const newBlog = await Blog.create(req.body)
        res.status(200).json({
            status:"success",
            message:"blog created succesfully",
            data:{
                blog:newBlog
            }
        })
    } catch (error) {
        throw new Error(error)
    }
})

const updateBlog = asyncHandler (async(req,res) =>{
    try {
        const {id} = req.params;
        validateMongoDBid(id)
        const updateBlog = await Blog.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({
            status:"success",
            message:"blog updated succesfully",
            data:{
                blog:updateBlog
            }
        })
        
    } catch (error) {
        throw new Error(error)
    }
})

const getBlog = asyncHandler (async(req,res) =>{
    try {
        const {id} = req.params;
        validateMongoDBid(id)
        const newBlog = await Blog.findById(id).populate('likes').populate('dislikes');
        const updateBlog =  await Blog.findByIdAndUpdate( id,
            {
                $inc:{numViews : 1},
            },{
                new:true
            },)
        res.status(200).json({
            status:"success",
            message:"blog  succesfully fetched",
            data:{
                blog:newBlog
            }
        })
        
    } catch (error) {
        throw new Error(error)
    }
})

const getAllBlog = asyncHandler( async(req,res) =>{
    try {
        const allBlogs = await Blog.find();
        res.status(200).json({
            status:"success",
            message:"all blog  succesfully fetched",
            data:{
                blog:allBlogs
            }
        })
    } catch (error) {
        throw new Error(error)
    }
})

const deleteBlog = asyncHandler (async(req,res) =>{
    try {
        const {id} = req.params;
        validateMongoDBid(id)
        const deleeBlog = await Blog.findByIdAndDelete(id,);
        res.status(200).json({
            status:"success",
            message:"blog deleted succesfully",
            data:{
                blog:deleeBlog
            }
        })
        
    } catch (error) {
        throw new Error(error)
    }
})

const likeBlog = asyncHandler( async(req,res) =>{
    const {blogId} = req.body
    validateMongoDBid(blogId)
    //* find the blog to like
    const blog = await Blog.findById(blogId)
    //* check for user login 
    const loginUserId = req.user._id;
    //* if user has already liked the post
    const isLiked = blog?.isLiked;
    //* check if the user has already disliked the post
    const alreadyDisliked = blog?.dislikes?.find((userId) => userId?.toString() === loginUserId?.toString)
    if(alreadyDisliked){
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull:{dislikes:loginUserId},
            isDisLiked:false
        },{new:true})
        res.status(200).json({
            status:"success",
            message:"blog likes succesfully",
            data:{
                blog
            }
        })
    }
    if(isLiked){
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull:{likes:loginUserId},
            isLiked:false
        },{new:true})
        res.status(200).json({
            status:"success",
            message:"blog diliked succesfully",
            data:{
                blog
            }
        })
    }
    else{
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $push:{likes:loginUserId},
            isLiked:true
        },{new:true})
        res.status(200).json({
            status:"success",
            message:"blog liked succesfully",
            data:{
                blog
            }
        }) 
    }
})


const dislikeBlog = asyncHandler( async(req,res) =>{
    const {blogId} = req.body
    validateMongoDBid(blogId)
    //* find the blog to like
    const blog = await Blog.findById(blogId)
    //* check for user login 
    const loginUserId = req.user._id;
    //* if user has already liked the post
    const isdisLiked = blog?.isDisliked;
    //* check if the user has already disliked the post
    const alreadyliked = blog?.likes?.find((userId) => userId?.toString() === loginUserId?.toString)
    if(alreadyliked){
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull:{likes:loginUserId},
            isLiked:false
        },{new:true})
        res.status(200).json({
            status:"success",
            message:"blog disliked succesfully",
            data:{
                blog
            }
        })
    }
    if(isdisLiked){
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull:{dislikes:loginUserId},
            isDisliked:false
        },{new:true})
        res.status(200).json({
            status:"success",
            message:"blog liked succesfully",
            data:{
                blog
            }
        })
    }
    else{
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $push:{dislikes:loginUserId},
            isDisliked:true
        },{new:true})
        res.status(200).json({
            status:"success",
            message:"blog disliked succesfully",
            data:{
                blog
            }
        }) 
    }
})


const uploadImages = asyncHandler( async (req,res) =>{
    // console.log(req.files)
    const {id } = req.params
    validateMongoDBid(id)
    try {
        const uploader = (path) =>cloudinaryUploadImg(path,"images")
        const urls = []
        const files = req.files
        for(const file of files){
            const {path} = file;
            const newpath = await uploader(path);
            urls.push(newpath)
            fs.unlinkSync(path)
        }
        const findBlog = await Blog.findByIdAndUpdate(id, {
            images:urls.map((file) => { return file }),
        },{new:true} )

        res.status(200).json({
            status:"success",
            message:"images uploaded successfully",
            data:{
                product:findBlog
            }
        })
    } catch (error) {
        throw new Error(error)
    }
})




module.exports = {createBlog,updateBlog,getBlog,getAllBlog,deleteBlog,likeBlog,dislikeBlog,uploadImages}