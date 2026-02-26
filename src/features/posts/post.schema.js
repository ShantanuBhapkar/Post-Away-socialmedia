import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    caption:{type:String},
    imageurl:{type:String}
});

export const postModel= mongoose.model('Post',postSchema);