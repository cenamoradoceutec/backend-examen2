import express from 'express';
const typepoint = express();
import { getTypePoints, postTypePoints} from '../controllers/controllerType.js'; 

// Seleccionar informacion o darle informacion al cliente
typepoint.get('/', getTypePoints);
typepoint.post('/', postTypePoints);


export {
    typepoint
}