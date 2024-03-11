const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        maxLength:50,
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    isAvatarSet:{
        type:Boolean,
        default:false,
    },
    avatarImage:{
        type:String,
        default:"",
    },
    created_At:{
        type:Date,
        default:Date.now(),
    }
})

module.exports= new mongoose.model("User",userSchema);