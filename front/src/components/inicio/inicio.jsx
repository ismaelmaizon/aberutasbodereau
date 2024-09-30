
import { useContext, useEffect} from "react"
import { MiContexto } from "../context/context"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
//lugares
import {Button} from '@mui/material';
//productos
import Productos from "../productos/productos";

//icons
import Ventas from "../ventas/ventas";
import Producto from "../producto/producto";
import Venta from "../venta/venta";
import NavBar from "../navbar/navBar";

export default function Inicio() {
    const {
        getLocal, setview, view,
        getEstados,
        getTipos,
        vprod, setVprod, vent, setVent,
        getProductos, getVentas, getLugares,
        productoUbi, lugares, setInfoprod, 
    } = useContext(MiContexto)

    const router = useNavigate()

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
        // Usar la función para obtener una cookie llamada "miCookie"
        const userView = getLocal('view');
        console.log(userView);
        
        setview(userView)
        console.log(view);
        
                
    }, [])

    return (
        <div>
            <NavBar/>
            {
               vprod || vent ? ( (vprod ? ( <div>
                <div>
                    <Producto/>
                </div> 
                <div style={{ width: '100%', marginTop: '50px' }}><Productos/></div> 
               </div> 
               ) :  (
                <div>
                <div>
                <Venta/>
                </div>
                <div style={{ width: '100%', marginTop: '50px' }}><Ventas/></div> 
                </div>
                ) ) ) 
               : <div style={{ display: 'flex', marginTop: '45px' }} >
                   <Button variant="contained" size="large" color="secondary" style={{ height: '400px', width: '400px', margin: 'auto' }} onClick={ async ()=>{ 
                       let res = await getProductos()
                       if(res.status == 401){      
                        console.log(res.status);
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "su session expiro",
                            showConfirmButton: false,
                            timer: 1500
                          });
                        router('/')
                        }else{
                            await getEstados()
                            await getLugares()
                            await getTipos()
                            setVprod(true) 
                        }}
                       }
                        >Productos</Button>
                   <Button variant="contained" size="large" style={{ height: '400px', width: '400px', margin: 'auto', backgroundColor: '#ab47bc' }} onClick={ async ()=>{ 
                       let res = await getVentas()
                       if(res.status == 401){
                            console.log(res.status);
                            Swal.fire({
                                position: "center",
                                icon: "error",
                                title: "su session expiro",
                                showConfirmButton: false,
                                timer: 1500
                              });
                            router('/')
                        }else{
                            await getEstados()
                            await getLugares()
                            await getTipos()
                            setVent(true) 
                        }
                       }} >Ventas</Button>
               </div>
            }
            </div>
    ) 
}
