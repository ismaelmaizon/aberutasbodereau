import { Router } from "express";
import { createEstado, getEstados } from "../controllers/estados.controller.js";


const router = Router()
//registrar estado
router.post('/createEstado', createEstado)
//obtener estados
router.get('/getEstados', getEstados)
export default router