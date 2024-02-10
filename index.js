const express = require('express')
require('./Config/db')
const productcontroller = require('./apis/product/productController')
const productmodel = require('./apis/product/productModel')
const customermodel = require('./apis/customer/customerModel')
const customercontroller = require('./apis/customer/customerController')
const categorymodel = require('./apis/category/categoryModel')
const categorycontroller = require('./apis/category/categoryController')
const ordermodel = require('./apis/order/orderModel')
const ordercategory = require('./apis/order/orderController')
const adminroutes = require('./Routes/adminRoutes')
const customerroutes = require('./Routes/customerRoutes')

const app = express()

app.use(express.json())

app.use('/admin',adminroutes)
app.use('/api',customerroutes)

app.use(express.static(__dirname+'/public/'))

let seed = require('./Config/seed')
seed.createAdmin()

app.all('*', (req,res)=>{
    res.send({
        success:false,
        status:404,
        message:"invalid address"
    })
})

app.listen(5000, (err)=>{
    if(err){
        console.log("Error =>"+err);
    }
    else{
        console.log("server connected");
    }
})