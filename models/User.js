const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
    },
    updatedAt:{
        type:Date,
    },
    roles:{
        type:String,
        required:true
    },
}); 

module.exports=mongoose.model('User',UserSchema)