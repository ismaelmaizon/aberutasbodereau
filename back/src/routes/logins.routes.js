import { Router } from "express";
import { login, logout, reg } from "../controllers/login.controller.js";


const router = Router()
//registrar usuario
router.post('/reg', reg)
//loguear usuario
router.post('/log', login)
//cerrar sesion
router.get('/logout', logout)
export default router