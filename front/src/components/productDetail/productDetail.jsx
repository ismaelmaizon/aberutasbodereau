
import { useContext, useEffect, useState} from "react"
import { MiContexto } from "../context/context"

//lugares
import {Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from '@mui/material';
//productos
import { Link, useNavigate } from "react-router-dom";
//icon
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import NavBar from "../navbar/navBar";


const URL = import.meta.env.VITE_BACKEND_URL


export default function PorductDetail() {
    const {
        alert, view,
        tipos,
        producto,
        deleteProducto, imgs, addimgProduct, getProductoIms, setImgs
    } = useContext(MiContexto)    

    const router = useNavigate()

    const [load, setLoad ] = useState(false)
    const [prod, setProd ] = useState({})
    const [file, setFile] = useState(null)

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Obtén el primer archivo seleccionado
        setFile(file)
        console.log('Archivo seleccionado:', file);
    };
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(producto.id)
    }

    const [num, setNum] = useState(0)

    const sum = (number) =>{
        if(num < imgs.length - 1){
            setNum( num + number )
        }else{
            setNum(0)
        }
    }

    const res = (number) =>{
        if(num > 0){
            setNum( num - number )
        }else{
            setNum(imgs.length - 1)
        }
    }



    useEffect(()=>{
        tipos.map((ti)=>{
            //console.log(ti.id);
            //console.log(producto.Tipo)
            if (producto.Tipo == ti.id) {
                //console.log('dentro');
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
        console.log(view);
        console.log(producto);
        
          
    }, [])

    return (
        <div>
            <NavBar/>
            {producto.length == 0 || load  ? <Box sx={{ display: 'flex', marginTop: '150px' }}><CircularProgress sx={{ display: 'flex', margin: 'auto'}}  /></Box> : <Card sx={{maxWidth: 800, margin: 'auto', marginTop: '25px', padding: 2 }}>
                <Grid container direction='row' >
                    <Grid item xs={6} direction='row' alignItems='center'>
                        <Grid item xs={16}>
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
                                <Typography variant="body2" color="text.secondary">
                                Stock: {prod.stock}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Box component='form' onSubmit={handleSubmit} encType="multipart/form-data" >
                                    {view == 'view' ? <div>
                                        <Box sx={{
                                                color: 'white',
                                                display: 'inline-block',
                                                backgroundColor: '#035584',  
                                                border: 'solid 1px',
                                                marginBottom: '5px',
                                                height: '35px',
        
                                                }} >
                                                <input  
                                                        style={{
                                                            position: 'relative',
                                                            opacity: 0.9,
                                                            height: '50px',
                                                            padding: '5px',
                                                        }}
                                                        type="file" 
                                                        accept=".jpg, .jpeg, .png" 
                                                        onChange={handleFileChange} 
                                                        placeholder="ingresa imagen"
                                                    />
                                            </Box>
                                            <Button type="submit" size="large" color="info" variant="contained" endIcon={<BackupRoundedIcon/>} 
                                                onClick={ async ()=>{
                                                    console.log(file);
                                                    if (file == null) {
                                                        alert('error')
                                                    }else{
                                                        setLoad(true)
                                                        const res1 = await addimgProduct(producto.IdGenerate, file)
                                                        const res2 = await getProductoIms(producto.IdGenerate) 
                                                        console.log(res1);
                                                        console.log(res2);
                                                        if(res1 && res2){
                                                            setImgs(res2)
                                                            setLoad(false)
                                                            alert('success')
                                                        }else{
                                                            alert('error')

                                                        }
                                                    }
                                                }}
                                                >
                                                    update img
                                            </Button>
                                    </div>  : <div>user</div> }
                                </Box>
                            </CardActions>
                        </Grid>
                        <Grid item xs={16} margin={1}  >
                            <Link to='/inicio' >
                                <Button size="small" color="info" variant="contained" >volver</Button>
                            </Link>
                            {view == 'view' ?  <Button size="small" color="secondary" variant="contained" sx={{marginLeft: '5px'}} onClick={ async ()=>{
                                    router('/updateProduct')                                     
                                }} >Modificar</Button> : <div></div>
                            }   
                            {view == 'view' ?  <Button size="small" color="error" variant="contained" sx={{marginLeft: '5px'}} onClick={ async ()=>{
                                    console.log(producto.id);
                                    let res = await deleteProducto(producto.id)
                                    console.log(res);
                                    res.ok ? (await alert('success'), router('/inicio') ) : alert('error')
                                    
                                }} >eliminar</Button> : <div></div>
                            }
                        </Grid>
                    </Grid>
                    <Grid container item xs={6} direction='row'>
                        <Grid item xs={16}>
                            <CardMedia
                                sx={{ display: 'flex', margin: 'auto' ,height: 250, width: 200 }}
                                image={`http://${URL}/static/${imgs[num].url}`}
                                title="green iguana"
                            />
                        </Grid>
                        <Grid container item xs={16} direction='row' >
                            <Grid item xs={2} margin='auto' >
                                <Button size="small" color="info" variant="contained" onClick={()=>{ sum(1) }}> <ArrowLeftRoundedIcon fontSize="large"  /></Button>
                            </Grid>
                            <Grid item xs={2} margin='auto'>
                                <Button size="small" color="info" variant="contained" onClick={()=>{ res(1) }}> <ArrowRightRoundedIcon fontSize="large" /></Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                </Card>
             }
        </div>
    )} 