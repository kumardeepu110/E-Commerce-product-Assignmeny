const ordermodel = require('./orderModel')
const productmodel  = require('../product/productModel')

module.exports = {
    addOrder,
    updateOrder
}

function addOrder(req,res){
    let validations = []

    if(!req.body.userId){
        validations.push('userId')
    }
    if(!req.body.productId){
        validations.push('productId')
    }
    if(!req.body.quantity){
        validations.push('Quantity')
    }
    if(validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join(',')+" is/are required"
        })
    }
    else{
        productmodel.findOne({_id:req.body.productId}).then(productobj=>{
            if(!productobj){
                res.send({
                    success:false,
                    status:409,
                    message:"not exist product"
                })
            }
            else if(productobj.stock<=req.body.quantity){
                res.send({
                    success:false,
                    status:403,
                    message:"out of stock"
                })
            }
            else{
                ordermodel.countDocuments().then(total=>{
                    let obj  = new ordermodel()
                    obj.autoId = total+1
                    obj.userId = req.body.userId
                    obj.productId = req.body.productId
                    obj.price = productobj.price
                    obj.quantity = req.body.quantity
                    obj.total_amount = (obj.quantity*productobj.price)
                    productobj.stock =( productobj.stock-obj.quantity)
        
                    obj.save().then(orderdoc=>{
                        res.send({
                            success:true,
                            status:200,
                            message:"order submitted successfully",
                            details:orderdoc
                        })
                    }).catch(err=>{
                        res.send({
                            success:false,
                            status:400,
                            message:"ERROR =>"+err
                        })
                    })
                }).catch(err=>{
                    res.send({
                        success:false,
                        status:500,
                        message:"ERROR =>"+err
                    })
                })
            }
        }).catch(err=>{
            res.send({
                success:false,
                status:600,
                message:"ERROR =>"+err
            })
        })
    }
}

function updateOrder(req,res){
    if(!req.body.id){
        res.send({
            success:false,
            status:400,
            message:"id is required"
        })
    }
    else{
        productmodel.findOne().then(obj=>{
            if(!obj){
                res.send({
                    success:false,
                    status:409,
                    message:"id not found"
                })
            }
            else{
                if(!!req.body.price){
                    obj.price = req.body.price
                }
                if(!!req.body.quantity){
                    obj.quantity = req.body.quantity
                }
                obj.save().then(updateDoc=>{
                    res.send({
                        success:true,
                        status:200,
                        message:"updated successfully",
                        data:obj
                    })
                }).catch(err=>{
                    res.send({
                        success:false,
                        status:400,
                        message:"ERROR =>"+err
                    })
                })
            }
        }).catch(err=>{
            res.send({
                success:false,
                status:500,
                message:"ERROR =>"+err
            })
        })
    }
}