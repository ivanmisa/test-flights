import express from 'express';
import cors from 'cors'
import flight_routes  from './routes/flight.routes';
import user_routes from './routes/user.routes';
import baggage_routes from './routes/baggage.routes';
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Cors
app.use(cors());

//Rutas
app.use("/api", flight_routes);
app.use("/api", user_routes);
app.use("/api", baggage_routes);


//Exportar
module.exports = app