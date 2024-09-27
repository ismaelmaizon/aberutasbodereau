import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";
import { useNavigate } from "react-router-dom";

//icon
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import NavBar from "../navbar/navBar";




export default function UpdateProductLug () {

    const {idg, refresh,
        updateproductolugar,updateStockProduct, alert
    } = useContext(MiContexto)


    const router = useNavigate()

    const [data, setData] = useState({
        Idg: idg,
        stock: '',
        Lugar: '',
        procedimiento: ''
    });
    //set lugares
    const [lugar, setLugar] = useState([])
    
    const procedimiento = [
        'agregar','quitar'
    ]
    
    const dataFrom = async (event) => {
        event.preventDefault()
        setData( {...data, [event.target.name]: event.target.value  } )
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(data);
    }
    
    
    useEffect(()=>{
        let id = sessionStorage.getItem('id')
        let lugar = sessionStorage.getItem('lugar')
        let id_lugar = sessionStorage.getItem('id_lugar')
        const data = {
            Idg: id,
            stock: '',
            Lugar: id_lugar,
            procedimiento: ''
        }
        setData(data)
        setLugar(lugar)
    },[])


    return(
        <div>
        <NavBar/>
        <Box sx={{ width: '60%', margin: 'auto', marginTop: '120px', padding: '15px', boxShadow: '2px 2px 10px 2px' }} >
            <Typography variant="h4" gutterBottom sx={{ width:'400px', margin: 'auto' }}>
                ID: {data.Idg}
            </Typography>
            <Box component='form' onSubmit={handleSubmit} display={'flex'} flexDirection={'column'} >
                <Typography margin='auto' variant="h6" > <FmdGoodIcon/> {lugar}  </Typography>
                <Grid container direction="column" rowSpacing={2} marginTop={2} >
                    <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        sx={{height: '10px' , marginBottom: '60px' }}
                        id="outlined-select-currency"
                        select
                        label="Agregar / Quitar"
                        name="procedimiento"
                        helperText="quiere agregar o quitar?"
                        onChange={dataFrom}
                        >
                        {procedimiento.map((option, index) => (
                            <MenuItem key={index} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    </Grid>
                    <Grid item xs={6}>
                    <TextField 
                        required
                        fullWidth 
                        label='Ingrese cantidad de unidades' 
                        name='stock' 
                        type="number" 
                        onChange={dataFrom}/>
                    </Grid>
                    <Grid container direction ='row' sx={{ width:'500px', margin: 'auto' }} spacing={5} >
                        <Grid item xs={6} >
                            <Button type="submit" variant="contained" size="small" sx={{ width:'200px'}}  onClick={ async ()=>{
                                console.log(data);
                                let res = await updateproductolugar(data)
                                let resStock = await updateStockProduct(data.Idg)
                                res && resStock ? (alert('success'), refresh(), router('/inicio') ) : alert('error')
                            }}>crear</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button type="submit" variant="contained" size="small" sx={{ width:'200px'}}  onClick={()=>{
                                refresh()
                                router('/inicio')
                            }}>volverr</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
        </div>
    )
}