
import { useContext, useEffect, useState } from "react"
import { MiContexto } from "../context/context"

//lugares
import {Button, Card, CardContent, Grid, Typography} from '@mui/material';
import { Link,  } from "react-router-dom"
import Ubiproducto from "../ubiproducto/ubiproducto";
import { useNavigate } from "react-router-dom";

export default function Producto() {
    const {
        tipos,
        producto,
        getUbiProducto, setUbi,
        setIdg, alert, getProductoIms, setImgs
    } = useContext(MiContexto)
    const router = useNavigate()
    const [ prod, setProd ] = useState({})


    useEffect(()=>{
        tipos.map((ti)=>{
            if (producto.Tipo == ti.id) {
                let newProd = {
                    id: producto.id,
                    IdGenerate: producto.IdGenerate, 
                    Tipo: ti.Tipo, 
                    Descripcion: ti.Descripcion,
                    Alto: producto.Alto,
                    Ancho: producto.Ancho,
                    Derc: producto.Derc,
                    Izq: producto.Izq,
                    stock: producto.stock,
                    Precio_U: producto.Precio_U
                    }  
                    setProd(newProd)
            }  
        }
        )
    }, [producto])

    return (
        <div>
            {producto.length == 0 ? <div></div> : <Card sx={{margin: 'auto', marginTop: '25px', maxWidth: '1000px'  }}>
                    <Grid container direction='row' alignItems='center' style={{ maxWidth: '600px', margin: 'auto' }} >
                            <Grid item xs={6} container>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Informacion del Producto 
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Id Producto: {prod.IdGenerate}
                                    </Typography>
                                    <Typography  variant="body2" color="text.secondary">
                                    Descripcion: {prod.Descripcion}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Precio: {prod.Precio_U}
                                    </Typography>
                                    <Typography variant="body4" color="text.secondary">
                                    Stock: {prod.stock}
                                    </Typography>
                                </CardContent>
                            </Grid>
                            <Grid item xs={6} container direction='column' spacing={1} alignContent='center' >
                                <Grid item xs={6} >
                                    <Link to='/addproductLug' >
                                        <Button size="small" color="info" variant="contained" onClick={ async ()=>{
                                            setIdg(producto.IdGenerate)
                                        }} >agregar a lugar</Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button size="small" color="info" variant="contained" onClick={ async ()=>{
                                        const response = await getUbiProducto(producto.IdGenerate)
                                        if (response.length == 0) {
                                            setUbi(false)
                                            alert('warning')
                                        }else{
                                            setUbi(true)
                                        }
                                    }} >ver Ubicaciones</Button>
                                </Grid>
                                <Grid item xs={6}>
                                        <Button size="small" color="info" variant="contained" onClick={async ()=>{ 
                                            const res = await getProductoIms(producto.IdGenerate) 
                                            setImgs(res) 
                                            //console.log(res);
                                            
                                            if (res) {
                                                router('/detalle')
                                            }
                                            }} >detalle</Button>
                                </Grid>
                            </Grid>
                    </Grid>
                    <Grid >
                        <Ubiproducto />
                    </Grid> 
                </Card>
             } 
    </div>)}