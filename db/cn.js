import pg from 'pg-promise'
import dotenv from 'dotenv'
dotenv.config();
const pgp=pg();

const user= process.env.USER;
const pass= process.env.PASS;
const db_=process.env.DB;
const host=process.env.HOST;
const port_db=process.env.PORT_DB;

const cnstr = `postgresql://${user}:${pass}@${host}:${port_db}/${db_}`;

const db = pgp(cnstr);

db.connect()
    .then( ()=>{
        console.log("Conexion de Base de Datos Exitosa")
    } )
    .catch((err)=>{

        console.log(`Error de Conexion ${err}`)

    });

export {db}