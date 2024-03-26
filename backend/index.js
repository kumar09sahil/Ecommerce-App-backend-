const express = require('express')
const dotenv = require('dotenv')
const dbConnect = require('./Config/dbConnect')
const authrouter = require('./Routes/authRoutes')
const productrouter = require('./Routes/productRoute')
const blogrouter = require('./Routes/blogRoutes')
const prodcategoryrouter = require('./Routes/prodcategoryRoutes')
const blogcategoryrouter = require('./Routes/blogCatRoute')
const brandrouter = require('./Routes/brandRoutes')
const couponrouter = require('./Routes/CouponRoutes')
const { notFound, errorHandler } = require('./Middlewares/errorHandler')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

dotenv.config({path:'./Config/config.env'})
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 4000

dbConnect()

// app.use('/',(req,res)=>{
//     res.send("hello from server")
// })
app.use('/api/user',authrouter)
app.use('/api/product',productrouter)
app.use('/api/blog',blogrouter)
app.use('/api/prodcategory',prodcategoryrouter)
app.use('/api/blogcategory',blogcategoryrouter)
app.use('/api/brand',brandrouter)
app.use('/api/coupon',couponrouter)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () =>{
    console.log(`server is running on ${PORT}`)
})