import React from 'react'
import {
	Paper,
	Grid,
	Button
  } from '@material-ui/core';
//   import diagnostico from '../images/diagnostico.png'
  import { API} from '../../utils/http'

import axios from 'axios';
import {Alert } from 'reactstrap'
import {MDBRow,MDBContainer} from 'mdbreact';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { DialogUtility } from '@syncfusion/ej2-popups';

 function onSubmit (values) {
	};
  
	const validate = values => {
        const errors = {};
        if (!values.Nombre) {
          errors.Nombre = 'Este campo es requerido';
        }
        if (!values.Apellidos) {
          errors.Apellidos = 'Este campo es requerido';
        }
        if (!values.RazonSocial) {
          errors.RazonSocial = 'Este campo es requerido';
        }
        if (!values.telefono) {
          errors.telefono = 'Este campo es requerido';
        }
        if (!values.correo) {
          errors.correo = 'Este campo es requerido';
        }
        if (!values.contraseña) {
          errors.contraseña = 'Este campo es requerido';
        }
        if (!values.rfc) {
            errors.rfc = 'Este campo es requerido';
          }
        	
		if(values.rfc){
			if(values.rfc.length < 12 || values.rfc.length > 13){
				errors.rfc = 'El número de caracteres no es el correcto';
			}
		}
      
        return errors;
      };

      class Sucursales extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            collapse: false,
            datos:[],
        
          };
        }

        onClick() {
          this.setState({
            collapse: !this.state.collapse,
          });
        }

        evaluar  = (values) =>{

          const Nombre = values.Nombre
          const Apellidos = values.Apellidos
          const rfc = values.rfc.replace(/,/g, "");  
          const RazonSocial = values.RazonSocial.replace(/,/g, "");
          const telefono = values.telefono  
          const correo = values.correo
          const contraseña =  values.contraseña

          const paquete  = localStorage.getItem("paquete")
          const correoAdminAlfa  = localStorage.getItem("correoAdminAlfa")
          const idAdminAlfa = localStorage.getItem("idAdminAlfa")
          const id = localStorage.getItem("idRegistro")
          var date= new Date()
          var fecha = date.toLocaleString('es')
  
          if(Nombre && Apellidos && RazonSocial && correo && contraseña && rfc  ){
            //   const url = 'http://localhost:8000/graphql'
              axios({
                url:  API,
                method:'post',
                data:{
                query:`
                 mutation{
                    registroSuperUser(data:"${[Nombre,Apellidos,rfc,RazonSocial,telefono,correo,contraseña,id,idAdminAlfa,fecha,paquete,correoAdminAlfa]}"){
                  
                      message
                      token
                        }
                      }
                  `
                }
              })
              .then(datos => {	
                if(datos.data.data.registroSuperUser.message=='duplicado'){
                    DialogUtility.alert({
                      animationSettings: { effect: 'Zoom' },           
                      content: "El RFC y/o correo electrónico ya han sido registrados con Anterioridad",
                      title: 'Aviso!',
                      position: "fixed"
                    });
                }else if(datos.data.data.registroSuperUser.message=="Signup exitoso"){
                    DialogUtility.alert({
                      animationSettings: { effect: 'Zoom' },           
                      content: "Registro Exitoso!",
                      title: 'Aviso!',
                      position: "fixed"
                    });
                    localStorage.removeItem("idRegistro")
                    // this.props.history.push('/dashboardAdminAlfa');
                  } 
              }).catch(err=>{
                  console.log("error" , err.response)
              })       
          } 
        }
        
        render() {    
          // const { children} = this.props;
          const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
          const container = { width: 2500, height: 1300 }
          return (
            <React.Fragment>
            <div>
                
                <MDBContainer style={{marginTop:40}}>
                 <MDBRow>
                   
                 <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                 <Paper>
                  <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({ handleSubmit, submitting,values }) => (
                      <form onSubmit={handleSubmit}>
                      <Alert color="primary">Formulario de registro</Alert>
                        <Paper style={{ padding: 16} }>
                          <Grid container alignItems="flex-start" spacing={2} >
                            <Grid item xs={6}>
                              <Field
                                fullWidth
                                required
                                name="Nombre"
                                component={TextField}
                                type="text"
                                label="Nombre del cliente"
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
                            <Grid item xs={12}>
                            <Alert style={{marginTop:20}} color="danger">Por favor complete todos los campos </Alert>
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
                                name="rfc"
                                component={TextField}
                                type="text"
                                label="RFC"
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Field
                                fullWidth
                                required
                                name="telefono"
                                component={TextField}
                                type="number"
                                label="Teléfono"
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
                            <Grid item xs={6}>
                              <Field
                              required
                                fullWidth
                                name="contraseña"
                                component={TextField}
                                label="Contraseña"
                                type = "password"
                              />     
                                                
                            </Grid>
                            
                            <Grid item style={{ marginTop: 16 ,marginLeft:200 }}>
                              <Button
                              variant="contained"
                                color="secondary"
                                type="submit"
                                disabled={submitting}
                                onClick={(e) =>this.evaluar(values)}
                              >
                                Registrar 
                              </Button>
                            </Grid>
                          </Grid>
                        </Paper>
                      
                      </form>
                    )}
                  />
                   </Paper>
                </div>
                 
                </MDBRow>   
                </MDBContainer>
            </div>
            </React.Fragment>
          );
        }
      }
      export default Sucursales