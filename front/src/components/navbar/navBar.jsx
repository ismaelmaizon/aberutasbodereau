import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Fragment,useContext,useState } from 'react';
import { Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
//import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
import { MiContexto } from '../context/context';



export default function NavBar() {

    const { cart } = useContext(MiContexto)

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
    const links = [
      {text: 'Agregar Producto', url: '/addproducto', icon: BorderColorIcon },
      {text: 'Agregar Lugar', url: '/addlugar', icon: AddLocationIcon },
      {text: 'Agregar Tipo', url: '/addtipo', icon: AddIcon },
    ]
  
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {links.map((link, index) => {
            const Icon = link.icon
            return(
            <ListItem key={index} disablePadding>
              <Link to = {link.url} >
                <ListItemButton >
                  <ListItemIcon>
                     <Icon/>
                  </ListItemIcon>
                  <ListItemText primary={link.text} />
                </ListItemButton>
              </Link>  
            </ListItem>)
          })}
        </List>
      </Box>
    );


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div>
              <Fragment>
                <Button sx={{color:'white'}} onClick={toggleDrawer('left', true)}><DensityMediumIcon/></Button>
                <Drawer
                  anchor={'left'}
                  open={state['left']}
                  onClose={toggleDrawer('left', false)}
                >
                  {list('left')}
                </Drawer>
              </Fragment>
          </div>
          <Link to='/inicio' >
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
          
          <Link to={'/preview'} >
            <Button sx={{color: 'white'}}>
                <AddShoppingCartIcon/> {cart.length}
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      {/*renderMobileMenu*/}
      {/*renderMenu*/}
    </Box>
  );
}