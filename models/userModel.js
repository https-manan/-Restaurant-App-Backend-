const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:Array
    },
    phone:{
        type:String,
        required:true
    },
    usertype:{
        type:String,
        required:true,
        default:"client",
        enum:["client","admin","vendor","driver"]
    },
    profile:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model('User',userSchema)