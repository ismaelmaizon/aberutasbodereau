import { pool } from "../db.js";
import {DataTime, generarIDAleatorio} from "../utils.js";

//ver todos los productos
export const getProductos = async (req, res) => {
  console.log('ingreso a productos');
  console.log(req.cookies);
  try {
    const [productos] = await pool.query("SELECT * FROM productos");
    
    res.send( {status: 200, message: 'succes', response: productos} );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
//ver un producto
export const getProducto = async (req, res) => {
  try {
    const { idg } = req.params;
    console.log(idg);
    const [rows] = await pool.query("SELECT * FROM productos WHERE IdGenerate = ?", [
      idg,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "producto not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
//crear producto
export const createProducto = async (req, res) => {
  console.log('hola');
  // Accede al archivo subido
  const file = req.file;
  // Accede a los otros datos del producto enviados en el formulario
  const {Tipo, Ancho, Alto, Izq, Derc, Precio_U } = JSON.parse(req.body.prod)
  const stock = 0
  const idGenerate = generarIDAleatorio(10)
  console.log(idGenerate,Tipo, Ancho, Alto, Izq, Derc, Precio_U, stock);
  let valid = false
  try {
    const [productos] = await pool.query("SELECT * FROM productos");
    productos.map((pac) =>{
      if (pac.Tipo == Tipo && pac.Ancho == Ancho && pac.Alto == Alto && pac.Derc == Derc && pac.Izq == Izq) {
        console.log('ya existe');
        valid = true
      }
    })
    if (valid) {
      res.status(201).json({ message: 'ya existe el producto'  });
    } else {
      const [rows] = await pool.query(
        "INSERT INTO productos (IdGenerate, Tipo, Ancho, Alto, Izq, Derc, Precio_U, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
        [idGenerate, Tipo, Ancho, Alto, Izq, Derc, Precio_U, stock]
      );
      const [rows2] = await pool.query(
        "INSERT INTO imagenes (IdProduct, url) VALUES (?, ?);",
        [idGenerate, file.filename]
      );
      console.log(rows);
      res.status(200).json({ id: rows.insertId, Tipo, Ancho, Alto, Izq, Derc, Precio_U, stock });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
//ver imagenes del producto
export const getProductoIms = async (req, res) => {
  try {
    const { idg } = req.params;
    console.log(idg);
    const [rows] = await pool.query("SELECT * FROM imagenes WHERE IdProduct = ?", [
      idg,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "producto not found" });
    }
    res.json(rows);
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
//agregar imagen a producto
export const addImgProducto = async (req, res) => {
  const file = req.file;
  // Accede a los otros datos del producto enviados en el formulario
  const id = req.body.id
  const originId =  id.slice(1, -1);
  console.log(originId);
  try {
    const [rows] = await pool.query(
      "INSERT INTO imagenes (IdProduct, url) VALUES (?, ?);",
      [originId, file.filename]
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteProducto = async (req, res) => {
  //delete FROM lugaresProducto where id_producto = 1;
  try {
    const { id } = req.params;
    console.log(id);
    const [rowsl] = await pool.query("DELETE FROM lugaresProducto where id_producto = ?", [
      id,
    ]);

    if (rowsl) {
      const [rowsp] = await pool.query("DELETE FROM productos where id = ?", [
        id,
      ]);
      rowsp ? res.send( {status: 200, message: 'succes', response: rowsp} ) :  res.send( {status: 400, message: 'problemas al eliminar'} )
    }
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ message: "Something goes wrong" });
  }
};