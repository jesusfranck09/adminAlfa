import React,{useState} from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Radio, Select } from 'final-form-material-ui';
import {
  Paper,
  Grid,
  Button,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import { Alert } from 'reactstrap';
import axios from 'axios';


import { MDBRow, MDBCol } from 'mdbreact';

import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink} from 'mdbreact';
import Sidebar from '../Home/sidebar'
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import '../Home/index.css'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     data:[],
     collapse: false,
     isOpen: false,
    
    };
    this.onClick = this.onClick.bind(this);
  }


  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }



  handleClick(values){

    

// var val =  JSON.parse(values)
// console.log(val.rotacion)
// if(val.rotacion=="si"){

// return(
// console.log("jlkjl")
// )
// }else if(val.rotacion=="no"){ 

  
// }


console.log("jlklkhklhkh",values.rotacion)


console.log("data" ,this.state.data)

  }


  onChange(values) {
    this.setState({ data: JSON.stringify(values, 0,2) })
  }
  

  render() {
    // const { children} = this.props;
    const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
    const container = { width: 2500, height: 1300 }
    return (


      <React.Fragment>
      <div>
          <header>
            <MDBNavbar className = "navbar" style={bgPink} dark expand="sm" scrolling fixed="top">
            <Sidebar/>
              <MDBNavbarBrand href="/inicio">
                <AppNavbarBrand
                  full={{ src: logo, width: 80, height: 25, alt: 'ADS' }} />               
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.onClick} />
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem active>
                    <MDBNavLink to="/employees">Cargar Empleados</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#">Beneficios</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#">Opciones</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink to="#">Mi Perfil</MDBNavLink>
                </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </header>
        <MDBContainer style={container} className="text-center mt-2 pt-5">
    
        <div style={{ padding: 16, margin: 'auto', maxWidth: 1050 }}>
      {/* <CssBaseline /> */}
      <Form
        onSubmit={onSubmit}
        
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine,values }) => (
          <form onSubmit={handleSubmit}>
           <Alert color="primary"> INSTRUCCIONES : Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.</Alert>
            <Paper style={{ padding: 16 }}><Alert color="secondary">I.- Acontecimiento traumático severo </Alert>


              <Grid container alignItems="flex-start" spacing={2} item xs={12}>
            
                    <Grid  item xs={12}>
                  <FormControl component="fieldset">
                    <RadioGroup row>
                      <MDBRow>
                      <FormLabel component="legend" className="text-center mt-3 ml-4">¿Ha presenciado o sufrido alguna vez, durante o con motivo del trabajo un acontecimiento como los siguientes?</FormLabel>
                        <MDBCol>
                        <FormLabel component="legend" className="text-center mt-3 ">1.- Accidente que tenga como consecuencia la muerte, la pérdida de un miembro o una lesión grave?</FormLabel>
                        <FormLabel component="legend" className="text-center mt-3 ml-4">2.-¿Asaltos , Actos violentos que derivaron en lesiones graves? </FormLabel>
                        <FormLabel component="legend" className="text-center mt-3 ml-4">3.-¿Secuestro,Amenazas o Cualquier otro que ponga en riesgo su vida o salud, y/o la de otras personas?</FormLabel>
                        
                        </MDBCol>
                       
                      <MDBCol className="text-center mt-5 ml-3">
                      <FormControlLabel  
                        label="Si"
                        control={
                          <Field
                          required
                            name="rotacion"
                            component={Radio}
                            type="radio"
                            value="si"

                          />
                        }
                      />
                      <FormControlLabel
                        label="No"
                        control={
                          <Field
                          required
                            name="rotacion"
                            component={Radio}
                            type="radio"
                            value="no"
                           

                          />
                        }
                      />

                      </MDBCol>
                      </MDBRow>

                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item style={{ marginTop: 16 }} spacing={2} item xs={12}>
                  <Button 
                   variant="contained"
                    color="primary"
                    onClick={this.handleClick(values)}
                    
                  >
                    Siguiente
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            
           {/* <pre>{JSON.stringify(values,1,2)}</pre>  */}
          </form>
        )}
      />
    </div>
  );
        </MDBContainer>
    
      </div>
      </React.Fragment>
    );
  }
}






function onSubmit (values) {
  // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  // await sleep(300);
const vari = JSON.stringify(values,1,2)


alert(vari)

//  const url = 'http://localhost:8000/graphql'
//   axios({
//     url:  url,
//     method:'post',
//     data:{
//     query:`
//      mutation{
//       registerSingleEmployee(data:$input){
//           message
//             }
//           }
//         `
//     }
//         }).then((datos) => {
//           console.log("los datos son ",datos)
//           alert("exito")
     
//           alert(vari)
     
        

//           // this.props.history.push("/inicio")
//         })
        
//         .catch((err) => {
//           alert("error")
    
//           alert(vari)
//           alert(vari.Nombre)
//           console.log("los datos son ",err.response)
        
//         })
// const url  = 'http://localhost:8000/graphql'
				
// 				const query =  `
// 				mutation {
// 					registerSingleEmployee(
// 						data:${vari}
// 					){
// 						message
// 					}
// 				}
// 				`;
// 				axios({
// 				url:  url,
// 				method: 'post',
// 				data: {
// 					query,
// 					variables: {
// 						data: `${vari}`
// 					}
// 				}
// 					}).then((result) => {
//             alert("exito")
     
//            alert(vari[0].Nombre)
// 					})
// 					 .catch((error) => {
//             alert("error")
//             alert(query)

// 					 console.log(".cartch" , error.response)
// 				});

};




const validate = values => {
  const errors = {};
  if (!values.Nombre) {
    errors.Nombre = 'Este campo es requerido';
  }
  if (!values.ApellidoP) {
    errors.ApellidoP = 'Este campo es requerido';
  }
  if (!values.ApellidoM) {
    errors.ApellidoM = 'Este campo es requerido';
  }
  if (!values.curp) {
    errors.curp = 'Este campo es requerido';
  }
  if (!values.rfc) {
    errors.rfc = 'Este campo es requerido';
  }
  if (!values.Correo) {
    errors.Correo = 'Este campo es requerido';
  }
  if (!values.cp) {
    errors.cp = 'Este campo es requerido';
  }

  if (!values.area) {
    errors.area = 'Required';
  }

 

  return errors;
};


// function App() {
//   return (
   
// }


export default Home;
