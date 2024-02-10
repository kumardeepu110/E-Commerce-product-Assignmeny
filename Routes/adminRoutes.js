const router = require('express').Router()
const productcontroller = require('../apis/product/productController')
const customerController = require('../apis/customer/customerController')
const categorycontroller = require('../apis/category/categoryController')
const ordercontroller = require('../apis/order/orderController')
const multer = require('multer')
const path = require('path')

// single file upload
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'public/category/')
    },
    filename: function(req,file,cb){
        const fn = Date.now()+path.extname(file.originalname)
        cb(null,fn)
    }
})

// multiple file upload
const storage2 = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'public/category/')
    },
    filename: function(req,file,cb){
        const fn2 = Date.now()+path.extname(file.originalname)
    }
})
// single and multiple file upload
const upload = multer({storage:storage})

// user 
router.post('/login',customerController.login)
router.post("/register",customerController.registerUser)
router.post("/updatepwd",customerController.updatepwd)

// middleware
router.use(require('../middleware/tokenChecker'))

// product
router.post('/product/add',upload.array('images',5),productcontroller.products)
router.post('/product/getone',productcontroller.getOneproduct)
router.post('/product/getall',productcontroller.getAllproduct)
router.post('/product/update',productcontroller.updateOneproduct)
router.post('/product/updatemany',productcontroller.updateManyProduct)
router.post('/product/findoneupdate',productcontroller.updateproduct)
router.post('/product/delete',productcontroller.deleteOnepoduct)
router.post('/product/deletemany',productcontroller.deleteManyProduct)

// category 
router.post('/category/addsingle',upload.single('image'),categorycontroller.addCategory)

// order
router.post('/order/add',ordercontroller.addOrder)
router.post('/order/update',ordercontroller.updateOrder)

module.exports = router
