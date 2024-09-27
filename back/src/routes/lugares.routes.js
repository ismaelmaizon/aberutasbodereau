import { Router } from "express";

import { createLugar, deleteLugar, getLugares } from "../controllers/lugares.controller.js";

const router = Router();

// GET lugares
router.get("/lugares", getLugares);
// CREATE lugares
router.post("/lugares", createLugar);
// Elimnar Lugar
router.delete("/lugares/:id", deleteLugar);


export default router;
