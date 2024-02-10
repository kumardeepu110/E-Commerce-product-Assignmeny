const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    autoId:{type:Number, default:0},
    name:{type:String, default:''},
    image:{type:String, default:''},
    createdAt:{type:Date, default:Date.now}
})

module.exports = mongoose.model('category',categorySchema)