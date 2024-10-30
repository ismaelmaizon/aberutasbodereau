import { isStringObject } from "util/types";
import { pool } from "../db.js";
import { encriptarPass, validarPass } from "../utils.js"
import jwt from 'jsonwebtoken';
import util from 'util'

export const reg = async (req, res) => {
    const {email, password, rol} = req.body
    let pass = await encriptarPass(password)
    console.log(pass);
    console.log(email);
    console.log(rol);
    try{
        const responses = await pool.query("INSERT INTO users (email, clave, rol) VALUES (?, ?, ?)", [email, pass, rol]);
        console.log(responses);
        
        res.status(200).json({message: 'usuario registrado'} )
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'usuario no registrado'} )

    }
};


export const login = async (req, res) => {
    const {email, password} = req.body
    const e = email.toString()
    console.log(email);
    console.log(password);
    console.log(isStringObject(email));
    console.log(email.toString());
    
    try{
        const [row] = await pool.query("SELECT * FROM users WHERE email = (?)", [e]);
        console.log(row);
        console.log(row[0].clave);
        let resp = await validarPass(password, row[0].clave)
        console.log(resp);
        //inicio fallido
        if(!resp || row.length == 0){
            res.status(401).json({message: 'usuario no existe o clave incorrecta'} )
        }
        //inicio exitoso
        const id = row[0].id
        const email = row[0].email
        const rol = row[0].rol
        const token = jwt.sign({id: id, email: email , rol: rol}, 'decoSecret', {
            expiresIn: '6h'
        })
        let tockenRol = 'notView'
        if (rol == 'admin') {
            tockenRol = 'view' 
        }
        console.log(token);
        const cookiesOptions = {
            maxAge: 21600000,
            httpOnly: false,
            secure: true, // Solo HTTPS
            sameSite: 'None' // Mitigar ataques CSRF  
        }
        res.cookie('jwt', token, cookiesOptions)
        res.send({status: 200, message: 'Bien venido', response: tockenRol})
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'usuario no encontrado'} )

    }
};


export const autenticacion = async (req, res, next) => {
    console.log('cookies');
    console.log(req.cookies.jwt);
    if(req.cookies.jwt){
        try{
            const decodificar = await util.promisify(jwt.verify)(req.cookies.jwt, 'decoSecret')
            if(decodificar){
                const [row] = await pool.query("SELECT * FROM users WHERE email = (?)", [decodificar.email]);
                if(row.length == 0){res.status(401).json({message: 'usuario no encontrado'})}
                req.user = row
                console.log('usuario verificado');
                console.log(row[0]);
                return next()
            }
        }catch(err){
            res.status(401).json({message: 'problemas con la verificacion del token'})
        }
    }else{
        res.status(401).json({message: 'coockie vencida'})
    }
};


export const logout = async (req, res) =>{
    console.log(req.cookies.jwt);
    const cookiesOptions = {
        maxAge: 2, 
        httpOnly: true    
    }
    res.cookie('jwt', '', cookiesOptions)    
    res.status(401).json({ message: 'Logout successful' }); 
}