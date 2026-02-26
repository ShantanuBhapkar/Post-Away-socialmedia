import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();
import { userModel } from './user.schema.js';
import { UserRepository } from './user.repository.js';

export class UserController{
    
    constructor(){
        this.userRepository = new UserRepository(); 
    }

 async signUp(req,res,next){
    try{
      const {username,email,password}  = req.body;
      const hashedPassword = await bcrypt.hash(password,12);
      const user = await this.userRepository.signup(username,email,hashedPassword);
      res.status(201).send(user);
    }catch(err){
        next(err);
    }    
        
    }

    async signin(req,res,next){
        try{
          const{email,password} = req.body;
          const user = await this.userRepository.signin(email);
          if(!user){
            return res.status(400).send("Incorrect Credentials")
          }
          else{
          const ismatch = awaitbcrypt.compare(password,user.password);
            if(ismatch){
             const token = jwt.sign({
                userId: user._id,
                email: user.email
             },
             process.env.JWT_SECRET, 
              { expiresIn: '7d' }
            );

            res.status(201).send(token);
            }else{
            return res.status(400).send("Incorrect Credentials");
            }
          }
        }catch(err)
        {next(err)}
    }
}