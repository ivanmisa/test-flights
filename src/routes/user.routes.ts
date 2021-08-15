import express from 'express';
import { signup, signin } from '../controllers/user.controllers';
import { validatorSignup } from '../validator/validator';
const api = express.Router();

api.post('/signup', validatorSignup, signup);
api.post('/signin', signin);


export default api;