import express from 'express';
const usuario = express();
import { creacionUsuario , auth} from '../controllers/usuarioController.js';

//Metdodo para creacion de Usuarios
usuario.post('', creacionUsuario);

usuario.post('/auth', auth)

export { usuario }