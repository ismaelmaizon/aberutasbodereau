import express from "express";
import morgan from "morgan";
import cors from 'cors';
import __dirname  from './utils.js'
import multer from "multer";
import session from "express-session"
import cookieParser from "cookie-parser";


import productosRoutes from "./routes/productos.routes.js"
import lugaresRoutes from "./routes/lugares.routes.js"
import lugaresRoutesProd from "./routes/lugaresProd.routes.js"
import ventasRoutes from "./routes/ventas.routes.js"
import tiposRoutes from "./routes/tipos.routes.js"
import logins from "./routes/logins.routes.js"
import estados from "./routes/estados.routes.js"
//passport
import passport from 'passport';
import { autenticacion } from "./controllers/login.controller.js";
//import { initializePassportJWT } from './passport/passport-jwt.js';


const app = express();
const corsOptions = {
  //To allow requests from client
  origin: [
    "https://beige-buffalo-119903.hostingersite.com",
    "http://localhost:5173",
    "localhost:8080"
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

// Middlewares
// Configuración para servir archivos estáticos
app.use('/static', express.static('src/img'));
app.use(express.urlencoded({extended:false})) //permite poder entender lo que los formularios me estan enviando
app.use(cors(corsOptions))
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser())
/*
app.use(session({
  secret: 'decoSecret',
  resave: false,
  saveUninitialized: true
}))*/
//initializePassportJWT()
app.use(passport.initialize())// de esta manera inicializamos passport
//recordemos que passport almacena en una session la informacion del usuario por ende debemos usar el siguiente meadleware

// Routes
app.use("/api/logins", logins);
app.use("/api/estados", estados);
app.use("/api/tipos", autenticacion, tiposRoutes);
app.use("/api/productos", autenticacion, productosRoutes);
app.use("/api/lugares", autenticacion,lugaresRoutes);
app.use("/api/lugaresProd", autenticacion,lugaresRoutesProd);
app.use("/api/ventas", autenticacion,ventasRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
