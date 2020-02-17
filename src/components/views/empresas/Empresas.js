import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import logo from '../../images/logotipo.png'
import { AppNavbarBrand } from '@coreui/react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
	Paper,
	Grid,
	MenuItem,Button
  } from '@material-ui/core';

//   import { MDBModal, MDBModalBody, MDBModalHeader, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

  import { MDBCardTitle,MDBCardHeader } from 'mdbreact';
  
  import { Form, Field } from 'react-final-form';
  import {Alert} from 'reactstrap';
  import {  Select, TextField} from 'final-form-material-ui';
  import axios from 'axios'
  import { DialogUtility } from '@syncfusion/ej2-popups';


import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBView,
  MDBContainer,
  MDBAnimation,
  MDBCard,
  MDBCardBody,

} from "mdbreact";
import "../../Home/index.css";



class Validation1 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            registro:'',
            empresa:[],
            dias:'',
            horas:'',
            minutos:'',
            segundos:'',
            licencia:'',
        }
      }
      onSubmit (values) {
		const vari = JSON.stringify(values,1,2)
        };
        componentWillMount(){
            var idASuperusuario = localStorage.getItem("idASuperusuario")    

            const url = 'http://localhost:8000/graphql'
            axios({
              url:  url,
              method:'post',
              data:{
              query:`
               query{
                getAdminFechaRegistro(data:"${[idASuperusuario]}"){
                fechaRegistro
                      }
                    }
                  `
              }
                  }).then((datos) => {
                  console.log("Registro",datos.data.data.getAdminFechaRegistro.fechaRegistro)
                  
                  var part1=datos.data.data.getAdminFechaRegistro.fechaRegistro.substring(5,11)
                  var part2=datos.data.data.getAdminFechaRegistro.fechaRegistro.substring(16,29)
                  this.countdown(part1 + " 2021 " + part2)
                  })


		
                    axios({
                    url:  url,
                    method:'post',
                    data:{
                    query:`
                    query{
                        getEmpresas(data:"${[idASuperusuario]}"){
                            id
                            nombre
                            Apellidos
                            RFC
                            RazonSocial
                            correo
                            }
                        }
                        `
                    }
                })
                .then(datos => {	
                this.setState({empresa:datos.data.data.getEmpresas})	
                    console.log("deptosExtraidas" , datos)
                }).catch(err=>{
                    console.log("este es el error get deptos" , err.response)
                }) 
        }
        
        
        evaluar  = (values) =>{
            
        console.log("evaluar" , values) 
        var idAdmin  =localStorage.getItem("idASuperusuario")       
        const nombre= values.Nombre
        const apellidos= values.Apellidos
        const rfc = values.rfc
        const RazonSocial = values.RazonSocial
        const correo = values.correo  
        const url = 'http://localhost:8000/graphql'
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
          mutation{
            addAdminEmpresa(data:"${[nombre,apellidos,rfc,RazonSocial,correo,idAdmin]}"){
              message 
            
                }
              }
              `
          }
              }).then((datos) => {
               if(datos.data.data.addAdminEmpresa.message=="admin Registrado"){
                DialogUtility.alert({
                    animationSettings: { effect: 'Zoom' },           
                    content: "Empresa Registrada",
                    title: 'Aviso!',
                    position: "fixed"
                  });
                  let periodo = "Periodo Inicial"
                  const url = 'http://localhost:8000/graphql'
                  axios({
                    url:  url,
                    method:'post',
                    data:{
                    query:`
                     mutation{
                      addPeriodoInicial(data:"${[periodo]}"){
                          message
                            }
                          }
                        `
                    }
                  })
                  .then(datos => {	
                
                  })
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);   

               }
               else if(datos.data.data.addAdminEmpresa.message=="rfc duplicado"){
                DialogUtility.alert({
                    animationSettings: { effect: 'Zoom' },           
                    content: "El rfc ya se encuentra registrado por favor ingrese uno diferente ",
                    title: 'Aviso!',
                    position: "fixed"
                  });
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);     
               }
                // this.props.history.push("/inicio")
              })

              .catch((error) => {
          
                //console.log("errores" ,error.response.data.errors[0].message)
                console.log(".cartch" , error.response)
            });
        }

        entrar  = (values) => {
         console.log("values", values.empresa)
            const url = 'http://localhost:8000/graphql'
            axios({
            url:  url,
            method:'post',
            data:{
            query:`
            query{
                getAdminDashboard(data:"${[values.empresa]}"){
                    id
                    nombre
                    Apellidos
                    RFC
                    RazonSocial
                    correo
                    Activo
                    fechaRegistro
                    }
                }
                `
            }
        })
        .then(datos => {	
      	
             console.log("deptosExtraidas" , datos.data.data.getAdminDashboard)
             if(datos.data.data.getAdminDashboard){
                localStorage.setItem('nombre', datos.data.data.getAdminDashboard.nombre)
                localStorage.setItem('apellidos', datos.data.data.getAdminDashboard.Apellidos) 
                localStorage.setItem('rfc',datos.data.data.getAdminDashboard.RFC) 
                localStorage.setItem('razonsocial', datos.data.data.getAdminDashboard.RazonSocial) 
                localStorage.setItem('correo', datos.data.data.getAdminDashboard.correo)
                localStorage.setItem('idAdmin', datos.data.data.getAdminDashboard.id) 
                this.props.history.push("./inicio")
                DialogUtility.alert({
                    animationSettings: { effect: 'Zoom' },           
                    title: 'Inicio Exitoso!',
                    content:`Bienvenido ${datos.data.data.getAdminDashboard.nombre}  ${datos.data.data.getAdminDashboard.Apellidos}`,
                    position: "fixed",
                })
            }


             
        }).catch(err=>{
            console.log("este es el error get deptos" , err.response)
        })}

        countdown = (deadline) => {


            const timerUpdate = setInterval( () => {
              const licencia ="su licencia ha caducado"
              let t = this.getRemainingTime(deadline);
             this.setState ({dias:t.remainDays})
             this.setState ({horas:t.remainHours})
             this.setState ({minutos:t.remainMinutes})
             this.setState ({segundos:t.remainSeconds})
             this.setState({licencia:licencia})
              if(t.remainTime <= 1) {
                clearInterval(timerUpdate);
                const correo   = localStorage.getItem('idASuperusuario')
                console.log("entro")
                const url = 'http://localhost:8000/graphql'
                axios({
                  url:  url,
                  method:'post',
                  data:{
                  query:`
                   mutation{
                    inactiveAdmin(data:"${[correo]}"){
                        message
                          }
                        }
                      `
                  }
                      }).then((datos) => {
                     
                      }); 
              }else {
              this.setState({licencia:""})
          
              }
          
            }, 1000)
          };
          
          getRemainingTime = deadline => {
            let now = new Date(),
                remainTime = (new Date(deadline) - now + 1000) / 1000,
                remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
                remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
                remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
                remainDays = Math.floor(remainTime / (3600 * 24));
          
            return {
              remainSeconds,
              remainMinutes,
              remainHours,
              remainDays,
              remainTime
            }
          };
          
    

getRemainingTime = deadline => {
  let now = new Date(),
      remainTime = (new Date(deadline) - now + 1000) / 1000,
      remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
      remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
      remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
      remainDays = Math.floor(remainTime / (3600 * 24));

  return {
    remainSeconds,
    remainMinutes,
    remainHours,
    remainDays,
    remainTime
  }
};
  render() {
      
    let expiro;
    if(this.state.licencia){

      expiro = <Alert color="danger" className="text-center ">{this.state.licencia}</Alert>

    }
    let registro;  
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.handleTogglerClick}
      />
    );
    if(this.state.registro=="1"){
        registro= <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
		<Form
		  onSubmit={this.onSubmit}
		  
		  validate={this.validate}
		  render={({ handleSubmit, submitting,values }) => (
			<form onSubmit={handleSubmit}>
			  <Paper style={{ padding: 16 }}>
				<Grid container alignItems="flex-start" spacing={2}>
				  <Grid item xs={6}>
					<Field
					  fullWidth
					  required
					  name="Nombre"
					  component={TextField}
					  type="text"
					  label="Nombre/Representante"
					/>
				  </Grid>
  
				  <Grid item xs={6}>
					<Field
					  fullWidth
					  required
					  name="Apellidos"
					  component={TextField}
					  type="text"
					  label="Apellidos"
					/>
				  </Grid>
  
			
				  <Grid item xs={6}>
					<Field
					
					  fullWidth
					  required
					  name="rfc"
					  component={TextField}
					  type="text"
					  label="RFC / Empresa"
					/>
				  </Grid>
  
				  <Grid item xs={6}>
					<Field
					  fullWidth
					  required
					  name="RazonSocial"
					  component={TextField}
					  type="text"
					  label="Razón Social"
					/>
				  </Grid>
                  
				  <Grid item xs={6}>
					<Field
					  fullWidth
					  required
					  name="correo"
					  component={TextField}
					  type="email"
					  label="Correo"
					/>
				  </Grid>
                 
				  <Grid item style={{ marginTop: 16 ,marginLeft:100 }}>
					<Button
					 variant="outlined"
					  color="secondary"
					  type="submit"
					  disabled={submitting}
					  onClick={(e) =>this.evaluar(values)}
					>
					  Registrar Empresa
					</Button>
				  </Grid>
				</Grid>
			  </Paper>
			 
			</form>
		  )}
		/>
	  </div>

    }

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
                  <strong className="white-text">Empresas</strong>
                </MDBNavbarBrand>
     
              </MDBContainer>
            </MDBNavbar>
            {this.state.collapsed && overlay}
          </div>
        </Router>
        
        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
              <MDBRow>
               
              
                <MDBCol md="6" className="mb-8 mt-xl-5 pt-5" >
                  <MDBAnimation type="fadeInRight" delay=".3s">
                    <MDBCard id="classic-card" style={{marginTop:18}} >
                      <MDBCardBody className="white-text">
                        <h3 className="text-center">
                             Por favor Seleccione su Empresa
                        </h3>
                        <hr className="hr-light" />


                        <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                            <Form
                            onSubmit={this.onSubmit}
                            
                            validate={this.validate}
                            render={({ handleSubmit, submitting,values }) => (
                                <form onSubmit={handleSubmit}>
                                <Paper style={{ padding: 16 }}>
                                    <Grid container alignItems="flex-start" spacing={2}>
                                    
                                        <Grid item xs={12}>
                                        <Field
                                        fullWidth
                                        name="empresa"
                                        component={Select}
                                        label="Empresa"
                                        formControlProps={{ fullWidth: true }}
                                                                >
                                                {this.state.empresa.map(row=>{
                                                return(<MenuItem value={row.id}>{row.RazonSocial}</MenuItem>)
                                            })}
                                        </Field>
                                        </Grid>  
                                        

                                        <Grid item style={{ marginTop: 16  }}>
                                         <MDBRow>
                                         <MDBCol>
                                        <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={submitting}
                                        onClick={(e) =>this.entrar(values)}
                                        >
                                            Entrar
                                        </Button>
                                        </MDBCol>   
                                        <MDBCol>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<AddCircleOutlineIcon />}
                                            onClick={e=>this.setState({registro:"1"})}
                                          
                                        >
                                            Agregar
                                        </Button>
                                        </MDBCol>
                                        <MDBCol>  <Button
                                        variant="contained"
                                        color="default"
                                        type="submit"
                                        onClick={(e) =>this.props.history.push("./login")}
                                        >
                                            Salir
                                        </Button></MDBCol>
                                        </MDBRow>   
				                        </Grid>   
                                    </Grid>
                                </Paper>                             
                                </form>
                            )}
                            />
                        </div>                   
                      </MDBCardBody>                
                    </MDBCard>
                  </MDBAnimation>
                </MDBCol>
                <MDBCol md="8" xl="5" className="mt-xl-5  pt-5">
                                      
                    {registro}
                  {/* <MDBAnimation type="fadeInRight" delay=".3s">
                    <img
                      src="https://mdbootstrap.com/img/Mockups/Transparent/Small/admin-new.png"
                      alt=""
                      className="img-fluid"
                    />
                  </MDBAnimation> */}
                </MDBCol>
                </MDBRow>
                <MDBCard style={{ width: "22rem" ,marginTop:60,marginLeft:100}}>
                <MDBCardBody>        
                <MDBCardTitle>Su Licencia caduca en :</MDBCardTitle>
                <MDBCardHeader>{this.state.dias} Dias  {this.state.horas} horas {this.state.minutos} minutos {this.state.segundos} segundos
                <br/>
                <br/>
                <strong>Licencia de 1-15 Usuarios</strong>
                <br/>
                <br/>      
         
         </MDBCardHeader>      
         
        {expiro}
       </MDBCardBody>
      </MDBCard >
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>

      </React.Fragment>
                 )
  
 
    
  }
}

export default Validation1;