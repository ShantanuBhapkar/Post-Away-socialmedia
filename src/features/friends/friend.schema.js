import mongoose from 'mongoose';

const friendSchema = new mongoose.Schema({
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted'],
        required: true
    }
}, { timestamps: true });

export const friendModel = mongoose.model('Friend', friendSchema);