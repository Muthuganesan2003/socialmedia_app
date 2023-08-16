import User from "../models/user.js";
import { hashPassword ,comparePassword} from "../helpers/auth.js";
import jwt from "jsonwebtoken";
export const register=async(req,res)=>{
    const{name,email,password,secret}=req.body;
    if(!name){
        return res.status(400).send("Name is required");
    }
    if(!password || password.length<8){
        return res.status(400).send("Password is required and it should be more than 8");
    }
    if(!secret){
        return res.status(400).send("Answer is required");
    }
    if(!email){
        return res.status(400).send("Email is required");
    }
    const exist= await User.findOne({email});
    if(exist){
        return res.status(400).send("Email is already taken");
    }
    const hashedPassword= await hashPassword(password);
    const user=new User({name,email,password:hashedPassword,secret});
    try{
        await user.save();
        console.log("Registration succesful=>",user)
        return res.json({
            ok:true
        })
    }
    catch(err){
        console.log("Register Error=>",err);
        return res.status(400).send("Error occured,Try again");
    }
};
export const login =async(req,res)=>{
const {email,password}=req.body;

try{
//Check for the email id
const user=await User.findOne({email});
if(!user){
    return res.status(400).send("User not found");
}
//Compare password:
const match=await comparePassword(password,user.password);
if(!match){
    return res.status(400).send("Wrong Password");
}
//Token generation:
const token=jwt.sign({_id:user.id,},process.env.JWT_SECRET,{expiresIn:"1d",});
user.password=undefined;
user.secret=undefined;
res.json({
    token,
    user,
});
}

catch(err){
    console.log(err);
    return res.status(400).send("Error,Try again");
}

}