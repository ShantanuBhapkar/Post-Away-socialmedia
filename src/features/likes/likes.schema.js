import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,
        ref:'User',required: true
    },
    likeable:{type:mongoose.Schema.Types.ObjectId,
        refPath:'types',required:true
    },
    types:{type:String,
        enum:['Post','Comment'] , required:true
    }
});

export const likeModel = mongoose.model('Like',likeSchema);