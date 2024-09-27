import { AppBar, Box, Button, Drawer, Toolbar, Typography } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { MiContexto } from "../context/context";


export default function Footer() {

    //const { cart } = useContext(MiContexto)

    //despliegue getProductosLugar
    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };    
  
    


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div>
              <Fragment>
                <Button sx={{color:'white'}} onClick={toggleDrawer('left', true)}><DensityMediumIcon/></Button>
              </Fragment>
          </div>
          <Link to='/' >
            <Typography
              variant="h6"
              noWrap
              component="div"
              color={'white'}
            >
                  Aberturas Bodereau
            </Typography>
          </Link>
          
          <Box sx={{ flexGrow: 1 }} /> {/* sirve para generar el espacio */ }
          
        </Toolbar>
      </AppBar>
      {/*renderMobileMenu*/}
      {/*renderMenu*/}
    </Box>
  );
}