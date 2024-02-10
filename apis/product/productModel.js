const mongoose = require('mongoose')

const modelSchema = mongoose.Schema({
    
    categoryId:{type:mongoose.Types.ObjectId, default:null, ref:'category'},
    autoId:{type:Number, default:0},
    name:{type:String, default:''},
    images:[{type:String, default:''}],
    description:{type:String, default:''},
    price:{type:Number, default:0},
    stock:{type:Number, default:0},
    expiryDate:{type:String, default:''},
    status:{type:Date, default:null},
    createdAt:{type:Date, default:Date.now}
})

module.exports = mongoose.model('product',modelSchema)