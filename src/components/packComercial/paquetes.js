
import React from 'react';
import { MDBBtn,MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol ,MDBRow} from 'mdbreact';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import axios from 'axios';
import logo from '../images/logotipo.png'
// import png from '../images/png.png'
import { Form, Field } from 'react-final-form';
import { TextField, Radio, Select } from 'final-form-material-ui';
// import {Alert } from 'reactstrap'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBMask,
  MDBView,

} from "mdbreact";
import {

	Grid,

	MenuItem,
  } from '@material-ui/core';
import { AppNavbarBrand } from '@coreui/react';
import { API} from '../utils/http'

const container = { width: 1500, height: 800 }

function onSubmit (values) {
};


const validate = values => {
    const errors = {};
    if (!values.Nombre) {
      errors.Nombre = 'Este campo es requerido';
    }
    if (!values.calle) {
      errors.calle = 'Este campo es requerido';
    }
    if (!values.NumExt) {
      errors.NumExt = 'Este campo es requerido';
    }
    if (!values.numInt) {
      errors.numInt = 'Este campo es requerido';
    }
    if (!values.colonia) {
      errors.colonia = 'Este campo es requerido';
    }
    if (!values.cp) {
      errors.cp = 'Este campo es requerido';
    }
    if (!values.city) {
      errors.city = 'Este campo es requerido';
    }
  
    if (!values.estado) {
      errors.estado = 'Required';
    }
    if (!values.RFC) {
        errors.RFC = 'Required';
      }
      if (!values.telefono) {
        errors.telefono = 'Required';
      }

    if (!values.actividades) {
        errors.actividades = 'Required';
      }
   
  
    return errors;
  };


class Paquetes extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          email: '',
          password: '',
      
      }
    }
 evaluar(values){
     console.log("values" , values.valor)
  localStorage.setItem("paquete" , values.valor)
    // const url = 'http://localhost:8000/graphql'
    axios({
      url:  API,
      method:'post',
      data:{
      query:`
      mutation{
              insertPack(data:"${[values.valor]}"){
              id
              }
            }
          `
      }
    })
    .then(datos => {	
      console.log("exito",datos.data.data.insertPack.id)
    localStorage.setItem("idRegistro" , datos.data.data.insertPack.id )
    this.props.history.push("/registro")
    }).catch(err=>{
      console.log("error",err.response)
    })
 }   
 send(values){
console.log("valor" , values)
 }

 
render(){
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

        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer style={{marginTop:60}}>
            <MDBCol>
                <Paper style={{marginTop:20}}>
              <MDBRow>    
              <MDBCol> 

              <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                  <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({ handleSubmit, submitting,values }) => (
                      <form onSubmit={handleSubmit}>
                   
                        <Paper style={{ padding: 16} }>
                          <Grid container alignItems="flex-start" spacing={2} >
                            
                            <Grid item xs={12}>
                              <Field
                                required
                                fullWidth
                                name="valor"
                                component={Select}
                                label="Seleccione el paquete - 1 RFC"
                                formControlProps={{ fullWidth: true }}
                              >
            
                              <MenuItem value= {1}>1 a 15 Empleados</MenuItem>
                              <MenuItem value={2}>16 a 50 Empleados</MenuItem>
                              <MenuItem value={3}>51 a 100 Empleados</MenuItem>
                              <MenuItem value={4}>101 a 200 Empleados</MenuItem>
                                </Field>
                                </Grid>

                            <Grid item style={{ marginTop: 16 ,marginLeft:160 }}>
                              <Button
                              variant="contained"
                                color="secondary"
                                type="submit"
                                disabled={submitting}
                                onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.evaluar(values)}}
                              >
                                aceptar
                              </Button>
                            </Grid>
                          </Grid>
                        </Paper>
                      
                      </form>
                    )}
                  />
                </div>            
              </MDBCol> 
              <MDBCol>
      
              <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                  <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({ handleSubmit, submitting,values }) => (
                      <form onSubmit={handleSubmit}>
                   
                        <Paper style={{ padding: 16} }>
                          <Grid container alignItems="flex-start" spacing={2} >
                            
                            <Grid item xs={12}>
                              <Field
                                required
                                fullWidth
                                name="valor"
                                component={Select}
                                label="Seleccione paquete - 3 RFC"
                                formControlProps={{ fullWidth: true }}
                              >
            
                              <MenuItem value= {5}>1 a 15 Empleados</MenuItem>
                              <MenuItem value={6}>16 a 50 Empleados</MenuItem>
                              <MenuItem value={7}>51 a 100 Empleados</MenuItem>
                              <MenuItem value={8}>101 a 200 Empleados</MenuItem>
                                </Field>
                                </Grid>
          
                            <Grid item style={{ marginTop: 16 ,marginLeft:160 }}>
                              <Button
                              variant="contained"
                                color="secondary"
                                type="submit"
                                disabled={submitting}
                                onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.evaluar(values)}}
                              >
                                aceptar
                              </Button>
                            </Grid>
                          </Grid>
                        </Paper>
                      
                      </form>
                    )}
                  />
                </div>
              </MDBCol>
              </MDBRow> 
              <MDBRow>
              <MDBCol>
              <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                  <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({ handleSubmit, submitting,values }) => (
                      <form onSubmit={handleSubmit}>
                   
                        <Paper style={{ padding: 16} }>
                          <Grid container alignItems="flex-start" spacing={2} >
                            
                            <Grid item xs={12}>
                              <Field
                                required
                                fullWidth
                                name="valor"
                                component={Select}
                                label="Seleccione el paquete - 5 RFC"
                                formControlProps={{ fullWidth: true }}
                              >
            
                              <MenuItem value= {9}>1 a 15 Empleados</MenuItem>
                              <MenuItem value={10}>16 a 50 Empleados</MenuItem>
                              <MenuItem value={11}>51 a 100 Empleados</MenuItem>
                              <MenuItem value={12}>101 a 200 Empleados</MenuItem>
                                </Field>
                                </Grid>
          
                            <Grid item style={{ marginTop: 16 ,marginLeft:160 }}>
                              <Button
                              variant="contained"
                                color="secondary"
                                type="submit"
                                disabled={submitting}
                                onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.evaluar(values)}}
                              >
                                aceptar
                              </Button>
                            </Grid>
                          </Grid>
                        </Paper>
                      
                      </form>
                    )}
                  />
                </div>
              </MDBCol>
              <MDBCol>
              <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                  <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({ handleSubmit, submitting,values }) => (
                      <form onSubmit={handleSubmit}>
                   
                        <Paper style={{ padding: 16} }>
                          <Grid container alignItems="flex-start" spacing={2} >
                            
                            <Grid item xs={12}>
                              <Field
                                required
                                fullWidth
                                name="valor"
                                component={Select}
                                label="Seleccione el paquete - 10 RFC"
                                formControlProps={{ fullWidth: true }}
                              >
            
                              <MenuItem value= {13}>1 a 15 Empleados</MenuItem>
                              <MenuItem value={14}>16 a 50 Empleados</MenuItem>
                              <MenuItem value={15}>51 a 100 Empleados</MenuItem>
                              <MenuItem value={16}>101 a 200 Empleados</MenuItem>
                                </Field>
                                </Grid>
          
                            <Grid item style={{ marginTop: 16 ,marginLeft:160 }}>
                              <Button
                              variant="contained"
                                color="secondary"
                                type="submit"
                                disabled={submitting}
                                onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.evaluar(values)}}
                              >
                                aceptar
                              </Button>
                            </Grid>
                          </Grid>
                        </Paper>
                      
                      </form>
                    )}
                  />
                </div>
              </MDBCol>
              </MDBRow>
              <MDBRow>
              <MDBCol>
              <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                  <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({ handleSubmit, submitting,values }) => (
                      <form onSubmit={handleSubmit}>
                   
                        <Paper style={{ padding: 16} }>
                          <Grid container alignItems="flex-start" spacing={2} >
                            
                            <Grid item xs={12}>
                              <Field
                                required
                                fullWidth
                                name="valor"
                                component={Select}
                                label="Seleccione el paquete - 20 RFC"
                                formControlProps={{ fullWidth: true }}
                              >
            
                              <MenuItem value= {17}>1 a 15 Empleados</MenuItem>
                              <MenuItem value={18}>16 a 50 Empleados</MenuItem>
                              <MenuItem value={19}>51 a 100 Empleados</MenuItem>
                              <MenuItem value={20}>101 a 200 Empleados</MenuItem>
                                </Field>
                                </Grid>
          
                            <Grid item style={{ marginTop: 16 ,marginLeft:160 }}>
                              <Button
                              variant="contained"
                                color="secondary"
                                type="submit"
                                disabled={submitting}
                                onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.evaluar(values)}}
                              >
                                aceptar
                              </Button>
                            </Grid>
                          </Grid>
                        </Paper>
                      </form>
                    )}
                  />
                </div>
              </MDBCol>
              <MDBCol>
                <MDBCol>
                <Button  startIcon={<ArrowBackIcon />} color="secondary" onClick={(e) =>this.props.history.push("/dashboardAdminAlfa")}>Cancelar</Button>
                </MDBCol>
              </MDBCol>
              </MDBRow>
              </Paper>
            </MDBCol>
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
    <MDBContainer style={container} className="text-center">
   
    </MDBContainer>
    </React.Fragment>
  )
}

}

export default Paquetes;