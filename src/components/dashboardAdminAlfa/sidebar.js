import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import {Link} from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
// import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';
// import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
// import LocalAtmOutlinedIcon from '@material-ui/icons/LocalAtmOutlined';
// import AutorenewOutlinedIcon from '@material-ui/icons/AutorenewOutlined';
// import RedeemOutlinedIcon from '@material-ui/icons/RedeemOutlined';
// import DesktopMacIcon from '@material-ui/icons/DesktopMac';
// import ClearIcon from '@material-ui/icons/Clear';
// import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import image from '../images/delete.svg';
import monitor from '../images/monitor.svg';
import renovation from '../images/renovation.svg';
import admin from '../images/admin.svg'
import card from '../images/card.svg'
import exit from '../images/exit.svg'
import user from '../images/user.svg'
const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        containerStyle={{backgroundColor: 'black'}}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        
        }}
    
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Link to="/paquetes" style={{ textDecoration: 'none', color: 'blue' }}>
        <List >
          {['Registrar paquetes'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon><img width="24" heigth= "24"src = {user}></img></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>

        <Link to="/renovacionLicencias" style={{ textDecoration: 'none', color: 'blue' }}>
        <List >
          {['Renovacion de Licencias'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon><img src = {renovation} width="30" heigth= "30" /></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>

        <Link to="/usuariosDiagnostico" style={{ textDecoration: 'none', color: 'blue' }}>
        <List >
          {['Clientes Diagnostico035'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon><img width="24" heigth= "24" src = {monitor}/></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>

        <Link to="/validacionEval" style={{ textDecoration: 'none', color: 'blue' }}>
        <List >
          {['Eliminar evaluaciones'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon><img width="24" heigth= "24"src = {image}></img></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>

        <Link to="/validacion" style={{ textDecoration: 'none', color: 'blue' }}>
        <List >
          {['Registrar admin. ADS'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon><img src = {admin} width="24" heigth= "24" /></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>
        
        <Divider />        
        <Link to="" style={{ textDecoration: 'none', color: 'blue' }}>
        <List >
          {['Pagos tarjeta (pendiente)'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon><img src = {card} width="24" heigth= "24" /></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>
        {/* <Link to="/renovacion" style={{ textDecoration: 'none' }}>
        <List >
          {['Renovaciones'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <AutorenewOutlinedIcon  /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>
        <Link to="/promociones" style={{ textDecoration: 'none' }}>
        <List >
          {['Promociones'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <RedeemOutlinedIcon  /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link> */}

        <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
        <List >
          {['Cerrar sesión'].map((text) => {
            return(
              <ListItem button key={text} >
              <ListItemIcon><img src = {exit} width="24" heigth= "24" /></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            )
          })}
        </List>    
        </Link>
      </Drawer>
      <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >     
          <MenuIcon  />
          
          </IconButton>
    </div>
  );
}
