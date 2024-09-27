
import { useContext, useEffect} from "react"
import { MiContexto } from "../context/context"

//lugares
import {Button, CardContent, Grid} from '@mui/material';
import { Link } from "react-router-dom";
//alert
import Swal from 'sweetalert2'
//icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import clases from './ubiproducto.module.css'

export default function Ubiproducto() {
    const {
        producto,
        productoUbi, lugares, infoprod, setInfoprod, ubi,
        setIdg, alert,
        cart, setCart,
        refresh
    } = useContext(MiContexto)


    useEffect(()=>{
        let info = []
        lugares.map((lug)=>{
            productoUbi.map((pr)=>{
                if (lug.id == pr.id_lugar) {
                    let resul = { fullname : lug.fullname, stock: pr.stock, id_lugar: lug.id }
                    info.push(resul)
                }
            })
        })
        setInfoprod(info)

    }, [productoUbi])



    return (
        <div>
            {
             !ubi ? <div></div> : <div className={clases.ubi} >{
                infoprod.map((prod, index)=>{
                            //console.log(prod);
                            return (<div key={index} className={clases.ubi2} >
                                    <Grid container direction="row" padding={1} boxShadow='1px 1px 5px 1px' sx={{maxWidth: '200px' }} > 
                                        <Grid item xs={6} > 
                                            <CardContent sx={ { display: 'flex', flexDirection: 'column', alignItems: 'center'  } } >
                                                <p style={{ margin: '1px', fontSize: 15, fontWeight: 'bold' }}>
                                                {prod.fullname}
                                                </p>
                                                <p style={{ fontSize: 14 }}>
                                                Stock: {prod.stock}
                                                </p>
                                            </CardContent>
                                        </Grid>
                                        <Grid container item xs={6} paddingRight={2} direction="row" justifyContent='space-evenly' alignContent='flex-end' >
                                            <Grid item xs={8} marginBottom={1} >
                                                <Link to='/updateproductLug' >
                                                    <Button size="small" color="secondary" variant="contained"  onClick={()=>{
                                                        setIdg(producto.IdGenerate)
                                                        sessionStorage.setItem('id', producto.IdGenerate)
                                                        sessionStorage.setItem('lugar', prod.fullname)
                                                        sessionStorage.setItem('id_lugar', prod.id_lugar)
                                                    }} ><AddCircleIcon/></Button>
                                                </Link>
                                            </Grid>
                                            <Grid item xs={8} marginBottom={1}>
                                                <Button size="small" color="error" variant="contained" ><DeleteIcon/></Button>
                                            </Grid>
                                            <Grid item xs={8} marginBottom={1}>
                                                <Button size="small" color="success" variant="contained" onClick={async ()=>{
                                                    let value = false
                                                    cart.map((el)=>{  
                                                        console.log(el.id);  
                                                        console.log(producto.IdGenerate);
                                                        if (el.id == producto.IdGenerate) {
                                                            console.log('if');
                                                            value = true
                                                        }
                                                    })
                                                    console.log(value);
                                                    !value ? Swal.fire({
                                                        title: "Ingrese cantidad",
                                                        input: "text",
                                                        inputAttributes: {
                                                        autocapitalize: "off"
                                                        },
                                                        showCancelButton: true,
                                                        confirmButtonText: "aceptar",
                                                        showLoaderOnConfirm: true,
                                                    }).then( async (result) => {
                                                        if (result.isConfirmed && result.value <= prod.stock ) {
                                                            alert('success')
                                                            const carrito = []
                                                            cart.map((el)=>{
                                                                carrito.push(el)
                                                            })
                                                            const info = {
                                                                id : producto.IdGenerate,
                                                                lugar : prod.fullname,
                                                                id_lugar : prod.id_lugar,
                                                                cantidad : result.value
                                                            }
                                                            carrito.push(info)                    
                                                            setCart(carrito) 
                                                            refresh()  
                                                            
                                                        }else{ alert('error') }
                                                    }) :  
                                                    Swal.fire({
                                                        icon: "error",
                                                        title: "Producto ya existe en el carrito",
                                                        text: "si quiere cambiar de lugar porfavor primero elimine el producto del carrito y vuelvalo a cargar",
                                                    });
                                                }} ><ShoppingCartIcon/></Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    </div>
                                    )
                        })
                } </div>   
            }</div>
)}
