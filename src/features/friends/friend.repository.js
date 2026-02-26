import mongoose from "mongoose";
import { friendModel } from "./friend.schema.js";
import { ApplicationError } from "../../errorHandlers/errorhandler.js";

export class FriendRepository {
    
    async toggleFriendship(userId, friendId) {
        try {
            const friendship = await friendModel.findOneAndDelete({
                by: userId,
                to: friendId
            });
            
            if (!friendship) {
                const newRequest = new friendModel({
                    by: userId,
                    to: friendId,
                    status: 'pending'
                });
                await newRequest.save();
                return "Friend request sent";
            } else {
                return "Friend request canceled";
            }
        } catch (err) {
            console.log("Error: " + err);
            if (err instanceof mongoose.Error.ValidationError) {
                throw err;
            } else {
                throw new ApplicationError("Something went wrong with database", 500);
            }
        }
    }

    async getUserFriends(userId) {
        try {
            const friends = await friendModel.find({
                to: userId,
                status: 'accepted'
            }).populate('by', 'username email');
            return friends;
        } catch (err) {
            console.log("Error: " + err);
            if (err instanceof mongoose.Error.ValidationError) {
                throw err;
            } else {
                throw new ApplicationError("Something went wrong with database", 500);
            }
        }
    }

    async getPendingRequests(userId) {
        try {
            const requests = await friendModel.find({
                to: userId,
                status: 'pending'
            }).populate('by', 'username email');
            return requests;
        } catch (err) {
            console.log("Error: " + err);
            if (err instanceof mongoose.Error.ValidationError) {
                throw err;
            } else {
                throw new ApplicationError("Something went wrong with database", 500);
            }
        }
    }

    async respondToRequest(userId, friendId, response) {
        try {
            const request = await friendModel.findOne({
                by: friendId,
                to: userId,
                status: 'pending'
            });
            
            if (!request) {
                throw new ApplicationError("Friend request not found", 404);
            }
            
            if (response === 'accept') {
                request.status = 'accepted';
                await request.save();
                return "Friend request accepted";
            } else {
                await request.deleteOne();
                return "Friend request rejected";
            }
        } catch (err) {
            console.log("Error: " + err);
            if (err instanceof mongoose.Error.ValidationError) {
                throw err;
            } else if (err instanceof ApplicationError) {
                throw err;
            } else {
                throw new ApplicationError("Something went wrong with database", 500);
            }
        }
    }
}