import { db } from "../db/cn.js";

const getTypePoints = async (req, res) => {

    const sql = `select * from tbl_typePoint`;
    const result = await db.query(sql);

    return res.json(result);

}

const postTypePoints = async (req, res) => {

    const { name } = req.body;

    const data = [name]

    const sql = ` insert into tbl_typePoint 
                 (name)
                 values 
                 ($1) returning  *`;

    const result = await db.query(sql, data)

    return res.json({ mensaje: "Insercion Exitosa", obj_creado: result })
}


export {
    getTypePoints,
    postTypePoints
   
}