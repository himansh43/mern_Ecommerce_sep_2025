const express= require('express')
const app= express()
require('dotenv').config()
const PORT= process.env.PORT
const mongoose= require('mongoose')
const mongoDbUrl= process.env.mongoDb_url
mongoose.connect(mongoDbUrl).then(()=>console.log(`mongoDb connected`)).catch(()=>{console.log(`mongoDb disconnected`)})
const cors= require('cors')
const bodyParser= require('body-parser')
const crypto = require("crypto");
const userRoutes= require('./routes/userRoutes')
const productRoutes= require('./routes/productRoutes')
const cartRoutes= require('./routes/cartRoutes')
const orderRoutes= require('./routes/orderRoutes')
const connectCloudinary = require('./cloudinary')

connectCloudinary()
app.use(cors())

app.use(bodyParser.json())

app.get('/',(req,res)=>{res.send(`API is working`)})
app.use('/api/v1/ecommerce/users',userRoutes)
app.use('/api/v1/ecommerce/products',productRoutes)
app.use('/api/v1/ecommerce/carts',cartRoutes)
app.use('/api/v1/ecommerce/orders',orderRoutes)

app.listen(PORT,()=>{console.log(`server started at PORT:${PORT}`)})