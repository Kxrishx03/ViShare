const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    img:{
        type:String
    },
     subscribers:{
        type:Number,
        default:0
     },
     subscribedUsers:{
        type:[String]
     },
     fromGoogle:{
     type:Boolean,
     default:false }
    }, 
    {timestamps:true});


module.exports = mongoose.model("User",userSchema);