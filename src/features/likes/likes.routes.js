import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { LikeController } from './likes.contoller.js';

export const likeRoutes = express.Router();
const likeController = new LikeController();

likeRoutes.get('/:id',(req,res,next)=>{likeController.getLikes(req,res,next)});
likeRoutes.post('/:id',(req,res,next)=>{likeController.likeToggle(req,res,next)});

