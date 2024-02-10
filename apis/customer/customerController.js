const customermodel = require('../customer/customerModel')
const bcryrt = require('bcrypt')
const saltRoutes = 10
const jwt = require('jsonwebtoken')

module.exports = {
    login,
    registerUser,
    updatepwd
}

async function login(req,res){
    let validations = []
    if(!req.body.email){
        validations.push('email')
    }
    if(!req.body.password){
        validations.push('password')
    }
    if(validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join(',')+'is/are required'
        })
    }
    else{
        let existingUser = await customermodel.findOne({email:req.body.email})
    
        if(!existingUser){
            res.send({
                success:false,
                status:409,
                message:"user doesn't exist"
            })
        }
        else{
            let matching = bcryrt.compareSync(req.body.password,existingUser.password)
    
            if(!matching){
                res.send({
                    success:false,
                    status:400,
                    message:"invalid credentials"
                })
            }
            else{
                let payload = {
                    id:existingUser._id,
                    name:existingUser.name
                }
                let token = jwt.sign(payload,"SECRET")
                res.send({
                    success:true,
                    status:200,
                    message:"login successfully",
                    token:token
                })
            }
        }
    }
}
    
function registerUser(req,res){
    let validations = []
    
    if(!req.body.name){
        validations.push('name')
    }
    if(!req.body.email){
        validations.push('email')
    }
    if(!req.body.phone){
        validations.push('phone')
    }
    if(!req.body.password){
        validations.push('password')
    }
    if(validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join(',')+' is required'
        })
    }
    else{
        customermodel.findOne({email:req.body.email}).then(obj=>{
            if(!!obj){
                res.send({
                    success:false,
                    status:409,
                    message:"user already exists with this email"
                })
            }
            else{
                customermodel.countDocuments().then(total=>{
                    let obj = new customermodel()
                    obj.autoId = total+1
                    obj.name = req.body.name
                    obj.email = req.body.email
                    obj.phone = req.body.phone
    
                    const hashedpwd = bcryrt.hashSync(req.body.password, saltRoutes)
                    obj.password = hashedpwd
    
                    obj.save().then(doc=>{
                        res.send({
                            success:true,
                            status:200,
                            message:"added successfully",
                            data:doc  
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
                        status:400,
                        message:"ERROR =>"+err
                    })
                })
            }
        }).catch(err=>{
            res.send({
                success:false,
                status:400,
                message:"ERROR =>"+err
            })
        })
    }
} 

async function updatepwd(req,res){
    validations = []
    
    if(!req.body.id){
        validations.push('Id')
    }
    if(!req.body.oldPassword){
        validations.push('Old Password')
    }
    if(!req.body.newPassword){
        validations.push('New Password')
    }
    if(validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join(',')+" is/are required"
        })
    }
    let existingpwd = await customermodel.findOne({password:req.body.oldpassword})
    if(!existingpwd){
        res.send({
            success:false,
            status:409,
            message:"not exist password"
        })
    }
    else{
        let hasMatched = bcryrt.compareSync(req.body.oldPassword, existingpwd.password)
        if(!hasMatched){
            res.send({
                success:false,
                status:400,
                message:"not matched password"
            })
        }
        else{
            customermodel.updateOne({_id:req.body.id},{password:req.body.newPassword}).then(doc=>{
                res.send({
                    success:true,
                    status:200,
                    message:"update password",
                    update:doc
                })
            }).catch(err=>{
                res.send({
                    success:false,
                    status:500,
                    message:"ERROR =>"+err
                })
            })
        }
    }
}