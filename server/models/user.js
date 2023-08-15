import mongoose from "mongoose";
const {Schema}=mongoose;

const userSchema=new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        trim:true,
        required:true,
        min:8,
        max:32,
    },
    secret:{
        type:String,
        required:true,
    },
    about:{},
    photo:String,
    following:[{type:Schema.ObjectId,ref:"User"}],
    followers:[{type:Schema.ObjectId,ref:"User"}],
},{timestamps:true});

export default mongoose.model("User",userSchema);