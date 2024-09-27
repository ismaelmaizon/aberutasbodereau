import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";
import { Link, useNavigate } from "react-router-dom";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import SendIcon from '@mui/icons-material/Send';


import { Page, Text, View, Document, PDFDownloadLink, Image } from '@react-pdf/renderer';
import NavBar from "../navbar/navBar";


export default function Dashboard () {

    const {
        tipos,
        venta, alert, setCart, setVenta,
        registrarProdsVenta,updateproductolugar,updateStockProduct
    } = useContext(MiContexto)

    const router = useNavigate()


    const [cliente, setCliente ] = useState({})
    const [carro, setCarro ] = useState([])
    
    // Create Document Component
    function MyDocument () {
        return(
        <Document>
        <Page size="A4" style={{width: 250, height: 475, padding: 10}}>
            <View style={{flex: 1, rowGap: 10}}>
                <View style={{ 
                            display: 'flex', flexDirection: "row", alignSelf: "center", justifyContent: "space-around",
                            backgroundColor: 'grey', width: '20%' , height: '15px'
                        }}
                        > Original
                        <Text style={{color: 'black', fontSize: '10px' }}> Original </Text>
                </View>
                
                <View style={{ 
                        display: 'flex', flexDirection: "row", alignSelf: "flex-start", justifyContent: "space-around",
                        }}
                    >
                    <Image src='../../../public/logoAB.png' style={{width: 100, height: 90}} ></Image>
                </View>
                <View style={{ display: 'block', marginBottom: 20, marginTop: '-25px'}} >
                    <Text style={{fontSize: '6px', width: '100%'}}> Cordoba </Text>
                    <Text style={{fontSize: '6px', width: '100%'}}> Sucursal: Bodereau 001 </Text>
                    <Text style={{fontSize: '6px', width: '100%'}}> direccion: Av Bodereau 542 </Text>
                    <Text style={{fontSize: '6px', width: '100%'}}> CP: X5000 </Text>
                </View>
                {/* Linea de division */}
                <View style={{ 
                        display: 'flex', flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around",
                        }}
                        >
                        <View style={{height: 1, width: '100%', backgroundColor: 'black', display: 'block'}}></View>    
                </View>
                {/* Linea de division */}
                <View style={{flex: 1, marginInline: 10}}   >
                    <View style={{ 
                        margin: 5, height: 20,
                        display: 'flex', flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around",fontSize: '10px' }}
                        ><Text style={{height: 30, width: '100%'}}> Cliente: </Text>
                    </View>
                    <View style={{ 
                        backgroundColor: 'white', 
                        margin: 2, height: 20, 
                        display: 'flex', flexDirection: "row", alignSelf: "flex-start", justifyContent: "space-around",
                        color: '#000', fontSize: '9px' }}  >
                            
                            <Text style={{height: 40, margin: 'auto', padding: 10}}> Nombre: {cliente.nombre} </Text>
                            <Text style={{height: 40, margin: 'auto', padding: 10}}> Apellido: {cliente.apellido} </Text>
                            <Text style={{height: 40, margin: 'auto', padding: 10}}> Email: {cliente.email}</Text>
                            <Text style={{height: 40, margin: 'auto', padding: 10}}> Cel: {cliente.cel} </Text>
                    </View>
                    <View style={{
                        backgroundColor: 'white', 
                        margin: 2, height: 20,
                        display: 'flex', flexDirection: "row", alignSelf: "flex-start", justifyContent: "space-around",
                        color: '#000', fontSize: '9px' }}  >
                            
                            <Text style={{height: 40, padding: 10}}> Provincia: {cliente.provincia} </Text>
                            <Text style={{height: 40, padding: 10}}> Localidad: {cliente.localidad} </Text>
                            <Text style={{height: 40, padding: 10}}> Calle: {cliente.calle} </Text>
                            <Text style={{height: 40, padding: 10}}> Altura: {cliente.altura} </Text>
                    </View>
                    {/* Linea de division */}
                    <View style={{
                            marginTop: 20, marginBottom: 5,
                            display: 'flex', flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around",
                            color: '#000', fontSize: '15px' }}
                            >
                            <View style={{height: 3, width: '100%', backgroundColor: 'black', display: 'block'}}></View>    
                    </View>
                    {/* Linea de division */}
                    <View style={{ 
                        margin: 5, height: 20,
                        display: 'flex', flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around",fontSize: '10px' }}
                        ><Text style={{height: 30, width: '100%'}}> Productos: </Text>
                    </View> 
                    <View style={{ 
                            backgroundColor: 'white', 
                            margin: 2, height: 20,
                            display: 'flex', flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around",
                            color: '#000', fontSize: '9px' }}  >
                        
                            <Text style={{width: 80, height: 40, margin: 'auto'}}>Tipo</Text>
                            <Text style={{width: 80, height: 40, margin: 'auto'}}>ID</Text>
                            <Text style={{width: 80, height: 40, margin: 'auto'}}>Cantidad</Text>
                            <Text style={{width: 80, height: 40, margin: 'auto'}}>Lugar</Text>
                            <Text style={{width: 80, height: 40, margin: 'auto'}}>SubTotal</Text>
                    </View>       
                    {
                    venta.cart.map((el, index)=>{ 
                        return <View key={index} style={{ 
                            backgroundColor: 'white', 
                            margin: 2, height: 20,
                            display: 'flex', flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around",
                            color: '#000', fontSize: '9px' }}  >
                        
                            <Text style={{width: 80, height: 40, margin: 'auto'}}>{el.Tipo}</Text>
                            <Text style={{width: 80, height: 40, margin: 'auto'}}>{el.idg}</Text>
                            <Text style={{width: 80, height: 40, margin: 'auto'}}>{el.cantidad}</Text>
                            <Text style={{width: 80, height: 40, margin: 'auto'}}>{el.lugar}</Text>
                            <Text style={{width: 80, height: 40, margin: 'auto'}}>${el.subTotal}</Text>
                        </View>
                        
                    })
                    }
                    <View style={{ 
                            display: 'flex', flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around",
                            color: '#000', fontSize: '15px' }}
                            >
                            <View style={{height: 1, width: '100%', backgroundColor: 'black', display: 'block'}}></View>    
                    </View>
                </View>
                <View style={{
                        position: "absolute",
                        width: '100%',
                        bottom: 0,
                        height: 64,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        }}>
                    <View style={{width: '100%' , height: 40, backgroundColor: 'grey'}} >
                        <Text style={{width: '100%' , height: 40, backgroundColor: 'grey'}} > Total: ${venta.total} </Text>
                    </View>
                    
                </View>
            </View>
        </Page>
        <Page size="A4" style={{width: 250, height: 475, padding: 10}}>
        <View style={{flex: 1, rowGap: 10}}>
                <View style={{ 
                            display: 'flex', flexDirection: "row", alignSelf: "center", justifyContent: "space-around",
                            backgroundColor: 'grey', width: '20%' , height: '15px'
                        }}
                        > Original
                        <Text style={{color: 'black', fontSize: '10px' }}> Duplicado </Text>
                </View>
                
                <View style={{ 
                        display: 'flex', flexDirection: "row", alignSelf: "flex-start", justifyContent: "space-around",
                        }}
                    >
                    <Image src='../../../public/logoAB.png' style={{width: 100, height: 90}} ></Image>
                </View>
                <View style={{ display: 'block', marginBottom: 20, marginTop: '-25px'}} >
                    <Text style={{fontSize: '6px', width: '100%'}}> Cordoba </Text>
                    <Text style={{fontSize: '6px', width: '100%'}}> Sucursal: Bodereau 001 </Text>
                    <Text style={{fontSize: '6px', width: '100%'}}> direccion: Av Bodereau 542 </Text>
                    <Text style={{fontSize: '6px', width: '100%'}}> CP: X5000 </Text>
                </View>
                {/* Linea de division */}
                <View style={{ 
                        display: 'flex', flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around",
                        }}
                        >
                        <View style={{height: 1, width: '100%', backgroundColor: 'black', display: 'block'}}></View>    
                </View>
                {/* Linea de division */}
                <View style={{flex: 1, marginInline: 10}}   >
                    <View style={{ 
                        margin: 5, height: 20,
                        display: 'flex', flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around",fontSize: '10px' }}
                        ><Text style={{height: 30, width: '100%'}}> Cliente: </Text>
                    </View>
                    <View style={{ 
                        backgroundColor: 'white', 
                        margin: 2, height: 20, 
                        display: 'flex', flexDirection: "row", alignSelf: "flex-start", justifyContent: "space-around",
                        color: '#000', fontSize: '9px' }}  >
                            
                            <Text style={{height: 40, margin: 'auto', padding: 10}}> Nombre: {cliente.nombre} </Text>
                            <Text style={{height: 40, margin: 'auto', padding: 10}}> Apellido: {cliente.apellido} </Text>
                            <Text style={{height: 40, margin: 'auto', padding: 10}}> Email: {cliente.email}</Text>
                            <Text style={{height: 40, margin: 'auto', padding: 10}}> Cel: {cliente.cel} </Text>
                    </View>
                    <View style={{
                        backgroundColor: 'white', 
                        margin: 2, height: 20,
                        display: 'flex', flexDirection: "row", alignSelf: "flex-start", justifyContent: "space-around",
                        color: '#000', fontSize: '9px' }}  >
                            
                            <Text style={{height: 40, padding: 10}}> Provincia: {cliente.provincia} </Text>
                            <Text style={{height: 40, padding: 10}}> Localidad: {cliente.localidad} </Text>
                            <Text style={{height: 40, padding: 10}}> Calle: {cliente.calle} </Text>
                            <Text style={{height: 40, padding: 10}}> Altura: {cliente.altura} </Text>
                    </View>
                    {/* Linea de division */}
                    <View style={{
                            marginTop: 20, marginBottom: 5,
                            display: 'flex', flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around",
                            color: '#000', fontSize: '15px' }}
                            >
                            <View style={{height: 3, width: '100%', backgroundColor: 'black', display: 'block'}}></View>    
                    </View>
                    {/* Linea de division */}
                    <View style={{ 
                        margin: 5, height: 20,
                        display: 'flex', flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around",fontSize: '10px' }}
                        ><Text style={{height: 30, width: '100%'}}> Productos: </Text>
                    </View> 
                    <View style={{ 
                            backgroundColor: 'white', 
                            margin: 2, height: 20,
                            display: 'flex', flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around",
                            color: '#000', fontSize: '9px' }}  >
                        
                            <Text style={{width: 80, height: 40, margin: 'auto'}}>Tipo</Text>
                            <Text style={{width: 80, height: 40, margin: 'auto'}}>ID</Text>
                            <Text style={{width: 80, height: 40, margin: 'auto'}}>Cantidad</Text>
                            <Text style={{width: 80, height: 40, margin: 'auto'}}>Lugar</Text>
                            <Text style={{width: 80, height: 40, margin: 'auto'}}>SubTotal</Text>
                    </View>       
                    {
                    venta.cart.map((el, index)=>{ 
                        return <View key={index} style={{ 
                            backgroundColor: 'white', 
                            margin: 2, height: 20,
                            display: 'flex', flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around",
                            color: '#000', fontSize: '9px' }}  >
                        
                            <Text style={{width: 80, height: 40, margin: 'auto'}}>{el.Tipo}</Text>
                            <Text style={{width: 80, height: 40, margin: 'auto'}}>{el.idg}</Text>
                            <Text style={{width: 80, height: 40, margin: 'auto'}}>{el.cantidad}</Text>
                            <Text style={{width: 80, height: 40, margin: 'auto'}}>{el.lugar}</Text>
                            <Text style={{width: 80, height: 40, margin: 'auto'}}>${el.subTotal}</Text>
                        </View>
                        
                    })
                    }
                    <View style={{ 
                            display: 'flex', flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around",
                            color: '#000', fontSize: '15px' }}
                            >
                            <View style={{height: 1, width: '100%', backgroundColor: 'black', display: 'block'}}></View>    
                    </View>
                </View>
                <View style={{
                        position: "absolute",
                        width: '100%',
                        bottom: 0,
                        height: 64,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        }}>
                    <View style={{width: '100%' , height: 40, backgroundColor: 'grey'}} >
                        <Text style={{width: '100%' , height: 40, backgroundColor: 'grey'}} > Total: ${venta.total} </Text>
                    </View>
                    
                </View>
            </View>
        </Page>
        </Document>
    )}

    useEffect(()=>{      
        let v = {
            'nombre': venta.cliente.nombre,
            'apellido': venta.cliente.apellido,
            'email': venta.cliente.email,
            'cel': venta.cliente.cel,
            'provincia': venta.cliente.provincia,
            'localidad': venta.cliente.localidad,
            'calle': venta.cliente.calle,
            'altura': venta.cliente.altura
        }
        setCliente(v)
        console.log(venta);
        
        setCarro(venta.cart)
        tipos.map((ti)=>{
            venta.cart.map((prod)=>{
                if(ti.id == prod.Tipo){
                    prod.Tipo = ti.Tipo
                }
            })
        })
    },[])
    


    return(
        <div>
        <NavBar/>
        <Card sx={{ width: '70%', display: 'flex', flexDirection: 'column', margin: 'auto', marginTop: '20px', marginBottom: '20px', padding: '15px' }} border='solid 0px' boxShadow='5px 2px 15px' >
                                        <Grid container direction='column' margin='auto' >
                                                <Typography margin='auto' variant="h3" component='h3' fontFamily={'fantasy'} >
                                                    Venta
                                                </Typography>
                                                <Typography variant="h5" component='h3' fontFamily={'fantasy'} >
                                                    Cliente:
                                                </Typography>
                                            <Grid container item xs={2} direction='row' margin={2} >
                                                    <Grid item xs={6}><Typography variant="body1" component='h3'>Nombre: {cliente.nombre}</Typography></Grid>
                                                    <Grid item xs={6}><Typography variant="body1" component='h3'>Apellido: {cliente.apellido}</Typography></Grid>
                                                    <Grid item xs={6}><Typography variant="body1" component='h3'>Telefono: {cliente.cel}</Typography></Grid>
                                                    <Grid item xs={6}><Typography variant="body1" component='h3'>Email: {cliente.email}</Typography></Grid>
                                                    <Grid item xs={6}><Typography variant="body1" component='h3'>Provincia: {cliente.provincia} </Typography></Grid>
                                                    <Grid item xs={6}><Typography variant="body1" component='h3'>Localidad: {cliente.localidad} </Typography></Grid>
                                                    <Grid item xs={6}><Typography variant="body1" component='h3'>Calle: {cliente.calle} </Typography></Grid>
                                                    <Grid item xs={6}><Typography variant="body1" component='h3'>Altura: {cliente.altura} </Typography></Grid>
                                            </Grid>
                                            <Grid item xs={2} container direction='row' alignItems='center' >
                                                <Grid item xs={8} paddingTop={5} paddingBottom={5}>
                                                    <Typography variant="h5" component='h3' marginBottom={2}>Identificador de Venta:</Typography>
                                                    <Typography variant="h5" component='h3' marginBottom={2} fontFamily={'fantasy'} >{venta.id_venta}</Typography>
                                                </Grid>
                                                <Grid container item xs={12} direction='row' gap={2} paddingBottom={2} >
                                                    <Grid item xs={2} ><Typography variant="body1" component='h3'>Tipo</Typography></Grid>
                                                    <Grid item xs={2}><Typography variant="body1" component='h3'>ID</Typography></Grid>
                                                    <Grid item xs={2}><Typography variant="body1" component='h3'>Cantidad</Typography></Grid>
                                                    <Grid item xs={2}><Typography variant="body1" component='h3'>Lugar</Typography></Grid>
                                                    <Grid item xs={2}><Typography variant="body1" component='h3'>SubTotal</Typography></Grid>
                                                    
                                                </Grid>
                                                <Grid container item xs={12} direction='row' gap={2}>
                                                    {
                                                    venta.cart.map((el, index)=>{ 
                                                        return <Grid item xs={12} key={index}
                                                                    container direction="row" color='grey.500' gap={2} > 
                                                                        <Grid item xs={2}><Typography variant="body1" component='h3'>{el.Tipo}</Typography></Grid>
                                                                        <Grid item xs={2}><Typography variant="body1" component='h3'>{el.idg} </Typography></Grid>
                                                                        <Grid item xs={2}><Typography variant="body1" component='h3'>{el.cantidad}</Typography></Grid>
                                                                        <Grid item xs={2}><Typography variant="body1" component='h3'>{el.lugar}</Typography></Grid>
                                                                        <Grid item xs={2}><Typography variant="body1" component='h3'>{el.subTotal}</Typography></Grid>
                                                            </Grid>
                                                    })
                                                    }
                                                </Grid>    
                                            </Grid>
                                        </Grid>
                                        <Grid container padding={2} direction='row' width='100%' marginTop={5} >
                                            <Grid item xs={4}>
                                                <Typography variant="h5" component='h3' >
                                                    Total: ${venta.total}
                                                </Typography>
                                                <Link to = '/inicio' >
                                                    <Button>cancelar</Button>
                                                </Link>
                                            </Grid>
                                            <Box sx={{ flexGrow: 5 }} />
                                            <Grid item xs={3} container alignSelf='flex-end' gap={4}>
                                                <Grid item xs={4}>
                                                    <PDFDownloadLink document={<MyDocument/>} fileName="mypdf.pdf" >
                                                        {
                                                            ({loading, url, error, blob}) => loading ? <Button>
                                                            cargando...</Button> : <Button startIcon={<LocalPrintshopIcon/>} onClick={ async ()=>{
                                                            }} >
                                                                Imprimir 
                                                            </Button>                                                         
                                                        }
                                                    </PDFDownloadLink>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Button startIcon={<SendIcon/>} onClick={ async ()=>{
                                                    carro.map( async (el)=>{
                                                        let infoProd = {
                                                            id_venta: venta.id_venta,
                                                            id_producto: el.id, 
                                                            IdGenerate: el.idg, 
                                                            Tipo: el.Tipo, 
                                                            cantidad: el.cantidad, 
                                                            subtotal: el.subTotal
                                                        }
                                                        
                                                        let regProdVenta = await registrarProdsVenta(infoProd)
                                                        console.log(regProdVenta.status);
                                                        if (regProdVenta.status == 200) {
                                                            let update = {
                                                                Idg: el.idg, 
                                                                stock: el.cantidad, 
                                                                Lugar: el.id_lugar, 
                                                                procedimiento: 'quitar'
                                                            }
                                                            let upprodlug = await updateproductolugar(update)
                                                            console.log(upprodlug);
                                                            if (upprodlug.status == 200) {
                                                                let upprod = await updateStockProduct(update.Idg)
                                                                console.log(upprod);
                                                            }
                                                        }else{
                                                            alert('error')
                                                        }
                                                    })
                                                    alert('success')
                                                    setCart([])
                                                    setVenta({})
                                                    router('/inicio')
                                                    }} >
                                                        finalizar 
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                            
                                        </Grid>
        </Card> 
        </div>
    )
}
