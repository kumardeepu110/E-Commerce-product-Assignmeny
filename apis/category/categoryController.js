const categorymodel = require('./categoryModel')

module.exports = {
    addCategory
}

function addCategory(req,res){
    let validations = []
    if(!req.body.name){
        validations.push('name')
    }
    if(validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join(',')+' is required'
        })
    }
    else{
        categorymodel.findOne({name:req.body.name}).then(obj=>{
            if(!!obj){
                res.send({
                    success:false,
                    status:409,
                    message:"category name already exist"
                })
            }
            else{
                categorymodel.countDocuments().then(total=>{
                    let obj = new categorymodel()
                    obj.autoId = total+1
                    obj.name = req.body.name
                    // single file upload
                    obj.image = 'category/'+req.file.filename

                    obj.save().then(doc=>{
                        res.send({
                            success:true,
                            status:200,
                            message:"category added successfully",
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
                status:500,
                message:"ERROR =>"+err
            })
        })
    }
}