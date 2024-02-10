const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
   
    let token = req.headers["authorization"]
    if (!token) {
        res.send({
            success: false,
            status: 403,
            message: "token is required"
        })
    }
    else {
        jwt.verify(token, 'SECRET', function (err, decoded) {
            if (err) {
                res.send({
                    success: false,
                    status: 403,
                    message: "Unauthorized"
                })
            }
            else{
                if(decoded.userType!=2){
                    res.send({
                        success:false,
                        status:403,
                        message:"unauthorized"
                    })
                }
                else{
                    req.decoded= decoded
                    next() 
                }
            }
        });
    }
}