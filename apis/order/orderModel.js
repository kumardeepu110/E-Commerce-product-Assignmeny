const mongoose = require('mongoose')

const modelSchema = mongoose.Schema({
    autoId:{type:Number, default:0},
    userId:{type:mongoose.Types.ObjectId, default:null, ref:"user"},
    productId:{type:mongoose.Types.ObjectId, default:null, ref:"product"},
    price:{type:Number, default:0},
    quantity:{type:Number, default:0},
    total_amount:{type:Number, default:0},
    createdAt:{type:Date, default:Date.now}
})

module.exports = mongoose.model('order',modelSchema)