// import { db } from "../db/conexion.js";
import { db } from "../db/cn.js";

const getStates = async (req, res) => {

    const sql = `SELECT
    d.id AS departamento_id,
    d.name AS departamento_name,
    COALESCE(
        json_agg(
            json_build_object(
                'municipio_id', c.id,
                'municipio_name', c.name
            )
        ) FILTER (WHERE c.id IS NOT NULL), '[]'
    ) AS municipios
    FROM
        tbl_departamentos d
    LEFT JOIN
        tbl_cities c
    ON
        d.id = c.id_state
    GROUP BY
        d.id;`;
    const result = await db.query(sql);

    return res.json(result);

}

const postState = async (req, res) => {

    const { name } = req.body;

    const data = [name]

    const sql = ` insert into tbl_departamentos 
                 (name)
                 values 
                 ($1) returning  *`;

    const result = await db.query(sql, data)

    return res.json({ mensaje: "Insercion Exitosa", obj_creado: result })
}


export {
    getStates,
    postState
   
}