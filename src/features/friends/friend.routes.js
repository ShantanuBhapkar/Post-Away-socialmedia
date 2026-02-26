import express from 'express';
import { FriendController } from './friend.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

export const friendRoutes = express.Router();

const friendController = new FriendController();

// Get a user's friends
friendRoutes.get('/get-friends/:userId', (req, res, next) => {
    friendController.getUserFriends(req, res, next);
});

// Get pending friend requests
friendRoutes.get('/get-pending-requests', (req, res, next) => {
    friendController.getPendingRequests(req, res, next);
});

// Toggle friendship (send/cancel request)
friendRoutes.post('/toggle-friendship/:friendId', (req, res, next) => {
    friendController.toggleFriendship(req, res, next);
});

// Accept or reject friend request
friendRoutes.post('/response-to-request/:friendId', (req, res, next) => {
    friendController.respondToRequest(req, res, next);
});