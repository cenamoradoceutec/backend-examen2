import { db } from "../db/cn.js";
import jwt from 'jsonwebtoken'

const creacionUsuario = async (req, res) => {

    try {

        const { nombre_usuario,
            nombre,
            apellido,
            correo,
            contrasena } = req.body;

        const sql = ` insert into tbl_usuario
                    (nombre_usuario ,nombre , apellido ,correo ,contrasena)
                    values 
                    ($1, $2, $3, $4, $5)
                    returning * `;

        const result = await db.query(sql, [nombre_usuario,
            nombre,
            apellido,
            correo,
            contrasena]);

        res.status(200).json({ mensaje: "Usuario Creado", obj_creado: result });

    } catch (err) {
        res.status(500).json({ mensaje: `Error de Compilacion`, err: err.message })
    }

}

const auth = async (req, res) => {

    try {
        const { nombre_usuario, contrasena } = req.body;
        const sql = `select nombre_usuario, 
                        nombre, 
                        correo 
                    from tbl_usuario 
                    where nombre_usuario = $1 
                    and contrasena = $2 
                    and activo = true`;

        const result = await db.query(sql, [nombre_usuario, contrasena]);

        if (result.length === 0) {
            res.status(400).json({ mensaje: "Credenciales Invalidas" });
        } else {
            
            const payload = result[0]; 

            const token = jwt.sign ( payload, 'secret', { expiresIn: '1h' }  );

            res.status(200).json({ mensaje: "Autenticaion Exitosa", info_user: token })
        }
    } catch (err) {
        res.status(500).json({ mensaje: "Error de Autenticacion", err: err.message })
    }



}

export {
    creacionUsuario, 
    auth
}