const { default: slugify } = require('slugify')
const Product = require('../Modals/productModal')
const asyncHandler = require('express-async-handler')
const Slugify = require('slugify')
const User = require('../Modals/UserModal')
const validateMongoDBid = require('../Utils/validateMongodbId')
const cloudinaryUploadImg = require('../Utils/cloudinary')
const fs = require('fs')

const createProduct = asyncHandler( async(req,res) =>{
    try {
        if(req.body.title){
            req.body.slug = Slugify(req.body.title)
        }
        const newProduct = await Product.create(req.body)
        res.status(200).json({
            status:"success",
           data:{
            Product:newProduct
           }
        })
    } catch (error) {
        throw new Error(error)
    }
    
} )

const updateProduct = asyncHandler( async(req,res) =>{
    const {id }= req.params
    try {
        if(req.body.title){
            req.body.slug = Slugify(req.body.title)
        }
        const updateProduct = await Product.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            status:"success",
           data:{
            Product:updateProduct
           }
        })
    } catch (error) {
        throw new Error(error)
    }
})

const deleteProduct = asyncHandler( async (req,res) =>{
    const {id } = req.params
    try {
        const deleteProduct = await Product.findByIdAndDelete(id)
        res.status(200).json({
            status:"success",
           data:{
            Product:deleteProduct
           }
        })
    } catch (error) {
        throw new Error(error)
    }
})

const getaProduct = asyncHandler( async(req,res) =>{
    try {
        const {id} = req.params
        const findProduct = await Product.findById(id)
        res.status(200).json({
            status:"success",
           data:{
            Product:findProduct
           }
        })
    } catch (error) {
        
    }
})

const getAllProduct = asyncHandler( async(req,res) =>{
    try {

        //* filtering
        const queryObj = {...req.query}
        const queryObj2 = {...queryObj}
        const excludeFields = ["page","sort","fields","limit"]
        excludeFields.forEach((ele) =>{
            delete queryObj2[ele]
        })
        
        console.log(queryObj, "\n",queryObj2)
        let queryStr = JSON.stringify(queryObj2)
        queryStr = JSON.parse(queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`))
        console.log(queryStr)

        let query = Product.find(queryStr)

        //* sorting

        if(req.query.sort)
        {
            const sortBy = req.query.sort.split(',').join(" ")
            query = query.sort(sortBy)
        }
        else
        {
            query = query.sort('-createdAt')
        }

         //*limiting fields
         if(req.query?.fields)
         {
             const fields = req.query.fields.split(",").join(" ");
             
             query = query.select(fields)
         }
         else
         {
             query = query?.select('-__v')
         }

         //* pagination
         let page = req.query?.page 
         let limit = req.query.limit || 5
         const skip = (page-1)*limit;
         query = query.skip(skip).limit(limit);
         if(req.query.page){
            const productCount = await Product.countDocuments();
            if(skip>= productCount)
                throw new Error("page do not exists")
         }

        const AllProduct = await query;
        res.status(200).json({
            status:"success",
            length:AllProduct.length,
           data:{
            Product:AllProduct
           }
        })
   
    } catch (error) {
        throw new Error(error)
    }
})

const addToWishlist = asyncHandler( async(req,res) =>{
    const {_id} = req.user
    const {prodId} = req.body
    try {
        const finduser = await User.findById(_id)
        const alreadyadded = finduser.wishlist.find((id) => id.toString() === prodId)
        if(alreadyadded)
        {
            let finduser = await User.findByIdAndUpdate(_id,{
                $pull :{wishlist: prodId},
            },{new:true}) 
            res.status(200).json({
                status:"success",
                message:"removed from wishlist",
                data:{
                    user:finduser
                }
            })
        }else{
            let finduser = await User.findByIdAndUpdate(_id,{
                $push :{wishlist: prodId},
            },{new:true}) 
            res.status(200).json({
                status:"success",
                message:"added to wishlist",
                data:{
                    user:finduser
                }
            })
        }
    } catch (error) {
        throw new Error(error)
    }
})

const rating = asyncHandler( async(req,res) =>{
    try {
        const {_id} = req.user
        const {star, prodId, Comment} = req.body;
        const product = await  Product.findById(prodId)
        let alreadyRated = product.ratings.find((userId) => userId.postedby.toString() === _id.toString())
        if(alreadyRated)
        {
            const updateRatings = await Product.updateOne(
                {
                    ratings:{$elemMatch : alreadyRated},
                },
                {
                    $set:{ "ratings.$.star":star, "ratings.$.Comment":Comment},
                },
            {new:true})
            
        }else{
            const rateProduct = await Product.findByIdAndUpdate(prodId,{
                $push:{
                    ratings:{
                        star,
                        Comment,
                        postedby:_id
                    }
                }
            },{new : true})
            
        }
        const getallRatings = await Product.findById(prodId)
        let totalRating = getallRatings.ratings.length;
        let ratingSum = getallRatings.ratings.map((item) => item.star).reduce((prev,curr) =>prev + curr, 0)
        let actualRating = Math.round(ratingSum/totalRating);
        let finalproduct = await (Product.findByIdAndUpdate(prodId,{
            totalrating:actualRating
        },{new:true}))
        res.status(200).json({
            status:"success",
            message:"product rated succesfully",
            data:{
                product:finalproduct
            }
        })

    } catch (error) {
        throw new Error(error)
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
             // Check if the file exists before attempting deletion
             if (fs.existsSync(path)) {
                try {
                    // Attempt to delete the file
                    fs.unlinkSync(path);
                } catch (unlinkError) {
                    console.error("Error deleting file:", unlinkError);
                }
            }
        }
        const findProduct = await Product.findByIdAndUpdate(id, {
            images:urls.map((file) => { return file }),
        },{new:true} )

        res.status(200).json({
            status:"success",
            message:"images uploaded successfully",
            data:{
                product:findProduct
            }
        })
    } catch (error) {
        throw new Error(error)
    }
})



module.exports = {createProduct,getaProduct,getAllProduct,updateProduct, deleteProduct,addToWishlist,rating,uploadImages}