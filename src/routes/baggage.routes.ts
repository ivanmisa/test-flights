import express from 'express';
import { registerBaggage, deleteBaggageAndUser, getBaggage } from '../controllers/baggage.controllers';
import { verifyToken } from '../authentication/auth';
const api = express.Router();

api.post('/createbaggage', verifyToken, registerBaggage);
api.delete('/deletebaggage/:userid/:flightid', verifyToken, deleteBaggageAndUser);
api.get('/getlastbaggage/:page', verifyToken, getBaggage);


export default  api;