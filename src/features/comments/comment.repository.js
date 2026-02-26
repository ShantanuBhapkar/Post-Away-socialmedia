import { postModel } from "../posts/post.schema.js";
import { commentModel } from "./comment.schema.js";
import { ApplicationError } from "../../errorHandlers/errorhandler.js";
import mongoose from "mongoose";

export class CommentRepository{

    async getComment(postId){
        try{
            const comment = await commentModel.find({postId:postId}).populate('userId');
            return comment;
        }catch(err){
            console.log("ERROR : "+err);
            if(err instanceof mongoose.Error.ValidationError){
                        throw(err);
                }
               else{throw new ApplicationError("Something went wrong with database",500)}
        }
    }

    async addComment(userId,postId,text){
        try{
            const newComment = new commentModel({userId,postId,text});
            await newComment.save();
            return newComment;
        }catch(err){
             console.log("ERROR : "+err);
            if(err instanceof mongoose.Error.ValidationError){
                        throw(err);
                }
               else{throw new ApplicationError("Something went wrong with database",500)}
        }
    }

    async deleteComment(id,userId){
        try{
            const comment = await commentModel.findById(id);
            const post = await postModel.findById(comment.postId);

            if(comment.userId.toString() == userId.toString() || post.userId.toString() == userId.toString()){
                const deletedComment = await commentModel.findByIdAndDelete(id);
                return deletedComment;
            }else{return null}
        }catch(err){ console.log("ERROR : "+err);
            if(err instanceof mongoose.Error.ValidationError){
                        throw(err);
                }
               else{throw new ApplicationError("Something went wrong with database",500)}}
    }

    async updateComment(id,userId,text){
       try{
        const filter={_id:id,userId:userId};
        const comment = await commentModel.findOneAndUpdate(filter,{$set:{text:text}},{new:true});
        return comment;
       }catch(err){
        console.log("ERROR : "+err);
            if(err instanceof mongoose.Error.ValidationError){
                        throw(err);
                }
               else{throw new ApplicationError("Something went wrong with database",500)}
       }
    }
}