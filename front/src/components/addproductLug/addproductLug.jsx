import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbar/navBar";




export default function AddProductLug () {

    const {
        productoUbi,
        getProductos,
        updateStockProduct,
        lugares, idg, refresh,
        insertProdLug, alert
    } = useContext(MiContexto)


    const router = useNavigate()

    const [data, setData] = useState({
        Idg: idg,
        stock: '',
        Lugar: '',
    });


    //set lugares (filtra de lugares ya existentes)
    const [lugs, setLugs] = useState([])
    const state = () =>{
        let lu = []
        lugares.map((l)=>{
            lu.push(l)
        })
        productoUbi.map((u)=>{
            console.log(u);
            lu = lu.filter( item => item.id !== u.id_lugar)
            console.log(lu);
            
        })
        setLugs(lu)
    } 
    

    
    const dataFrom = async (event) => {
        event.preventDefault()
        setData( {...data, [event.target.name]: event.target.value  } )
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(data);
    }
    
    
    useEffect(()=>{
        state()
    },[])


    return(
        <div>
        <NavBar/>
        <Box sx={{ width: '60%', margin: 'auto', marginTop: '120px', padding: '15px', boxShadow: '2px 2px 10px 2px' }} >
            <Typography variant="h4" gutterBottom sx={{ width:'300px', margin: 'auto' }} paddingBottom={3} >
                Ubicar Producto:
            </Typography>
            <Box component='form' onSubmit={handleSubmit} display={'flex'} flexDirection={'column'} >
                <Typography variant="h6" gutterBottom sx={{ width:'300px'}}>ID: {idg}  </Typography>
                <Grid container direction="column" rowSpacing={1} spacing={5} marginBottom="5px" marginTop="5px" >
                    <Grid item xs={6}>
                    <TextField 
                        required
                        fullWidth 
                        label='Ingrese cantidad de unidades' 
                        name='stock' 
                        type="number" 
                        onChange={dataFrom}/>
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        sx={{height: '10px' , marginBottom: '100px' }}
                        id="outlined-select-currency"
                        select
                        label="Donde ira este producto?"
                        name="Lugar"
                        helperText="Porfavor seleccione ubicacion"
                        onChange={dataFrom}
                        >
                        {lugs.map((option, index) => (
                            <MenuItem key={index} value={option.id}>
                            {option.fullname}
                            </MenuItem>
                        ))}
                    </TextField>
                    </Grid>
                </Grid>
                <Grid container direction='row' sx={{ width:'500px', margin: 'auto' }} spacing={5} >
                    <Grid item xs={6}  >
                        <Button type="submit" variant="contained" size="small" sx={{ width:'200px'}} onClick={ async ()=>{
                            console.log(data);
                            let res = await insertProdLug(data)
                            await updateStockProduct(idg)
                            await getProductos()
                            res ? (alert('success'), refresh(), router('/inicio') ) : alert('error')
                        }} >crear</Button>
                    </Grid>
                    <Grid item xs={6}  >
                        <Button type="submit" variant="contained" size="small" sx={{ width:'200px'}} onClick={()=>{
                            refresh()
                            router('/inicio')
                        }}>volver</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
        </div>
    )
}
