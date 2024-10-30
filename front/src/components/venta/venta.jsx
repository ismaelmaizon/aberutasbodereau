import { useContext, useEffect } from "react"
import { MiContexto } from "../context/context"


import { Page, Text, View, Document, PDFDownloadLink, Image } from '@react-pdf/renderer';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';


//lugares
import {Button, Card, CardActions, Grid, Typography} from '@mui/material';
import { Link,  } from "react-router-dom"

export default function Venta() {
    const {
        ventainf, ventainfProds
    } = useContext(MiContexto)

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
                                
                                <Text style={{height: 40, margin: 'auto', padding: 10}}> Nombre: {ventainf.nombre} </Text>
                                <Text style={{height: 40, margin: 'auto', padding: 10}}> Apellido: {ventainf.apellido} </Text>
                                <Text style={{height: 40, margin: 'auto', padding: 10}}> Email: {ventainf.email}</Text>
                                <Text style={{height: 40, margin: 'auto', padding: 10}}> Cel: {ventainf.cel} </Text>
                        </View>
                        <View style={{
                            backgroundColor: 'white', 
                            margin: 2, height: 20,
                            display: 'flex', flexDirection: "row", alignSelf: "flex-start", justifyContent: "space-around",
                            color: '#000', fontSize: '9px' }}  >
                                
                                <Text style={{height: 40, padding: 10}}> Provincia: {ventainf.provincia} </Text>
                                <Text style={{height: 40, padding: 10}}> Localidad: {ventainf.localidad} </Text>
                                <Text style={{height: 40, padding: 10}}> Calle: {ventainf.calle} </Text>
                                <Text style={{height: 40, padding: 10}}> Altura: {ventainf.altura} </Text>
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
                        ventainfProds.map((el, index)=>{ 
                            return <View key={index} style={{ 
                                backgroundColor: 'white', 
                                margin: 2, height: 20,
                                display: 'flex', flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around",
                                color: '#000', fontSize: '9px' }}  >
                            
                                <Text style={{width: 80, height: 40, margin: 'auto'}}>{el.Tipo}</Text>
                                <Text style={{width: 80, height: 40, margin: 'auto'}}>{el.IdGenerate}</Text>
                                <Text style={{width: 80, height: 40, margin: 'auto'}}>{el.cantidad}</Text>
                                <Text style={{width: 80, height: 40, margin: 'auto'}}>{el.lugar}</Text>
                                <Text style={{width: 80, height: 40, margin: 'auto'}}>${el.subtotal}</Text>
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
                            <Text style={{width: '100%' , height: 40, backgroundColor: 'grey'}} > Total: ${ventainf.total} </Text>
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
                                
                                <Text style={{height: 40, margin: 'auto', padding: 10}}> Nombre: {ventainf.nombre} </Text>
                                <Text style={{height: 40, margin: 'auto', padding: 10}}> Apellido: {ventainf.apellido} </Text>
                                <Text style={{height: 40, margin: 'auto', padding: 10}}> Email: {ventainf.email}</Text>
                                <Text style={{height: 40, margin: 'auto', padding: 10}}> Cel: {ventainf.cel} </Text>
                        </View>
                        <View style={{
                            backgroundColor: 'white', 
                            margin: 2, height: 20,
                            display: 'flex', flexDirection: "row", alignSelf: "flex-start", justifyContent: "space-around",
                            color: '#000', fontSize: '9px' }}  >
                                
                                <Text style={{height: 40, padding: 10}}> Provincia: {ventainf.provincia} </Text>
                                <Text style={{height: 40, padding: 10}}> Localidad: {ventainf.localidad} </Text>
                                <Text style={{height: 40, padding: 10}}> Calle: {ventainf.calle} </Text>
                                <Text style={{height: 40, padding: 10}}> Altura: {ventainf.altura} </Text>
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
                        ventainfProds.map((el, index)=>{ 
                            return <View key={index} style={{ 
                                backgroundColor: 'white', 
                                margin: 2, height: 20,
                                display: 'flex', flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around",
                                color: '#000', fontSize: '9px' }}  >
                            
                                <Text style={{width: 80, height: 40, margin: 'auto'}}>{el.Tipo}</Text>
                                <Text style={{width: 80, height: 40, margin: 'auto'}}>{el.IdGenerate}</Text>
                                <Text style={{width: 80, height: 40, margin: 'auto'}}>{el.cantidad}</Text>
                                <Text style={{width: 80, height: 40, margin: 'auto'}}>{el.lugar}</Text>
                                <Text style={{width: 80, height: 40, margin: 'auto'}}>${el.subtotal}</Text>
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
                            <Text style={{width: '100%' , height: 40, backgroundColor: 'grey'}} > Total: ${ventainf.total} </Text>
                        </View>
                        
                    </View>
                </View>
            </Page>
            </Document>
    )}

    useEffect(()=>{
        //console.log(ventainf);
        //console.log(ventainfProds);
    } ,[])

    return (
        <div>
            {ventainf.length == 0 ? <div></div> : <Card sx={{ width: '1000px', margin: 'auto', marginTop: '25px', boxShadow: '2px 2px 10px 2px'  }}>
                    <Grid container direction='column' margin={3}>
                        <Typography margin='auto' variant="h4" width={450} component="div">
                        Informacion de Venta 
                        </Typography>
                        <Typography  variant="h6" >
                            Fecha: {ventainf.fecha}
                        </Typography>
                        <Grid container item xs={10} direction='row' margin={2} >
                                <Grid item xs={6}><Typography variant="body1" component='h3'>Id: {ventainf.id_venta} </Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1" component='h3'>Nombre: {ventainf.nombre}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1" component='h3'>Apellido: {ventainf.apellido}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1" component='h3'>Telefono: {ventainf.cel}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1" component='h3'>Email: {ventainf.email}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1" component='h3'>Provincia: {ventainf.provincia}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1" component='h3'>Localidad: {ventainf.localidad}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1" component='h3'>Calle: {ventainf.calle} </Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1" component='h3'>Altura: {ventainf.altura} </Typography></Grid>
                                <Grid item xs={6}><Typography variant="h5" component='h3'>Total: ${ventainf.total} </Typography></Grid>
                        </Grid>
                        <Grid container item xs={12} direction='row' gap={2} paddingBottom={2} >
                                <Grid item xs={2} ><Typography variant="body1" component='h3'>Tipo</Typography></Grid>
                                <Grid item xs={2}><Typography variant="body1" component='h3'>ID</Typography></Grid>
                                <Grid item xs={2}><Typography variant="body1" component='h3'>Cantidad</Typography></Grid>
                                <Grid item xs={2}><Typography variant="body1" component='h3'>SubTotal</Typography></Grid>
                                
                            </Grid>
                            <Grid container item xs={12} direction='row' gap={2}>
                                {
                                ventainfProds.map((el, index)=>{ 
                                    return <Grid item xs={12} key={index}
                                                container direction="row" color='grey.500' gap={2} > 
                                                    <Grid item xs={2}><Typography variant="body1" component='h3'>{el.Tipo}</Typography></Grid>
                                                    <Grid item xs={2}><Typography variant="body1" component='h3'>{el.IdGenerate} </Typography></Grid>
                                                    <Grid item xs={2}><Typography variant="body1" component='h3'>{el.cantidad}</Typography></Grid>
                                                    <Grid item xs={2}><Typography variant="body1" component='h3'>${el.subtotal}</Typography></Grid>
                                        </Grid>
                                })
                                }
                        </Grid>     
                    </Grid>
                    <CardActions  >
                        <Link to='/updateVenta'>
                            <Button size="small" color="info" variant="contained">modificar</Button>
                        </Link>
                        <Grid>
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
                    </CardActions>
                </Card>
             } 
    </div>)}