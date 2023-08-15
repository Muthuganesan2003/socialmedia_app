import User from "../models/user.js";
import { hashPassword ,comparePassword} from "../helpers/auth.js";
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