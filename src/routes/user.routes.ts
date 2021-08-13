import express from 'express';
import { signup, signin } from '../controllers/user.controllers';
const api = express.Router();

api.post('/signup', signup);
api.post('/signin', signin);


export default api;