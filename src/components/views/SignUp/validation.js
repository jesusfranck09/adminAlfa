
import React from 'react'
import {MDBBtn,MDBCard,MDBCardBody,MDBCardHeader,MDBCardFooter} from 'mdbreact';
import {Form,Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import {
	Grid,
  } from '@material-ui/core';

  import Navbar from '../../dashboardAdminAlfa/Navbar'


  function onSubmit (values) {
  };
    class Validacion extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
         
          };
        }


    ingresar(values){
        console.log("values" , values)
        if(values.contraseña == "registerAdmin473"){
           this.props.history.push("/register473")     
        }else if(!values.contraseña){
            alert("Por favor ingrese algun valor")
        }else{
            alert("Contraseña incorrecta")
        }
    }    

     render() {    
  
          return (
            <React.Fragment>
            <Navbar/>    
            <div style={{marginTop:"2%"}}>
             <center>   
             <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit, submitting,values }) => (
                      <form onSubmit={handleSubmit}>
                       
                          <MDBCard>
                          <MDBCardHeader>
                          <i>Ingrese la contraseña</i> 
                          </MDBCardHeader>
                          <MDBCardBody>
                          <Grid container alignItems="flex-start" spacing={2} >
                            <Grid item xs={12}>
                              <Field
                                fullWidth
                                required
                                name="contraseña"
                                component={TextField}
                                type="password"
                                label="Clave de acceso"
                              />
                            </Grid>                              
                              <MDBBtn
                                style={{marginTop:"10%", marginLeft:"22%"}}
                                color="danger"
                                size="md"
                                type="submit"
                                disabled={submitting}
                                onClick={(e) =>this.ingresar(values)}
                              >
                                Ingresar 
                              </MDBBtn>
                          </Grid>
                          </MDBCardBody>
                          <MDBCardFooter>
                            <i>Los administradores de Diagnóstico035 tienen la facilidad de ingresar al módulo de ventas y registrar los diferentes paquetes que ofrece el sistema, así como visualizar el comportamiento del mismo.</i>
                          </MDBCardFooter>  
                          </MDBCard>
                      
                      </form>
                    )}
                  />
                </center>  
                  </div>
            </React.Fragment>
          );
        }
      }
      export default Validacion