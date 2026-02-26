import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { OtpController } from './otp.controller.js';

export const otpRouter = express.Router();

const otpController = new OtpController();

otpRouter.post('/send',(req,res,next)=>{otpController.generateOtp(req,res,next)});

otpRouter.post('/verify',(req,res,next)=>{otpController.verifyOtp(req,res,next)});

otpRouter.post('/reset-password',(req,res,next)=>{otpController.resetPassword(req,res,next)});