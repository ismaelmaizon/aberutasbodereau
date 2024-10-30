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
//Update producto
export const updateProducto = async (req, res) => {
  const {IdGenerate, Tipo, Ancho, Alto, Izq, Derc, Precio_U } = req.body
  console.log(IdGenerate, Tipo, Ancho, Alto, Izq, Derc, Precio_U);
  const query = `
  UPDATE productos
  SET Tipo = ?, Ancho = ?, Alto = ?, Izq = ?, Derc = ?, Precio_U = ?
  WHERE IdGenerate = ?
  `;  
  
  try {
    const [rows] = await pool.query("SELECT * FROM productos WHERE IdGenerate = ?", [
      IdGenerate,
    ]);

    if(rows.length != 0){
      try{
        const [update] = await pool.query(query,[
          Tipo, Ancho, Alto, Izq, Derc, Precio_U, IdGenerate]
        );
        if (update) { 
          return res.status(200).json({ message: "producto actualizado" });
        }
      }catch(err){
        return res.status(400).json({ message: "problemas al actualizar producto" });
      }

    }else{
      return res.status(400).json({ message: "producto no existe" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "problemas para encontrar producto" });
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
  let boolLugProd = false
  let boolImgProd = false
  
  try {
    const { id } = req.params;
    const [product] = await pool.query("SELECT * FROM productos WHERE id = ?", [
      id,
    ]);
    console.log(product);
    //verificar existencia
    if (product.length == 0) {
      return res.status(404).json({ message: "product not found" });
    }
    //verificar existencia en lugares
    try{
      const [lugProd] = await pool.query("delete FROM lugaresProducto where id_producto = ?", [
        id,
      ]);
      if (lugProd.affectedRows >= 0) {
        boolLugProd = true
      }
    }catch(err){
      console.log(err);
      return res.status(500).json({ message: "problemas al eliminar producto de lugares" });
    }

    try{
      //verificar existencia de imagenes
      const [imgProd] = await pool.query("delete FROM imagenes where IdProduct = ?", [
        product[0].IdGenerate,
      ]);
      if (imgProd.affectedRows >= 0) {
        boolImgProd = true
      }
    }catch(err){
      console.log(err);
      return res.status(500).json({ message: "problemas al eliminar imagenes del producto" });
    }
    
    if (boolImgProd && boolLugProd) {
      try{
        const [rows] = await pool.query("delete FROM productos where id = ?", [
          id,
        ])
        if (rows){
          return res.status(200).json({ message: "producto eliminado completamente" });
        }
      }catch(err){
        console.log(err);
        return res.status(500).json({ message: "problemas al eliminar producto" });
      }
    }else{
      console.log(boolImgProd);
      console.log(boolLugProd);
      
      return res.status(500).json({ message: "problemas al eliminar alguna informacion del producto" });
    }

  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ message: "Something goes wrong" });
  }
};