//const express = require('express');
import express from 'express';
const state = express();
import { getStates, postState} from '../controllers/controllerState.js'; 

// Seleccionar informacion o darle informacion al cliente
state.get('/', getStates);

state.post('/',postState);


export {
    state
}