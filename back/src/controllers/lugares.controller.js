import { pool } from "../db.js";
import {DataTime} from "../utils.js";

export const getLugares = async (req, res) => {
  let lugares = []
  try {
    const [rows] = await pool.query("SELECT * FROM lugares");
    rows.map((pac) =>{
        lugares.push(pac)
    })
    res.send( {status: 200, message: 'succes', response: lugares} );
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};


export const createLugar = async (req, res) => {
  const {fullname} = req.body
  console.log(fullname);
  try {
    const [rows] = await pool.query("INSERT INTO lugares (fullname) VALUES (?)", [fullname]);
    res.send( {status: 200, message: 'succes', response: rows} );
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteLugar = async (req, res) => {
  const {id} = req.params
  const {fullname} = req.body
  console.log(fullname);
  console.log(id);
  
  try {
    const [rows] = await pool.query("DELETE FROM lugares where id = ?", [id]);
    res.send( {status: 200, message: 'succes', response: rows} );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
