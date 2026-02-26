import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { connectDatabase } from './src/config/mongoose.js';
import { ApplicationError } from './src/errorHandlers/errorhandler.js';
import userRoutes from './src/features/users/user.routes.js';
import { postRoutes } from './src/features/posts/post.routes.js';
import { commentRoutes } from './src/features/comments/comment.routes.js';
import { likeRoutes } from './src/features/likes/likes.routes.js';
import { friendRoutes } from './src/features/friends/friend.routes.js';
import { otpRouter } from './src/features/users/otp.route.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';

const app = express();

app.use(bodyParser.json()); // use for so post request data can be converted to be understood by server 

app.get('/',(req,res)=>{
   res.send("Welcome to postaway!");  
})

app.use('/api/user',userRoutes);
app.use('/api/post',jwtAuth,postRoutes);
app.use('/api/comment',jwtAuth,commentRoutes);
app.use('/api/like',jwtAuth,likeRoutes);
app.use('/api/friend',jwtAuth,friendRoutes);
app.use('/api/otp',otpRouter);

app.use((req,res)=>{
    res.status(404).send("API not found");    //middleware to handle invalid api request of paths which are not defined
})

app.use((err,req,res,next)=>{
    if(err instanceof mongoose.Error.ValidationError){
       return res.status(400).send(err.message);
      }
    if(err instanceof ApplicationError){
       return res.status(err.code).send(err.message)
    }
    console.log("error: "+err);
    return res.status(500).send("Something went wrong, Please try again later"); 

})
app.listen(3000 ,(req,res)=>{
  connectDatabase();
  console.log("server is running");
})


