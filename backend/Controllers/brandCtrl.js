const Brand = require('../Modals/brandModal')
const asyncHandler = require('express-async-handler')
const validateMongoDBid = require('../Utils/validateMongodbId')

const createCategory = asyncHandler( async(req,res) =>{
    try {
        const newCategory = await Brand.create(req.body)
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
        const updatedCategory = await Brand.findByIdAndUpdate(id,req.body,{new:true})
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
        const deleteCategory = await Brand.findByIdAndDelete(id)
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
        const getCategory = await Brand.findById(id)
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
        const getCategory = await Brand.find()
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