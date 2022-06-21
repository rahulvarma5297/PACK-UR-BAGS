const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        // required:true
    },
    username:{
        type:String,
        // required:true
    },
    phone:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        // required:true
    },
    image:{
        data:Buffer,
        contentType:String
    },
    password:{
        type:String,
        // required:true
    }
});
const User=mongoose.model('User',UserSchema);
module.exports=User;