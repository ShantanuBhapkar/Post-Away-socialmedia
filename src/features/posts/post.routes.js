import express from 'express';
import { upload } from '../../middlewares/fileupload.middleware.js';
import { PostController } from './post.controller.js';

export const postRoutes = express.Router();

const postController = new PostController();

// get all the posts.
postRoutes.get('/all',(req,res,next)=>{postController.getAll(req,res,next)});

// get a post by its id.
postRoutes.get('/:id',(req,res,next)=>{postController.getById(req,res,next)});

// get all posts of the user.
postRoutes.get('/userpost',(req,res,next)=>{postController.getUserPosts(req,res,next)});

// create post.
postRoutes.post('/create',upload.single('image'),(req,res,next)=>{postController.createPost(req,res,next)});

//delete specific post.
postRoutes.delete('/delete/:postId',(req,res,next)=>{postController.deletePost(req,res,next)});

//update a post.
postRoutes.put('/update/:postId',(req,res,next)=>{postController.updatePost(req,res,next)});