import React, { Component } from 'react';
import Sidebar from './sidebar'
import diagnostico from '../images/diagnostico.png'
import {Navbar} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


class NavbarDashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            date: ''
        }
    }

    componentWillMount(){
        var LaFecha=new Date();
        var Mes=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        var diasem=new Array('Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado');
        var diasemana=LaFecha.getDay();
        var FechaCompleta="";
        var NumeroDeMes="";    
        NumeroDeMes=LaFecha.getMonth();
        FechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear();
    
        this.setState({date:FechaCompleta}) 
    }
    
    render(){
        return(
            
            <Navbar style={{backgroundColor:"#10D9F9"}} expand="lg">
             <Sidebar/>
              <Navbar.Brand href="/dashboardAdminAlfa"><img src={diagnostico} alt ="logo" style={{width:100, height: 33}} ></img> </Navbar.Brand>
              <Navbar.Brand></Navbar.Brand>
              <Navbar.Brand></Navbar.Brand> 

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <strong>ADMINISTRACION DE VENTAS</strong>
              <Navbar.Collapse id="basic-navbar-nav">
               
              </Navbar.Collapse><strong></strong>{this.props.prop}<Navbar.Collapse id="basic-navbar-nav">
              </Navbar.Collapse>
              <Navbar.Collapse id="basic-navbar-nav">
              </Navbar.Collapse>
              <Navbar.Collapse id="basic-navbar-nav">
              </Navbar.Collapse>
              <Navbar.Collapse id="basic-navbar-nav">
              </Navbar.Collapse>
              <Navbar.Collapse id="basic-navbar-nav">
                 <strong>{this.state.date}</strong> 
              </Navbar.Collapse>
              <strong>Versión 1.3</strong> 

              <Navbar.Collapse  id="basic-navbar-nav">
              </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavbarDashboard



