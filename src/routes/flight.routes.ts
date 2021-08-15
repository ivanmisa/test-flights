import express from 'express';
import { createFlight, subscribeFlight, deleteUserByEmployee, getFlights, getAvg, comparisonCompanies } from '../controllers/flight.controllers';
import { verifyToken } from '../authentication/auth';
const api = express.Router();

api.post('/createflight', verifyToken, createFlight);
api.put('/registerflight/:flightid', verifyToken, subscribeFlight);
api.delete('/deleteuserflight/:flightid/:userid', verifyToken, deleteUserByEmployee);
api.get('/getflights/:firstdate/:seconddate/:country/:city/:page', getFlights);

api.get('/getavg/:country/:city/:country2/:city2', getAvg);
api.get('/getcomparison/:company/:company2/:country/:city/:country2/:city2', comparisonCompanies);



export default  api;