const mongoose = require('mongoose')

const modelSchema = mongoose.Schema({
    autoId:{type:Number, default:0},
    name:{type:String, default:''},
    email:{type:String, default:""},
    phone:{type:Number, default:0},
    password:{type:String, default:''},
    userType:{type:Number, default:2},
    
    createdAt:{type:Date, default:Date.now}
})

module.exports = mongoose.model('user',modelSchema)