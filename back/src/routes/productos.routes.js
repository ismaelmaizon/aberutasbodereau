import { Router } from "express";
import {
  addImgProducto,
  createProducto,
  deleteProducto,
  getProducto,
  getProductoIms,
  getProductos,
} from "../controllers/productos.controller.js";
import __dirname  from '../utils.js'
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { autenticacion } from "../controllers/login.controller.js";


const router = Router();

// carga de imagen
const storage = multer.diskStorage({
  destination: __dirname + '/img',
  filename: function (req, file, cb) {
    cb(null, uuidv4() + file.originalname)
  }
})
const upload = multer({ storage: storage })

//app.use(multer({ storage: storage }).single('image'))
//app.use(multer({ storage: storage }).single('file'))



// GET todos los /productos
router.get("/prod", (req, res)=>{ res.send({status:200, message: 'probando probando'}) });


router.get("/productos", getProductos);
// GET un producto
router.get("/producto/:idg", getProducto);
router.get("/productoimg/:idg", getProductoIms);
// INSERT un producto
router.post("/producto", upload.single('file') , createProducto);
// INSERT imagen a producto
router.post("/addimgProduct", upload.single('file') , addImgProducto);
// DELETE un producto
router.delete("/producto/:id", deleteProducto);


// UPDATE un producto

export default router;
