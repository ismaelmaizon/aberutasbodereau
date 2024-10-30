import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { MiContexto } from "../context/context";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbar/navBar";




export default function AddTipo () {

    const {createTipo, alert, getTipos, refresh} = useContext(MiContexto)

    const router = useNavigate()

    const [data, setData] = useState({
        Tipo: '',
        Descripcion: ''
    });

    async function dataFrom(event) {
        event.preventDefault();
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(data);
    }


    return(
        <div>
        <NavBar/>
        <Box sx={{ width: '60%', margin: 'auto', marginTop: '120px', padding: '15px', boxShadow: '2px 2px 10px 2px' }} >
            <Typography variant="h4" gutterBottom sx={{ width:'300px', margin: 'auto' }}  >
                Agregar nuevo tipo
            </Typography>
            <Box component='form' onSubmit={handleSubmit} display={'flex'} flexDirection={'column'} >
                    <Grid container direction="column" rowSpacing={1} spacing={5} marginBottom="20px" marginTop="20px">
                        <Grid item xs={8}>
                        <TextField fullWidth label='Tipo' name='Tipo' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                        <Grid item xs={8}>
                        <TextField fullWidth label='Descripcion' name='Descripcion' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                    </Grid>      
            <Grid container direction='row' sx={{ width:'500px', margin: 'auto' }} spacing={5} >
                    <Grid item xs={6}  >
                            <Button type="submit" variant="contained" size="small" sx={{ width:'200px'}} onClick={()=>{
                                refresh()
                                router('/inicio')
                            }}>volver</Button>
                        </Grid>
                    <Grid item xs={6}  >
                    <Button type="submit" variant="contained" size="small" sx={{ width:'200px', margin: 'auto' }} onClick={ async ()=>{
                        console.log(data);
                        let respon = await createTipo(data)
                        console.log(respon.status);
                        if (respon.status == 200) {
                            await getTipos()
                            await alert('success')
                            router('/inicio')
                        }
                    }}  >crear</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
        </div>
    )
}
