const mongo = require('mongoose')

mongo.connect('mongodb://127.0.0.1:27017/demoDB').then(doc=>{
    console.log('DB Connected');
}).catch(err=>{
    console.log("ERROR =>"+err);
})

