import mongoose from 'mongoose';
const port = process.env.PORT || 3800;
const app = require('./app');

declare var process : {
    env: {
      NODE_ENV: string,
      MONGODB_URI: string,
      PORT: string
    }
}

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true})
        .then(() => console.log('Base de datos de platform'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

//crear del servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});