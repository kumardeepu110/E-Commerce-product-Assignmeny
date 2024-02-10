const router = require('express').Router()

const productcontroller = require('../apis/product/productController')
const customerController = require('../apis/customer/customerController')
const categorycontroller = require('../apis/category/categoryController')
const ordercontroller = require('../apis/order/orderController')


// user 
router.post('/login',customerController.login)
router.post("/register",customerController.registerUser)
router.post("/updatepwd",customerController.updatepwd)

// product
router.post('/product/getone',productcontroller.getOneproduct)
router.post('/product/getall',productcontroller.getAllproduct)

// category 
router.post('/category/addsingle',categorycontroller.addCategory)

// middleware
router.use(require('../middleware/customertokenChecker'))

// customer


// order
router.post('/order/add',ordercontroller.addOrder)
router.post('/order/update',ordercontroller.updateOrder)


module.exports = router
