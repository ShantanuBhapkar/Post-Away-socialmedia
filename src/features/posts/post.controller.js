import { PostRepository } from "./post.repository.js"


export class PostController{
    constructor(){
        this.postRepository = new PostRepository();
    }

  async getAll(req,res,next){
    try{
      const posts = await this.postRepository.getAll();
      return res.status(201).send(posts);

    }catch(err){
        next(err);
    }
  }

  async getById(req,res,next){
    try{
        const postId= req.params.id;
        const post = await this.postRepository.getbyId(postId);
        res.status(201).send(post);
    }catch(err){
        next(err);
    }
  }

  async getUserPosts(req,res,next) {
    try{
        const userId = req.userId;
        const posts = await this.postRepository.getUserPosts(userId);
         res.status(201).send(posts);

    }catch(err){
        next(err);
    }
  }

  async createPost(req,res,next){
    try{
        const{caption}= req.body;
        const userId = req.userId;
         const imageurl = req.file.path;
         const post = await this.postRepository.createPost(userId,caption,imageurl);
           res.status(201).send(post);

    }catch(err){
        next(err);
    }
  }

  async deletePost(req,res,next){
    try{
        const postId= req.params.postId;
        const post = await this.postRepository.deletePost(postId,req.userId);
        if(post){
            res.status(201).send("Post Deleted");
        }else{
            res.status(400).send("Something went wrong");
        }
    }catch(err){next(err)}
  }

  async updatePost(req,res,next){
    try{
        const postId = req.params.postId;
        const newCaption = req.body.caption;
        const post = await this.postRepository.updatePost(postId,req.userId,newCaption);
        if(!post){
            res.status(400).send("Post not found");
        }else{
            res.status(201).send(post);
        }
    }catch(err){next(err)}
  }

}