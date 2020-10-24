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
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import LocalAtmOutlinedIcon from '@material-ui/icons/LocalAtmOutlined';
import AutorenewOutlinedIcon from '@material-ui/icons/AutorenewOutlined';
import RedeemOutlinedIcon from '@material-ui/icons/RedeemOutlined';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';

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
    // necessary for content to be below app bar
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
        <Link to="/paquetes" style={{ textDecoration: 'none' }}>
        <List >
          {['Registrar paquetes'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <LibraryAddOutlinedIcon /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>

        <Link to="/usuariosDiagnostico" style={{ textDecoration: 'none' }}>
        <List >
          {['Sistemas existentes funcionando'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <DesktopMacIcon /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>


        <Link to="/validacion" style={{ textDecoration: 'none' }}>
        <List >
          {['Registrar admin. ALFA'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <PeopleOutlinedIcon /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>
        <Link to="/facturacion" style={{ textDecoration: 'none' }}>
        <List >
          {['Facturación pendiente'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <RateReviewOutlinedIcon /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>
    
        <Link to="/facturacionRealizada" style={{ textDecoration: 'none' }}>
        <List >
          {['Sistemas vendidos por paypal'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <LocalAtmOutlinedIcon  /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>
        <Divider />        
 
        <Link to="/renovacion" style={{ textDecoration: 'none' }}>
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
        </Link>

        <Link to="/" style={{ textDecoration: 'none' }}>
        <List >
          {['Cerrar sesión'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <ExitToAppIcon  /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
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
