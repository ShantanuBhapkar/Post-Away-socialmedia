import mongoose from "mongoose";
import { ApplicationError } from "../../errorHandlers/errorhandler.js";
import { likeModel } from "./likes.schema.js";

export class LikeRepository{

    async getLikes(id){
        try{
            const likes = await likeModel.find({likeable:id});
            return likes;
        }catch(err){
            console.log("Error : "+err);
            if(err instanceof mongoose.Error.ValidationError){
                throw (err);
            }
            else{
                throw new ApplicationError("Something went wrong with database",500);
            }
        }
    }

    async toggle(userId,id,type){
        try{
            const like= await likeModel.findOneAndDelete({userId:userId,likeable:id,types:type});
            if(!like){
                const newLike = new likeModel({
                    userId:userId,
                    likeable:id,
                    types:type
                });
                await newLike.save();
                return ("Like addded");
            }else{
                return("like removed");
            }
        }catch(err){
             console.log("Error : "+err);
            if(err instanceof mongoose.Error.ValidationError){
                throw (err);
            }
            else{
                throw new ApplicationError("Something went wrong with database",500);
            }
        }
    }
}