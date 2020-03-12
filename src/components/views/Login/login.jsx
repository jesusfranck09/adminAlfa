import React from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { InputGroup, InputGroupAddon, InputGroupText,Input } from 'reactstrap';
import logo from '../../images/logotipo.png'
import diagnostico from '../../images/diagnostico.png'
import { AppNavbarBrand } from '@coreui/react';
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBAnimation,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBNavItem,
  MDBNavLink
} from "mdbreact";
import "./index.css";
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { DialogUtility } from '@syncfusion/ej2-popups';

const LOGIN = gql`
    mutation LOGIN($email: String!, $password: String!){
        login(email: $email, password: $password){
          activo
          message 
          token 
          id
        
        }
    }
`


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        
        }
      }
componentWillMount(){
  localStorage.removeItem('idAdmin') 
  localStorage.removeItem('idASuperusuario') 
      localStorage.removeItem('elToken') 
      localStorage.removeItem('nombre')
      localStorage.removeItem('apellidos') 
      localStorage.removeItem('rfc') 
      localStorage.removeItem('razonsocial') 
      localStorage.removeItem('usuario') 
      localStorage.removeItem('correo') 
      localStorage.removeItem('empleadoActivo') 
      localStorage.removeItem('DepartamentoActivo') 
      localStorage.removeItem('SucursalActiva') 
      localStorage.removeItem('PuestoActivo') 
      localStorage.removeItem("fechaRegistroSuperusuario")
      localStorage.removeItem("ok")
}      
handleInput = (e) => {
    const {id, value} = e.target
     this.setState({
        [id]:value
    });
  }

  handleForm = (e, login) => { 
    e.preventDefault();

    console.log('Enviando formulario...');
    login({variables: { 
        ...this.state
    }});
  }
  
  handleData = (data) => {


    console.log("data del dash" , data)
    if (data.login.token === 'no hay token' && data.login.message=="ningun dato"){
      DialogUtility.alert({
        animationSettings: { effect: 'Zoom' },           
        title: 'Por favor no deje espacios en blanco',
        position: "fixed",
    })
    setTimeout(() => {
      window.location.reload();
    }); 

  }
 if(data.login.token=='no hay token' && data.login.message=='usuario y contraseña incorrectos'){
    DialogUtility.alert({
      animationSettings: { effect: 'Zoom' },           
      title: 'USUARIO Y CONTRASEÑA INCORRECTOS',
      position: "fixed",
  })  
  setTimeout(() => {
    window.location.reload();
  }, 2000); 
  }
      console.log("esta es la data",data)


      if(data.login.message=='Login exitoso' && data.login.activo=="true"){
      localStorage.setItem('elToken', data.login.token)   
      localStorage.setItem('idASuperusuario', data.login.id) 
      DialogUtility.alert({
        animationSettings: { effect: 'Zoom' },           
        title: 'Sesión iniciada exitosamente!',
        position: "fixed",
    })

    this.props.history.push("/empresas")    
  }
  if(data.login.activo=='false'){

    DialogUtility.alert({
      animationSettings: { effect: 'Zoom' },           
      title: 'Su licencia ha Expirado',
      content: `Estimado cliente por el momento no puede iniciar sesión en el sistema de evaluaciones por favor contáctese con su Asesor de ADS para renovar su Suscripción`, 
     
      position: "fixed",
  })

  }
  }
  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.handleTogglerClick}
      />
    );
    return (
        <Mutation mutation={LOGIN}>
        {

    (login, {data, error}) => {
    if (data){
      this.handleData(data)
    } 
    return ( 
        <React.Fragment>
    <form onSubmit={e => this.handleForm(e, login)}>
      <div id="apppage">
        <Router>
          <div>
            <MDBNavbar
              color="primary-color"
              dark
              expand="md"
              fixed="top"
              scrolling
              transparent
            >
              <MDBContainer>
                <MDBNavbarBrand>
                <AppNavbarBrand
                    full={{ src: diagnostico, width: 140, height: 45, alt: 'DIAGNOSTICO' }} />
                  <strong className="white-text">Bienvenido</strong>
                </MDBNavbarBrand>
     
                <MDBNavbarToggler />
                <MDBCollapse >
                  <MDBNavbarNav left>
                    <MDBNavItem active>
                      <MDBNavLink to="#!">Home</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="#!">Link</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="#!">Profile</MDBNavLink>
                    </MDBNavItem>
                  </MDBNavbarNav>
                  {/* <MDBNavbarNav right>
                    <MDBNavItem>
                      <MDBFormInline waves>
                        <div className="md-form my-0">
                          <input
                            className="form-control mr-sm-2"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                          />
                        </div>
                      </MDBFormInline>
                    </MDBNavItem>
                  </MDBNavbarNav> */}
                </MDBCollapse>
              </MDBContainer>
            </MDBNavbar>
            {this.state.collapsed && overlay}
          </div>
        </Router>
        
        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
              <MDBRow>

                <MDBCol
                  md="6"
                  className="white-text text-center text-md-left mt-xl-5 mb-5"
                >
                </MDBCol>
                <MDBRow>
                <MDBCol md="6" className="mb-8">
                  <MDBAnimation type="fadeInRight" delay=".3s">
                    <MDBCard id="classic-card"  >
                      <MDBCardBody className="white-text">
                        <h3 className="text-center">
                             Ingresar:
                        </h3>
                        <hr className="hr-light" />

                        <InputGroup   className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><MDBIcon icon="user" /></InputGroupText>
                        </InputGroupAddon>
                        <Input id="email" onChange={this.handleInput} type="email"  placeholder="Correo" />
                      </InputGroup>
  

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <MDBIcon icon="lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="password" onChange={this.handleInput} type="password" placeholder="Contraseña"/>
                      </InputGroup>

                           
                      <MDBRow>
                        <MDBCol md="8">
                          <MDBBtn  color="success" className="px-4" type='submit'>Entrar</MDBBtn>
                        </MDBCol>
                      </MDBRow>
                    
                      </MDBCardBody>
                    

                    </MDBCard>
                    <strong>NORMA OFICIAL MEXICANA NOM-035-STPS-2018, FACTORES DE RIESGO PSICOSOCIAL EN EL
                      TRABAJO-IDENTIFICACIÓN, ANÁLISIS Y PREVENCIÓN</strong>
                  </MDBAnimation>
                </MDBCol>
                <MDBCol md="6" xl="5" className="mt-xl-5">
                  <MDBAnimation type="fadeInRight" delay=".3s">
                    <img
                      src="https://mdbootstrap.com/img/Mockups/Transparent/Small/admin-new.png"
                      alt=""
                      className="img-fluid"
                    />
                  </MDBAnimation>
                </MDBCol>
                </MDBRow>
              </MDBRow>          
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
      </form>
      </React.Fragment>
                 )
            }
        }
      </Mutation>
    );
  }
}

export default Login;