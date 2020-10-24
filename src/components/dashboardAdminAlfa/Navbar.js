import React, { Component } from 'react';
import Sidebar from './sidebar'
import diagnostico from '../images/diagnostico.png'
import {Navbar} from 'react-bootstrap'


class NavbarDashboard extends Component {
    constructor(props){
        super(props)
    }

    
    render(){
        return(
            <Navbar style={{backgroundColor:"#10D9F9",height:50}} expand="lg">
             <Sidebar/>
              <Navbar.Brand href="/dashboardAdminAlfa"><img src={diagnostico} alt ="logo" style={{width: 100, height: 33}} ></img> </Navbar.Brand>
              <Navbar.Brand></Navbar.Brand>
              <Navbar.Brand></Navbar.Brand> 

              <Navbar.Toggle aria-controls="basic-navbar-nav" />

              <Navbar.Collapse id="basic-navbar-nav">
              </Navbar.Collapse>
              <Navbar.Collapse id="basic-navbar-nav">
              </Navbar.Collapse> <Navbar.Collapse id="basic-navbar-nav">
              </Navbar.Collapse>
              <Navbar.Collapse id="basic-navbar-nav">
              </Navbar.Collapse>
              <Navbar.Collapse id="basic-navbar-nav">
               <h7>ADMINISTRACIÓN DE VENTAS</h7>
              </Navbar.Collapse>{this.props.prop}<Navbar.Collapse id="basic-navbar-nav">
              </Navbar.Collapse>
              <Navbar.Collapse id="basic-navbar-nav">
              </Navbar.Collapse>
              <Navbar.Collapse id="basic-navbar-nav">
              </Navbar.Collapse>
              <Navbar.Collapse id="basic-navbar-nav">
              </Navbar.Collapse>
              <Navbar.Collapse id="basic-navbar-nav">
              </Navbar.Collapse>
              <Navbar.Collapse  id="basic-navbar-nav">
                  Versión de software : 1.2.0
              </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavbarDashboard



