//const express = require('express');
import express from 'express';
const city = express();
import { getCities, getCitiesById, postCity} from '../controllers/controllerCities.js'; 

// Seleccionar informacion o darle informacion al cliente
city.get('/', getCities);
city.get('/:stateId', getCitiesById);

city.post('/',postCity);


export {
    city
    
}