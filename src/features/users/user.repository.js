import mongoose from "mongoose";
import { userModel } from "./user.schema.js";
import { ApplicationError } from "../../errorHandlers/errorhandler.js";
import {sendOTPEmail} from "../../config/sendEmail.js";
import bcrypt from "bcrypt";

export class UserRepository{
   
    async signup(username,email,password){
        try{
            const newUser = new userModel({username:username,email:email,password:password});
            await newUser.save();
            // Convert to plain object and delete password
             const userObject = newUser.toObject();
             delete userObject.password;
             return userObject;
        }
        catch(err){
            console.log("ERROR :"+err);
           if(err instanceof mongoose.Error.ValidationError){
            throw err;
           }
           else{
            throw new ApplicationError("Something went wrong with database",500);
           }
        }
    } 

    async signin(email){
        try{
          return  await userModel.findOne({email}).select('+password');

        }catch(err){   
             console.log("ERROR :"+err);
           if(err instanceof mongoose.Error.ValidationError){
            throw err;
           }
           else{
            throw new ApplicationError("Something went wrong with database",500);
           }}
    }

    async sendOTP(email) {
    // Generate random OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    
    // Store in database
    await userModel.findOneAndUpdate(
        { email: email },
        { 
            resetOTP: otp,
            otpExpiry: Date.now() + 10 * 60 * 1000  // 10 minutes
        }
    );
    
    // Send email with nodemailer

       await sendOTPEmail(email, otp);

    
    return "OTP sent to email";
}

async verifyOTP(email, otp) {
    const user = await userModel.findOne({ email: email });
    
    if (!user) {
        throw new Error("User not found");
    }
    
    // Check if OTP matches
    if (user.resetOTP !== otp) {
        throw new Error("Invalid OTP");
    }
    
    // Check if OTP expired
    if (user.otpExpiry < Date.now()) {
        throw new Error("OTP expired");
    }
    
    return "OTP verified";
}

async resetPassword(email, otp, newPassword) {
    // First verify OTP
    await this.verifyOTP(email, otp);
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password and clear OTP
    await userModel.findOneAndUpdate(
        { email: email },
        { 
            password: hashedPassword,
            resetOTP: null,
            otpExpiry: null
        }
    );
    
    return "Password reset successful";
}
}