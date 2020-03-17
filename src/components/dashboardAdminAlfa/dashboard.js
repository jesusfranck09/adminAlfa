import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import logo from '../images/logotipo.png'
import { AppNavbarBrand } from '@coreui/react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
	Grid,
	Button,
  } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import {MDBRow, MDBCol,MDBTable, MDBTableBody, MDBBtn } from 'mdbreact';
import Paper from '@material-ui/core/Paper';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { PDFExport } from '@progress/kendo-react-pdf';
import VerticalAlignBottomOutlinedIcon from '@material-ui/icons/VerticalAlignBottomOutlined';
import {Alert} from 'reactstrap'
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBMask,
  MDBView,
  MDBContainer,

} from "mdbreact";
import { Form, Field } from 'react-final-form';
import "../../index.css";
import { DialogUtility } from '@syncfusion/ej2-popups';
import axios from 'axios'
import { API} from '../utils/http'
import { TextField, Radio, Select } from 'final-form-material-ui';

function onSubmit (values) {
};

const validate = values => {
  const errors = {};
  if (!values.register) {
    errors.register = 'Este campo es requerido';
  }


  return errors;
};
class Das extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          AdminAlfa:[],
          register473:''
        }
      }
componentWillMount(){
  // const url = 'http://localhost:8000/graphql'
 var idAdminA = localStorage.getItem("idAdminAlfa")
  axios({
    url:  API,
    method:'post',
    data:{
    query:`
    query{
        getAdminAlfa(data:"${[idAdminA]}"){
          nombreAdmin
          apellidosAdmin
          correo
          fechaVenta
          rfc
          empresas
          empleados
          RazonSocial
          RFC
            }
        }
        `
    }
})
.then(datos => {	
  console.log("datos" , datos.data.data.getAdminAlfa[0])
  this.setState({AdminAlfa: datos.data.data.getAdminAlfa})
}).catch(err=>{
    console.log("este es el error" , err.response)
}) 
}  

logOut(){
  this.props.history.push("/")
   localStorage.removeItem("idAdminAlfa")
  localStorage.removeItem("elToken")
  DialogUtility.alert({
    animationSettings: { effect: 'Zoom' },           
    content: "Hasta Luego!",
    title: 'Aviso!',
    position: "fixed"
  });
}
register473(values){

if(values.register == 'administrador*alfa'){
  this.props.history.push("/register473")
}else{
  DialogUtility.alert({
    animationSettings: { effect: 'Fade' },           
    title:'Aviso',
    content: 'Clave incorrecta',
    position: "fixed",
  
  }
  )
  window.location.reload()
}
}
registrar(){
  this.props.history.push("/paquetes") 
}

  render() {
   let register473;
    if(this.state.register473=='1'){
      register473 =  <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <Form
        onSubmit={onSubmit}
        
        validate={validate}
        render={({ handleSubmit, submitting,values }) => (
          <form onSubmit={handleSubmit}>
          
                  <Field
                    fullWidth
                    required
                    name="register"
                    component={TextField}
                    type="password"
                    label="clave"
                    style={{marginBottom:10}}
                  />
                <Grid container alignItems="flex-start">
                  <Button
                   variant="outlined"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                    onClick={(e) =>this.register473(values)}
                  >
                   Aceptar
                  </Button>
                  </Grid>
          </form>
        )}
      />
    </div>
    }
    const container = { marginLeft:20}
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.handleTogglerClick}
      />
    );
    return (
     

        <React.Fragment>
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
                  full={{ src: logo, width: 89, height: 25, alt: 'ADS' }} />
                  <strong className="white-text">Bienvenido</strong>
                </MDBNavbarBrand>

              </MDBContainer>
            </MDBNavbar>
            {this.state.collapsed && overlay}
          </div>
        </Router>
        
        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer style={{marginTop:60}}>
            <Card >
            <CardActionArea>
       
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Vista General 
                </Typography>
              
              
              </CardContent>
            </CardActionArea>
          <MDBContainer > <Alert className ="mt-4" color ="primary ">Movimientos Realizados por {this.state.AdminAlfa.nombreAdmin}</Alert>

       
        <React.Fragment>
        <section className="flex-column"  >
        <div>     <MDBRow>
                  <MDBCol> 
                  <Button outline startIcon={<VerticalAlignBottomOutlinedIcon />} color="success" className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
                      Descargar Movimientos
                  </Button>
                  </MDBCol> 
                  <MDBCol>  
                  <Button  startIcon={<DoneOutlineIcon />} color="primary" onClick={(e) => { if (window.confirm('¿Desea Registrar?')) this.registrar()} }>
                  Registrar Paquetes
                  </Button>
                  </MDBCol>
                  <MDBCol>
                  <Button startIcon={<CloseOutlinedIcon />}  color="secondary"    onClick={(e) => { if (window.confirm('¿Desea Salir?')) this.logOut()} }>
                  Salir
                  </Button> 
                  </MDBCol>
                  <MDBCol>                  
                  <Button  startIcon={<DoneOutlineIcon />} color="primary" onClick={(e) => this.setState({register473:'1'}) }>
                    Register 473
                  </Button>
                  {register473}
                  </MDBCol>
                  
                  </MDBRow>
        </div>
        <br/>
        <PDFExport
                  scale={0.7}
                  paperSize="A4"
                  margin="2cm"
                  ref={(component) => this.pdfExportComponent = component}
              >
        

        <MDBContainer style={container}>
        <font face="arial"  >  <img style={{marginLeft:20}} ref={(image) => this.image = image} src="http://www.ads.com.mx/_Media/logotipo_ads_png_med.png" width="100px"
              /></font>
         <Paper>
        <MDBTable component={Paper}  small borderless className="text-left mt-4 ">

        
          {this.state.AdminAlfa.map(rows=>{
            return(
              
              <MDBTableBody>                  
                        <tr>
                        <td>  
                        </td>
                        <td ></td>
                        <td ></td>
                      </tr>
                      <tr>
                      <td></td>
                      <td ></td>
                      <td ></td>
                      </tr>
                      <tr>
                      <td ><strong>Administrador : {rows.nombreAdmin} {rows.apellidosAdmin} </strong> </td><strong>Correo :{rows.correo} </strong><td></td>
                      <td ></td>
                      <td ></td>
                      </tr>


                      <tr>
                      <td ><strong>Paquete Empleados : {rows.empleados}</strong></td>
                      <td ><strong> Empresas :  {rows.empresas}</strong></td>
                      <td ></td>
                      </tr>
                      <tr>
                      <td ><strong>Vendido a : {rows.RazonSocial}</strong></td>
                      <td > <strong>RFC :  {rows.RFC}</strong></td>
                      <td ></td>
                      </tr>
                      <tr>
                      <td ><strong>Fecha de Venta : {rows.fechaVenta}</strong></td>
                      <td ></td>
                      <td ></td>
            
                      </tr>
              </MDBTableBody>
     
            
            )

          })}               

  
        </MDBTable>
        </Paper> 
        </MDBContainer>
        
       
         </PDFExport>
        </section>
      </React.Fragment>

      </MDBContainer>
          </Card>
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
    </React.Fragment>
    
    );
  }
}

export default Das;