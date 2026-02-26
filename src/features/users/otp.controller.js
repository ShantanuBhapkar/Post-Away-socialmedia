import { UserRepository } from "./user.repository.js";

export class OtpController{
    constructor(){
        this.userRepository = new UserRepository();
    }
   
    async generateOtp(req,res,next){
        try{
            const email = req.body.email;
            const result = await this.userRepository.generateOtp(email);
            if(result){
                res.status(201).send("OTP sent to email");
            }else{
                res.status(400).send("Error generating OTP");
            }
        }catch(err){next(err)}
}

    async verifyOtp(req,res,next){
        try{
            const email = req.body.email;
            const otp = req.body.otp;
            const result = await this.userRepository.verifyOtp(email,otp);
            if(result){
                res.status(201).send("OTP verified successfully");
            }else{
                res.status(400).send("Invalid or expired OTP");
            }
        }catch(err){next(err)}
    }

    async resetPassword(req,res,next){
        try{
            const email = req.body.email;
            const otp = req.body.otp;
            const newPassword = req.body.newPassword;
            const result = await this.userRepository.resetPassword(email,otp,newPassword);
            if(result){
                res.status(201).send("Password reset successfully");
            }else{
                res.status(400).send("Error resetting password");
            }
        }catch(err){next(err)}
    }
}