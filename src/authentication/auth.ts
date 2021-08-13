import {Request, Response, NextFunction} from 'express';
import {IUser} from '../models/user.model';
import moment from 'moment';
const jwt = require('jsonwebtoken');



declare var process : {
    env: {
      SECRET_TOKEN: string,  
    }
}

declare module 'express-serve-static-core' {
    interface Request {
      user?: IUser
    }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            error:'No tiene token de autenticacion'
        });
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

        if(decoded.exp <= moment().unix()){
            return res.status(401).json({error: 'Token invalid'});         
        }
        req.user = decoded;
        next();

    }catch(err){
        return res.status(404).json({error: 'Token invalid'});
    }
}



