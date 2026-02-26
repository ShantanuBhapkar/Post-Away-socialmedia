import { mongoose } from "mongoose";
import { ApplicationError } from "../../errorHandlers/errorhandler.js";
import { postModel } from "./post.schema.js";

export class PostRepository{

    async getAll(){
       try{
         return await postModel.find().populate('userId','username');

       }catch(err){
        console.log('ERROR :'+err);
        if(err instanceof mongoose.Error.ValidationError){
            throw(err);
        }
        else{throw new ApplicationError("Something went wrong with database",500)}
       } 
    }

    async getbyId(id){
        try{
            const post = await postModel.findById(id).populate('userId','username');
            return post;
        }catch(err){
            console.log("ERROR :"+err);
            if(err instanceof mongoose.Error.ValidationError){
                throw(err);
            }else{throw new ApplicationError("Something went wrong with database",500)}
        }
    }

    async getUserPosts(id){
        try{
            const posts = await postModel.find({userId:id});
            return posts;
        }catch(err){
            console.log("ERROR :"+err);
            if(err instanceof mongoose.Error.ValidationError){
                trhrow (err);
            }else{
                throw new ApplicationError("Something went wrong with database",500)
            }
        }
    }

    async createPost(userId,caption,imageurl){
        try{
            const newPost = new postModel({userId:userId,caption:caption,imageurl:imageurl});
           await newPost.save();
           return newPost;
        }catch(err){
            console.log("ERROR :"+err);
            if(err instanceof mongoose.Error.ValidationError){
                trhrow (err);
            }else{
                throw new ApplicationError("Something went wrong with database",500)
            }
        }
    }

    async deletePost(postId,userId){
        try{
            const post = await postModel.findOneAndDelete({_id:postId,userId:userId});
            return post;
        }catch(err){
            console.log("ERROR :"+err);
            if(err instanceof mongoose.Error.ValidationError){
                trhrow (err);
            }else{
                throw new ApplicationError("Something went wrong with database",500)
            }
        }
    }

    async updatePost(postId,userId,caption){
        try{
            const filter = {_id:postId,userId:userId};
            const update ={caption:caption};

            const post = await postModel.findOneAndUpdate(filter,{$set:update},{new:true});
            return post;

        }catch(err){
           console.log("ERROR :"+err);
            if(err instanceof mongoose.Error.ValidationError){
                trhrow (err);
            }else{
                throw new ApplicationError("Something went wrong with database",500)
            } 
        }
    }
}