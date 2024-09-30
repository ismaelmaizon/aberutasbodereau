import { DataGrid } from '@mui/x-data-grid';
//import { useDemoData } from '@mui/x-data-grid-generator';
import { useContext, useEffect, useState } from 'react';
import { MiContexto } from '../context/context';
import { Autocomplete, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SearchIcon from '@mui/icons-material/Search';
import ReplyIcon from '@mui/icons-material/Reply';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Productos() {

    const {
        getLocal, setview, view, 
        getTipos, tipos,
        setVprod, setVent,
        lugares, getLugares,
        productos, setProductoUbi,
        getProducto, setProducto, getVentas,
        filtrarTipoLadoLug, rows, setRows,
        refresh,
        lug, setLug, lado, setLado, tipo, setTipo
    } = useContext(MiContexto)

    const router = useNavigate()

    //set lugares
    const handleChangeLug = (event) => {
        //console.log(event.target.value)
        setLug(event.target.value)
    }
    //set lado
    const lados = ['Izq','Derc']    
    const handleChangeLado = (event) => {
        //console.log(event.target.value)
        setLado(event.target.value)
    }
    //set tipos 
    const handleChange = (event) => {
        setTipo(event.target.value)
    }
    //producto    
    const [prod, setProd] = useState('')
    const handleChangeProd = (event) => {
        console.log(event.target.innerText)
        setProd(event.target.innerText)
    }
    const [ids, setids] = useState([])

    const columns = [
        { field: 'col0', headerName: 'ID', width: 150 },
        { field: 'col1', headerName: 'Tipo', width: 100 },
        { field: 'col2', headerName: 'Descripcion', width: 350 },
        { field: 'col3', headerName: 'Alto', width: 100 },
        { field: 'col4', headerName: 'Ancho', width: 100 },
        { field: 'col5', headerName: 'Derc', width: 80 },
        { field: 'col6', headerName: 'Izq', width: 80 },
        { field: 'col7', headerName: 'stock', width: 100 },
        { field: 'col8', headerName: 'PrecioUnidad', width: 150 }
    ]

    
    

    useEffect(()=>{        
        let prods = []
        let ids = []
        productos.map((prod)=>{ 
            let id = { label: prod.IdGenerate }
            tipos.map((ti)=>{
                if (prod.Tipo == ti.id) {
                    let newProd = {
                        id: prod.id,
                        col0: prod.IdGenerate, 
                        col1: ti.Tipo, 
                        col2: ti.Descripcion,
                        col3: prod.Alto,
                        col4: prod.Ancho,
                        col5: prod.Derc,
                        col6: prod.Izq,
                        col7: prod.stock,
                        col8: prod.Precio_U
                    }
                    prods.push(newProd)
                }
            })
            ids.push(id)
        })
        setRows(prods)
        setids(ids)
        const userView = getLocal('view');
        console.log(userView);
        
        setview(userView)
        console.log(view);
        
    }, [])

    return (
        <div style={{ height: 350, width: '90%', margin: 'auto', marginTop: '15px' }}>
            <Typography sx={{ width: '200px', margin: 'auto', paddingBottom: '40px' }} variant='h4' >Productos</Typography>
            <Grid container direction='row' gap={2} >
                <Button variant="contained" color="info" startIcon={<ReplyIcon/>} sx={{width: '100px', height: '25px', padding: '20px' }} onClick={ async ()=>{
                    let res = await getVentas()
                    if(res.status == 401){
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "su session expiro",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        router('/')
                    }else{
                        await getLugares()
                        await getTipos()
                        setVent(true)    
                        setVprod(false)       
                        
                    }
                }}>ventas</Button>
                <Button variant="contained"  sx={{width: '100px', height: '25px', padding: '20px' }} endIcon={<RotateLeftIcon />} onClick={()=>{refresh()}}>refresh</Button>
            </Grid>
            <Grid sx={{ display: { xs: 'none', md: 'grid', gridTemplateColumns: `repeat(6, 1fr)`, alignItems:'center'},  gap: '5px' }} container>
                <Grid item xs={6} >
                    <FormControl sx={{ marginTop: '10px' , width: '100%', paddingBottom: '10px'}}>
                                <InputLabel id="demo-select-small-label" sx={{ fontSize: '15px' }} variant='outlined' size='small' >Tipo</InputLabel>
                                <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={tipo}
                                onChange={handleChange}
                                MenuProps={MenuProps}
                                style={{width: '250px', height: '45px'}}
                                >
                                {tipos.map((name, index) => (
                                    <MenuItem
                                    key={index}
                                    value={name.id}
                                    >
                                    {name.Tipo}
                                    </MenuItem>
                                ))}
                                </Select>    
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl sx={{ marginTop: '10px' , width: '100%', paddingBottom: '10px'}}>
                                <InputLabel id="demo-select-small-label" sx={{ fontSize: '15px' }} variant='outlined' size='small' >Lado</InputLabel>
                                <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={lado}
                                onChange={handleChangeLado}
                                MenuProps={MenuProps}
                                style={{width: '250px', height: '45px'}}
                                >
                                {lados.map((name, index) => (
                                    <MenuItem
                                    key={index}
                                    value={name}
                                    >
                                    {name}
                                    </MenuItem>
                                ))}
                                </Select>    
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl sx={{ marginTop: '10px' , width: '100%', paddingBottom: '10px'}}>
                                <InputLabel id="demo-select-small-label" sx={{ fontSize: '15px' }} variant='outlined' size='small'>Lugar</InputLabel>
                                <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={lug}
                                onChange={handleChangeLug}
                                MenuProps={MenuProps}
                                style={{width: '250px', height: '45px'}}
                                >
                                {lugares.map((name, index) => (
                                    <MenuItem
                                    key={index}
                                    value={name.id}
                                    >
                                    {name.fullname}
                                    </MenuItem>
                                ))}
                                </Select>    
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained"  sx={{padding: '10px' }} endIcon={<SearchIcon />} onClick={ async ()=>{ 
                        let prods = await filtrarTipoLadoLug(tipo, lado, lug) 
                        if (prods.length != 0 ){
                            setRows(prods)
                        }else{
                            alert('error')
                        }
                        }} >filtrar</Button>
                </Grid>
                <Grid item xs={6}>
                    <FormControl sx={{ marginTop: '25px' , width: '100%',paddingBottom: '25px'}}>
                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={ids}
                    style={{width: '250px', height: '45px'}}
                    onChange={handleChangeProd}
                    renderInput={(params) => <TextField {...params} label="ID´s" />}
                    />  
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained"  sx={{padding: '10px' }} endIcon={<SearchIcon />} onClick={ async ()=>{ 
                        setProductoUbi([]) 
                        setProducto([])
                        getTipos()
                        let res = await getProducto(prod)
                        //console.log(res);
                        setProducto(res) 
                        }} >ver</Button>
                </Grid>
            </Grid>
            {/********************* */ }
            <Grid sx={{ display: { xs: 'grid', md: 'none' } }} container direction="row" justifyContent="flex-start" alignItems="center" >
                <Grid container direction='column'>
                    <Grid item xs={2} >
                        <FormControl sx={{ marginTop: '25px', paddingBottom: '25px'}}>
                                    <InputLabel id="demo-select-small-label">Tipo</InputLabel>
                                    <Select
                                    sx={{height:'50px'}}
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={tipo}
                                    onChange={handleChange}
                                    MenuProps={MenuProps}
                                    style={{width: '200px'}}
                                    >
                                    {tipos.map((name, index) => (
                                        <MenuItem
                                        key={index}
                                        value={name.id}
                                        >
                                        {name.Tipo}
                                        </MenuItem>
                                    ))}
                                    </Select>    
                        </FormControl>
                        <FormControl sx={{ marginTop: '25px', paddingBottom: '25px'}}>
                                    <InputLabel id="demo-select-small-label">Lado</InputLabel>
                                    <Select
                                    sx={{height:'50px'}}
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={lado}
                                    onChange={handleChangeLado}
                                    MenuProps={MenuProps}
                                    style={{width: '200px'}}
                                    >
                                    {lados.map((name, index) => (
                                        <MenuItem
                                        key={index}
                                        value={name}
                                        >
                                        {name}
                                        </MenuItem>
                                    ))}
                                    </Select>    
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl sx={{paddingBottom: '25px'}}>
                                    <InputLabel id="demo-select-small-label">Lugar</InputLabel>
                                    <Select
                                    sx={{height:'100%'}}
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={lug}
                                    onChange={handleChangeLug}
                                    MenuProps={MenuProps}
                                    style={{width: '250px'}}
                                    >
                                    {lugares.map((name, index) => (
                                        <MenuItem
                                        key={index}
                                        value={name.id}
                                        >
                                        {name.fullname}
                                        </MenuItem>
                                    ))}
                                    </Select>    
                        </FormControl>
                        <Button variant="contained"  sx={{padding: '10px' }} endIcon={<SearchIcon />} onClick={()=>{ filtrarTipoLadoLug(tipo, lado, lug) }} >filtrar</Button>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                    <FormControl sx={{ marginTop: '25px' , width: '100%', paddingBottom: '25px'}}>
                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={ids}
                    sx={{ width: 200 }}
                    onChange={handleChangeProd}
                    renderInput={(params) => <TextField {...params} label="ID's" />}
                    />  
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained"  sx={{padding: '10px', marginBottom: '15px'}} endIcon={<SearchIcon />} onClick={async()=>{ 
                        setProductoUbi([]) 
                        setProducto([])
                        let res = await getProducto(prod)
                        console.log(res);
                        setProducto(res) 
                        }} >ver</Button>
                </Grid>
            </Grid>
            <DataGrid sx={{height: '500px'}} rows={rows} columns={columns}  />
        </div>
    );
}