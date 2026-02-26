import { FriendRepository } from "./friend.repository.js";

export class FriendController {
    constructor() {
        this.friendRepository = new FriendRepository();
    }

    async getUserFriends(req, res, next) {
        try {
            const userId = req.params.userId;
            const friends = await this.friendRepository.getUserFriends(userId);
            res.status(200).send(friends);
        } catch (err) {
            next(err);
        }
    }

    async getPendingRequests(req, res, next) {
        try {
            const userId = req.userId;
            const requests = await this.friendRepository.getPendingRequests(userId);
            res.status(200).send(requests);
        } catch (err) {
            next(err);
        }
    }

    async toggleFriendship(req, res, next) {
        try {
            const friendId = req.params.friendId;
            const result = await this.friendRepository.toggleFriendship(req.userId, friendId);
            res.status(200).send(result);
        } catch (err) {
            next(err);
        }
    }

    async respondToRequest(req, res, next) {
        try {
            const friendId = req.params.friendId;
            const response = req.body.response; // 'accept' or 'reject'
            const result = await this.friendRepository.respondToRequest(req.userId, friendId, response);
            res.status(200).send(result);
        } catch (err) {
            next(err);
        }
    }
}