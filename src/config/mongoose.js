import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const url=process.env.DB_URL;

export const connectDatabase = async()=>{
  try{
    await mongoose.connect(url)
    console.log("connected to mongodb");
  }catch(err){
     console.log("MongoDB connection FAILED:", err.message);
  } 
}

//export {connectDatabase};