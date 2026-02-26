import { CommentRepository } from "./comment.repository.js";

export class CommentController{
    constructor(){
        this.commentRepository= new CommentRepository();
    }

    async getComment(req,res,next){
        try{
            const postId= req.params.postId;
            const comment = await this.commentRepository.getComment(postId);
            if(!comment){
                return res.status(400).send("Comment not found");
            }else{
                res.status(201).send(comment);
            }
        }catch(err){next(err)}
    }

    async addComment(req,res,next){
        try{
            const postId= req.params.postId;
            const comment = await this.commentRepository.addComment(req.userId,postId,req.body.text);
            if(comment){
                res.status(201).send("Comment added"+comment);
            }else{
                res.status(400).send("comment not added");
            }
        }catch(err){
            next(err)
        }
    }

    async deleteComment(req,res,next){
        try{
            const commentId = req.params.commentId;
            const comment = await this.commentRepository.deleteComment(commentId,req.userId);
            if(!comment){
                res.status(400).send("Cannot delete comment");
            }else{
                res.status(201).send("Comment deleted");
            }
        }catch(err){
            next(err)
        }
    }
  
    async updateComment(req,res,next){
        try{
            const id= req.params.commentId;
            const text = req.body.text;
            const comment = await this.commentRepository.updateComment(id,req.userId,text);
             if(!comment){
                res.status(400).send("cannot update the comment");
            }else{
                res.status(201).send(comment);
            }
        }catch(err){
            next(err);
        }
    }
}