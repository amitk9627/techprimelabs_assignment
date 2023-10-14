const mongoose = require('mongoose');
const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:false
    }
})
const Users= mongoose.model('User',userSchema);
module.exports=Users;