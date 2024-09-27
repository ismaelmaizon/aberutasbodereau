import { pool } from "../db.js";



export const getTipos = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM tipos;");      
      res.send( {status: 200, message: 'succes', response: rows} );
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };


export const createTipos = async (req, res) => {
    const { Tipo, Descripcion } = req.body
    try {
        const [rows] = await pool.query("INSERT INTO tipos (Tipo, Descripcion) VALUES (?,?);",
            [Tipo, Descripcion]
        );
        
        res.send( {status: 200, message: 'succes', response: rows} );
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
      }
}