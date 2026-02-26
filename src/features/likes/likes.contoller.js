import { LikeRepository } from "./likes.repository.js";

export class LikeController{
    constructor(){
        this.likeRepository = new LikeRepository();
    }

    async getLikes(req,res,next){
        try{
            const id = req.params.id;
            const likes = await this.likeRepository.getLikes(id);
            if(likes){
                res.status(201).send(likes);
            }else{
                res.status(400).send("not found");
            }
        }catch(err){next(err)}
    }

    async likeToggle(req,res,next){
        try{
           const id = req.params.id; 
           const type = req.body.types;
           const result = await this.likeRepository.toggle(req.userId,id,type);
           res.status(201).send(result);
        }catch(err){next(err)}
    }
}