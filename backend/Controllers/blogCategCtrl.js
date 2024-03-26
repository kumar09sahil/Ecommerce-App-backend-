const BCategory = require('../Modals/blogCatModal')
const asyncHandler = require('express-async-handler')
const validateMongoDBid = require('../Utils/validateMongodbId')

const createCategory = asyncHandler( async(req,res) =>{
    try {
        const newCategory = await BCategory.create(req.body)
        res.status(200).json({
            status:"success",
            message:"category created succesfully",
            data:{
                category:newCategory
            }
        })
    } catch (error) {
        throw new Error(error)
    }
})

const updateCategory = asyncHandler( async(req,res) =>{
    try {
        const {id} = req.params
        validateMongoDBid(id)
        const updatedCategory = await BCategory.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            status:"success",
            message:"category updated succesfully",
            data:{
                category:updatedCategory
            }
        })
    } catch (error) {
        throw new Error(error)
    }
})

const deleteCategory = asyncHandler( async(req,res) =>{
    try {
        const {id} = req.params
        validateMongoDBid(id)
        const deleteCategory = await BCategory.findByIdAndDelete(id)
        res.status(200).json({
            status:"success",
            message:"category deleted succesfully",
            data:{
                category:deleteCategory
            }
        })
    } catch (error) {
        throw new Error(error)
    }
})

const getaCategory = asyncHandler( async(req,res) =>{
    try {
        const {id} = req.params
        validateMongoDBid(id)
        const getCategory = await BCategory.findById(id)
        res.status(200).json({
            status:"success",
            message:"category fetched",
            data:{
                category:getCategory
            }
        })
    } catch (error) {
        throw new Error(error)
    }
})

const getallCategory = asyncHandler( async(req,res) =>{
    try {
        const getCategory = await BCategory.find()
        res.status(200).json({
            status:"success",
            message:"all category fetched",
            data:{
                category:getCategory
            }
        })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {createCategory,updateCategory,deleteCategory,getaCategory,getallCategory}