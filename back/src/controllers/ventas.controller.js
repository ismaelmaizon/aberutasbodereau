
import { pool } from "../db.js";
import { DataTime, generarIDAleatorioVentas } from "../utils.js";

//registrar venta
export const registrarVenta = async (req, res) =>{
    const {cliente, total} = req.body
    const fecha = DataTime()
    const id_venta = generarIDAleatorioVentas(10)
    const estado = 1
    const { nombre, apellido, email, cel, provincia, localidad, calle, altura } = cliente
    
    try {
        const [rows] = await pool.query(
            "INSERT INTO ventas (id_venta, fecha, nombre, apellido, email, provincia, localidad, calle, altura, cel, estado, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",[
              id_venta, fecha, nombre, apellido, email, provincia, localidad, calle, parseInt(altura) , cel, estado, total]
          );
        console.log(rows);
        if (rows) {
          res.status(200).json({ status: 200, message: 'registro creado', id: id_venta});
        }
      } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: "Something goes wrong" });
      }

} 

//Asociar producto a venta
export const registrarProdVenta = async (req, res) =>{
  const {id_venta, id_producto, IdGenerate, Tipo, cantidad, subtotal} = req.body
  console.log(id_venta);
  try {
      const [rows] = await pool.query(
          "INSERT INTO ventasProduct (id_venta, id_producto, IdGenerate, Tipo, cantidad, subtotal) VALUES (?, ?, ?, ?, ?, ?);",[
            id_venta, id_producto, IdGenerate, Tipo, cantidad, subtotal]
        );
      console.log(rows);
      if (rows) {
        res.status(200).json({  status: 200, message: 'producto agregado', response: rows});
      }
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }

} 


//get ventas
export const getVentas = async (req, res) =>{
  console.log('cookies');
  console.log(req.cookies);
  let ventas = []
  try {
    const [rows] = await pool.query("SELECT * FROM ventas");
    rows.map((pac) =>{
      ventas.push(pac)
    })
    res.send( {status: 200, message: 'succes', response: ventas} );
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
} 

//get venta
export const getVentaId = async (req, res) =>{
  const rows = {
    venta : [],
    productos: []
  }
  try {
    const { idg } = req.params;
    console.log(idg);
    const [venta] = await pool.query("SELECT * FROM ventas WHERE id_venta = ?", [
      idg,
    ]);
    const [productos] = await pool.query("SELECT * FROM ventasProduct WHERE id_venta = ?", [
      idg,
    ]);


    if (venta.length <= 0 && productos.length != 0) {
      return res.status(404).json({ message: "producto not found" });
    }else{
      rows.productos = productos
      rows.venta = venta
      res.json(rows);
    }

  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }

} 


//modificar venta
export const modVenta = async (req, res) =>{
  console.log(req.user);
  
  if (req.user[0].rol == 'admin') {
    console.log('admin');
    const query = `
    UPDATE ventas
    SET nombre = ?, apellido = ?, email = ?, cel = ?, estado = ?, total = ?
    WHERE id_venta = ?
    `;
    console.log(req.body);
    const {venta, cart} = req.body
    
    try {
        const [rows] = await pool.query(query,[
          venta.nombre, venta.apellido, venta.email, venta.cel, venta.estado, venta.total, venta.id_venta]
        );

        if (rows) {
          //actualizando tabla relacion venta producto 
          //el cart son los ID que se van a eliminar
          cart.forEach(async (el) => {
            try {
              // Ejecutamos la consulta de eliminación
              const [rows2] = await pool.query('DELETE FROM ventasProduct WHERE id = ? AND id_venta = ?', [el, venta.id_venta]);
              console.log(rows2); // Si deseas ver el resultado de la consulta
            } catch (err) {
              console.log(err);
              return res.status(500).json({ message: "Error al actualizar productosVenta" });
            }
          });
          res.status(200).json({ status: 200, message: 'update venta', response: rows});
        }
          
      } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: "Something goes wrong" });
      }
  }else{
    console.log('user');
    
    const query = `
    UPDATE ventas
    SET nombre = ?, apellido = ?, estado = ?
    WHERE id_venta = ?
    `;
    const {id_venta, nombre, apellido, estado} = req.body
    try {
    const [rows] = await pool.query(query,[
        nombre, apellido, estado, id_venta]
    );
      console.log(rows);
      if (rows) {
        res.status(200).json({ status: 200, message: 'update venta', response: rows});
      }
    } catch (error) {
      console.log(error);
      
      return res.status(500).json({ message: "Something goes wrong" });
    } 
  }
  /*
*/
} 


