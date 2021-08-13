import {Request, Response} from 'express';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';

declare var process : {
    env: {
      SECRET_TOKEN: string,  
    }
}


export const signup = async (req: Request, res: Response) => {
    const {name, email, password } = await req.body;
    const emailExist = await User.findOne({email:email});
    const nameExist = await User.findOne({name:name});
    if(nameExist || emailExist){
        return res.status(400).json({message: 'Email or name already exists'})
    }

    try{
        const user = new User({
            name: name,
            email: email,
            password: password
        });

        user.password = await user.encrypPassword(user.password);
        const userCurrent = await user.save();

        
        const token: string = jwt.sign({ id: userCurrent._id, email: userCurrent.email, name: userCurrent.name, role: userCurrent.role }, process.env.SECRET_TOKEN, {
            expiresIn: 60 * 60 * 720
        });

        const {_id, role}= await userCurrent;
        return res.json({token, user: {_id, name, email, role} });
    }catch(err){
        return res.status(500).json(err.message)
    }
}

export const signin = async (req: Request, res: Response) => {
    const {email, password} = await req.body;

    try{
        const userCurrent = await User.findOne({email: email});
        if(!userCurrent){
            return res.status(404).json({error: 'La direccion de correo electronico no esta registrada'});
        }

        const isMatch = await userCurrent.validatePassword(password);
        if(!isMatch){
            return res.status(401).json({error:'La contraseña es incorrecta'});
        }

        const token =  jwt.sign({id: userCurrent._id, email: userCurrent.email, name: userCurrent.name, role: userCurrent.role}, process.env.SECRET_TOKEN,{
            expiresIn: 60 * 60 * 720
        });

        const {_id, name, role} = userCurrent;
        res.json({token, user: {_id, email, name, role} });
    } catch(error){
        return res.status(500).json(error.message);
    }
}


