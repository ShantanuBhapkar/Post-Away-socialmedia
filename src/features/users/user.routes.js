import express from 'express';
import { UserController } from "./user.controller.js";

const userRoutes = express.Router();
const userController = new UserController();

userRoutes.post('/signup',(req,res,next)=>{
    userController.signUp(req,res,next);
});
userRoutes.post('/signin',(req,res,next)=>{
    userController.signin(req,res,next);
});

export default userRoutes;