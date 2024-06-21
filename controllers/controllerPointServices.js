import { db } from "../db/cn.js";

const getPoints = async (req, res) => {

    const sql = `select * from tbl_pointservices`;
    const result = await db.query(sql);

    return res.json(result);

}

const getListPoints = async (req, res) => {

  const sql = `
    SELECT 
        ps.id,
        ps.name,
        ps.address,
        ps.location,
        ps.monday_opening_time,
        ps.monday_closing_time,
        ps.tuesday_opening_time,
        ps.tuesday_closing_time,
        ps.wednesday_opening_time,
        ps.wednesday_closing_time,
        ps.thursday_opening_time,
        ps.thursday_closing_time,
        ps.friday_opening_time,
        ps.friday_closing_time,
        ps.saturday_opening_time,
        ps.saturday_closing_time,
        ps.sunday_opening_time,
        ps.sunday_closing_time,
        ps.created_at,
        d.name AS state_name,
        c.name AS city_name,
        tp.name AS type_name
    FROM 
        tbl_pointservices ps
    INNER JOIN 
        tbl_departamentos d ON ps.state_id = d.id
    INNER JOIN 
        tbl_cities c ON ps.city_id = c.id
    INNER JOIN 
        tbl_typePoint tp ON ps.type_id = tp.id;
`;


  const result = await db.query(sql);

  console.log(result)

  return res.json(result);

}

const postPoint = async (req, res) => {

    const {
        name, address, location, monday_opening_time, monday_closing_time,
        tuesday_opening_time, tuesday_closing_time, wednesday_opening_time, wednesday_closing_time,
        thursday_opening_time, thursday_closing_time, friday_opening_time, friday_closing_time,
        saturday_opening_time, saturday_closing_time, sunday_opening_time, sunday_closing_time,
        state_id, city_id, type_id
      } = req.body;
    
      // Verifica que location tenga las propiedades x e y
      const { x, y } = location;
    
      const data = [
        name, address, x, y, monday_opening_time, monday_closing_time,
        tuesday_opening_time, tuesday_closing_time, wednesday_opening_time, wednesday_closing_time,
        thursday_opening_time, thursday_closing_time, friday_opening_time, friday_closing_time,
        saturday_opening_time, saturday_closing_time, sunday_opening_time, sunday_closing_time,
        state_id, city_id, type_id
      ];
          
      const sql = `INSERT INTO tbl_pointservices 
          (name, address, location, monday_opening_time, monday_closing_time, 
          tuesday_opening_time, tuesday_closing_time, wednesday_opening_time, wednesday_closing_time, 
          thursday_opening_time, thursday_closing_time, friday_opening_time, friday_closing_time, 
          saturday_opening_time, saturday_closing_time, sunday_opening_time, sunday_closing_time, 
          state_id, city_id, type_id) 
        VALUES 
          ($1, $2, POINT($3, $4), $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) 
        RETURNING *`;
    
      try {
        const result = await db.one(sql, data);
        res.status(201).json({ mensaje: 'Inserción Exitosa', obj_creado: result });
      } catch (error) {
        console.error('Error al insertar los datos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
}


export {
    getPoints,
    getListPoints,
    postPoint
   
}