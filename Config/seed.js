const customermodel = require('../apis/customer/customerModel')
const bcrypt = require('bcrypt')
const saltRound = 10

const createAdmin = async ()=>{
    let obj = new customermodel({
        name:"Admin",
        email:"admin@gmail.com",
        phone:8102034188,
        password:bcrypt.hashSync('123',saltRound),
        userType:1
    })
    let existingAdmin = await customermodel.findOne({email:obj.email})
    if(!!existingAdmin){
        console.log("Admin is present");
    }
    else{
        obj.save().then(doc=>{
            console.log("Admin is created");
        }).catch(err=>{
            console.log("Admin creation error: "+err);
        })
    }
}

module.exports = {createAdmin}