import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { readdirSync } from "fs";
dotenv.config();
import authRoutes from "./routes/auth.js";

const app= express();
//Database configuration
mongoose.connect(process.env.DATABASE)
.then(()=>console.log("DB connected"))
.catch((err) => console.log("DB connection error =>",err));

//middleware configuration  
app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:3000",
}))
app.use("/api",authRoutes);
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
