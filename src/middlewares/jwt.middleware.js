import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function jwtAuth(req,res,next){

    // step 1 read the token.
    const token= req.headers['authorization'];

    //step2 check if token is present 

    if(!token){
        return res.status(401).send("Unauthorized");
    }

    //step3 verify the token
    try{
     const payload = jwt.verify(token,process.env.JWT_SECRET);
    req.userId = payload.userId;

    }catch(err){
    return res.status(401).send('Unauthorized');
    }
next();

}