import {Request, Response} from 'express';
import Flight from '../models/flight.model';
import {IUser} from '../models/user.model';
import Baggage from '../models/baggae.model';


//Usuario registra su equipaje
export const registerBaggage = async (req: Request, res: Response) => {
    const {flightid, weight, linear_size, persona_item, hand_luggage} = await req.body;
    const infoUser = req.user as IUser;

    try{
        const baggage = new Baggage({
            flight: flightid,
            user: infoUser.id,
            weight: weight,
            linear_size: linear_size,
            persona_item: persona_item,
            hand_luggage: hand_luggage
        });

        await baggage.save();
        return res.status(200).json({message: "register success"});

    }catch(error){
        return res.status(500).json(error.message);
    }
}


//Empleado o administrador elimina equipaje y cancela vuelo de un usuario
export const deleteBaggageAndUser = async (req: Request, res: Response) =>{
    const flightId = req.params.flightid;
    const userId = req.params.userid;
    const infoUser = req.user as IUser;

    if(infoUser.role != 'ROLE_ADMIN' && infoUser.role != 'ROLE_EMPLOYEE') return res.status(401).json({message: 'User Unauthorized'});

    try{
        await Flight.findByIdAndUpdate(flightId, {$pull: {passengers: userId}}, {new: true});
        await Baggage.findOneAndDelete({user: userId, flight: flightId});

        return res.status(200).json({message: "success"});

    }catch(err){
        return res.status(500).json(err.message);
    }
}


//Empleado o administrador monitorea ultimos equipajes con paginacion
export const getBaggage = (req: Request, res: Response) =>{
    const page = parseInt(req.params.page, 10);
    const infoUser = req.user as IUser;
    if(infoUser.role != 'ROLE_ADMIN' && infoUser.role != 'ROLE_EMPLOYEE') return res.status(401).json({message: 'User Unauthorized'});

    Baggage.paginate({}, { page: page, limit: 4, sort:{ created: -1 }}, function(err, result) {
        if(err){
            return res.status(500).json({message: err});
        }

        console.log(result);
        return res.status(200).json({result});
    });
}