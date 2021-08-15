import {Request, Response} from 'express';
import Flight, {Iflight} from '../models/flight.model';
import {IUser} from '../models/user.model';


//Administrador crea un vuelo
export const createFlight = async (req: Request, res: Response) =>{
    const infoUser = req.user as IUser;

    if(infoUser.role != 'ROLE_ADMIN') return res.status(401).json({message: 'User Unauthorized'});
    const {from, to, price, company, landingTime, departureTime, limitPassager, passengers} = await req.body;

    try{
        const flight = new Flight({
            from: from,
            to: to,
            price: price,
            company: company,
            landingTime: landingTime,
            departureTime: departureTime,
            limitPassager: limitPassager,
            passengers: passengers
        });

        const newFlight = await flight.save();
        return res.status(200).json({newFlight});

    }catch(error){
        return res.status(500).json(error.message)
    }
}


//Usuario se registra a un vuelo
export const subscribeFlight = async (req: Request, res: Response) =>{
    const flightId = req.params.flightid;
    const infoUser = req.user as IUser;

    try{
        const flight =  await Flight.findById(flightId).select({limitPassager:1, passengers:1}) as Iflight;
        if(flight.passengers.length >= flight.limitPassager) return res.status(400).json({message: 'Passenger limit'});

        const newPassager = await Flight.findByIdAndUpdate(flightId, {$push:{passengers:infoUser.id}}, {new: true});

        return res.status(200).json({newPassager});
    }catch(error){
        return res.status(500).json(error.message)
    }
}


//Empleado o administrador elimina un cliente de un vuelo
export const deleteUserByEmployee = async (req: Request, res: Response) =>{
    const flightId = req.params.flightid;
    const userId = req.params.userid;
    const infoUser = req.user as IUser;

    if(infoUser.role != 'ROLE_ADMIN' && infoUser.role != 'ROLE_EMPLOYEE') return res.status(401).json({message: 'User Unauthorized'});

    Flight.findByIdAndUpdate(flightId, {$pull: {passengers: userId}}, {new: true}).exec((err, deletePassager) => {
        if(err)return res.status(400).json({error: err});
        if (!deletePassager) return res.status(404).json({error: 'Request error' });

        return res.status(200).json({deletePassager});
    });
}


//Conseguir listado de vuelos con filtros entre 2 fechas, pais y ciudad de salida
export const getFlights = (req: Request, res: Response) =>{
    let firstDate = parseInt(req.params.firstdate, 10);
    let secondDate = parseInt(req.params.seconddate, 10);
    let country = req.params.country;
    let city = req.params.city;
    let page = parseInt(req.params.page, 10);

    Flight.paginate({$and:[{from: {city: city, country: country}}, {departureTime: {$gte: firstDate, $lte: secondDate}}]}, { page: page, limit: 4}, function(err, result) {
        if(err){
            return res.status(500).json({message: err});
        }
        return res.status(200).json({result});
    });
}


//Precio promedio de vuelos de una ciudad a otra
export const getAvg = async (req: Request, res: Response) => {
    let city = req.params.city;
    let country = req.params.country;
    let city2 = req.params.city2;
    let country2 = req.params.country2;

    try{
        const comparison = await Flight.find({$and:[{from:{city:city, country:country }}, {to:{city:city2, country:country2}} ]});
        var total: any = 0;
        for (let i = 0; i < comparison.length; i++) {
            total += comparison[i].price; 
        }

        const average = await total/comparison.length;
        res.status(200).json({comparison, average});
    }catch(err){
        return res.status(500).json({message: err});
    }
}


//Comparacion de precios y caracteristicas de 2 compañias aereas en un vuelo de una ciudad a otra
export const comparisonCompanies = async (req: Request, res: Response) => {
    let { company, company2, city, country, city2, country2 } = req.params;

    try{
        const comparison = await Flight.find({$and:[{from:{city:city, country:country }}, {to:{city:city2, country:country2}}, {$or:[{company: company}, {company: company2}]} ]});
        res.status(200).json({comparison});

    }catch(err){
        return res.status(500).json({message: err});
    }
}