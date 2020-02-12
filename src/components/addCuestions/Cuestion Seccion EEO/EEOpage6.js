import React from 'react';
import { Form, Field } from 'react-final-form';
import {  Radio  } from 'final-form-material-ui';
import {
  Paper,
  Grid,
  Button,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import { Alert } from 'reactstrap';
import axios from 'axios';
import Navbar from '../NavbarDatos'

import { MDBRow, MDBCol, MDBBadge } from 'mdbreact';

import { MDBContainer,MDBTableBody,MDBTable,MDBTableHead,MDBCollapse} from 'mdbreact';

 

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     data:'',
    showModal2:false

    
    };
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

validate = values => {
    const errors = {};
    if (!values.pregunta23) {
      errors.pregunta23 = 'Este campo es requerido';
    }
    if (!values.pregunta24) {
      errors.pregunta24 = 'Este campo es requerido';
    }
    if (!values.pregunta25) {
      errors.pregunta25 = 'Este campo es requerido';
    }
    if (!values.pregunta26) {
      errors.pregunta26 = 'Este campo es requerido';
    }
    if (!values.pregunta27) {
      errors.pregunta27 = 'Este campo es requerido';
    }
    if (!values.pregunta28) {
      errors.pregunta28 = 'Este campo es requerido';
    }
    return errors;
  };

  evaluar= (values) => {

    if( (values.pregunta23 == "Siempre" || values.pregunta23=="CasiSiempre"|| values.pregunta23=="AlgunasVeces"|| values.pregunta23=="CasiNunca"|| values.pregunta23=="Nunca") 
    &&(values.pregunta24 == "Siempre" || values.pregunta24=="CasiSiempre"|| values.pregunta24=="AlgunasVeces"|| values.pregunta24=="CasiNunca"|| values.pregunta24=="Nunca") 
    && (values.pregunta25 == "Siempre" || values.pregunta25=="CasiSiempre"|| values.pregunta25=="AlgunasVeces"|| values.pregunta25=="CasiNunca"|| values.pregunta25=="Nunca")
    && (values.pregunta26 == "Siempre" || values.pregunta26=="CasiSiempre"|| values.pregunta26=="AlgunasVeces"|| values.pregunta26=="CasiNunca"|| values.pregunta26=="Nunca")
   &&(values.pregunta27 == "Siempre" || values.pregunta27=="CasiSiempre"|| values.pregunta27=="AlgunasVeces"|| values.pregunta27=="CasiNunca"|| values.pregunta27=="Nunca")
    && (values.pregunta28 == "Siempre" || values.pregunta28=="CasiSiempre"|| values.pregunta28=="AlgunasVeces"|| values.pregunta28=="CasiNunca"|| values.pregunta28=="Nunca")
    ){
      let pregunta23;
      let pregunta24;
      let pregunta25;
      let pregunta26;
      let pregunta27;
      let pregunta28;
      if(values.pregunta23=="Siempre"){
        pregunta23=0
      }else if(values.pregunta23=="CasiSiempre"){
        pregunta23=1
      }else if(values.pregunta23=="AlgunasVeces"){
        pregunta23=2
      }else if(values.pregunta23=="CasiNunca"){
        pregunta23=3
      }else if(values.pregunta23=="Nunca"){
        pregunta23=4
      }
      if(values.pregunta24=="Siempre"){
        pregunta24=0
      }else if(values.pregunta24=="CasiSiempre"){
        pregunta24=1
      }else if(values.pregunta24=="AlgunasVeces"){
        pregunta24=2
      }else if(values.pregunta24=="CasiNunca"){
        pregunta24=3
      }else if(values.pregunta24=="Nunca"){
        pregunta24=4
      }
      if(values.pregunta25=="Siempre"){
        pregunta25=0
      }else if(values.pregunta25=="CasiSiempre"){
        pregunta25=1
      }else if(values.pregunta25=="AlgunasVeces"){
        pregunta25=2
      }else if(values.pregunta25=="CasiNunca"){
        pregunta25=3
      }else if(values.pregunta25=="Nunca"){
        pregunta25=4
      }
      if(values.pregunta26=="Siempre"){
        pregunta26=0
      }else if(values.pregunta26=="CasiSiempre"){
        pregunta26=1
      }else if(values.pregunta26=="AlgunasVeces"){
        pregunta26=2
      }else if(values.pregunta26=="CasiNunca"){
        pregunta26=3
      }else if(values.pregunta26=="Nunca"){
        pregunta26=4
      }
      if(values.pregunta27=="Siempre"){
        pregunta27=0
      }else if(values.pregunta27=="CasiSiempre"){
        pregunta27=1
      }else if(values.pregunta27=="AlgunasVeces"){
        pregunta27=2
      }else if(values.pregunta27=="CasiNunca"){
        pregunta27=3
      }else if(values.pregunta27=="Nunca"){
        pregunta27=4
      }
      if(values.pregunta28=="Siempre"){
        pregunta28=0
      }else if(values.pregunta28=="CasiSiempre"){
        pregunta28=1
      }else if(values.pregunta28=="AlgunasVeces"){
        pregunta28=2
      }else if(values.pregunta28=="CasiNunca"){
        pregunta28=3
      }else if(values.pregunta28=="Nunca"){
        pregunta28=4
      }

      const correo   = localStorage.getItem("correoEEO")
      const periodo = localStorage.getItem("Periodo")
      const url = 'http://localhost:8000/graphql'
      axios({
        url:  url,
        method:'post',
        data:{
        query:`
         mutation{
          eeoPage6(data:"${[values.pregunta23,values.pregunta24,values.pregunta25,values.pregunta26,values.pregunta27,values.pregunta28,correo,periodo,pregunta23,pregunta24,pregunta25,pregunta26,pregunta27,pregunta28]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              console.log("los datos son ",datos)
            this.props.history.push("./EEOpage7")
            }); 
      }

  }


  componentWillMount(){
    setTimeout(() => { this.setState({showModal:false})},1500)
}


  handleClick(){
console.log("data" ,this.state.data)

  }


  render() {
    // const { children} = this.props;
    const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
    const container = { width: 2500, height: 1300 }
    return (
      <React.Fragment>
           <MDBContainer>
        <Navbar></Navbar>
        </MDBContainer> 
      <div style={{marginTop:50}}>
      <MDBContainer style={container} className="text-center  ">
    
        <div style={{ padding: 16, margin: 'auto', maxWidth: 1050 }}>
      {/* <CssBaseline /> */}
      <Form
        onSubmit={onSubmit}
        
        validate={this.validate}
        render={({ handleSubmit,values }) => (
          <form onSubmit={handleSubmit}>
           <Alert color="primary">Sección EEO<br></br>  INSTRUCCIONES: Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.</Alert>
            <Paper style={{ padding: 16 }}><Alert color="dark">VI. Decisiones que puede tomar en su trabajo.</Alert>
              <Grid container alignItems="flex-start" spacing={2} item xs={12}>
              <FormControl component="fieldset">
              <RadioGroup >
              <MDBTable striped>
                 
                  <MDBTableHead>
                  <td><FormLabel component="legend"style={{ marginRight:200}}></FormLabel></td>
                  <td><MDBBadge color="ligth">Siempre</MDBBadge></td>
                  <td><MDBBadge color="ligth">Casi Siempre</MDBBadge></td>
                  <td><MDBBadge color="ligth">Algunas Veces</MDBBadge></td>
                  <td><MDBBadge color="ligth">Casi Nunca</MDBBadge></td>
                  <td><MDBBadge color="ligth">Nunca</MDBBadge></td>

                  </MDBTableHead>
                  <MDBTableBody>
                  
                    <tr>
                    
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>23.- Mi trabajo permite que desarrolle nuevas habilidades</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta23" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta23" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta23" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta23" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta23" component={Radio} type="radio" value="Nunca"/>} /></td>
                 
                    </tr>
                   
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>24.- En mi trabajo puedo aspirar a un mejor puesto</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta24" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta24" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta24" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta24" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta24" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>25.- Durante mi jornada de trabajo puedo tomar pausas cuando las necesito</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta25" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta25" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta25" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta25" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta25" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr>
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>26.- Puedo decidir cuánto trabajo realizo durante la jornada laboral</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta26" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta26" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta26" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta26" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta26" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr>
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>27.- Puedo decidir la velocidad a la que realizo mis actividades en mi trabajo</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta27" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta27" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta27" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta27" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta27" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr>
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>28.- Puedo cambiar el orden de las actividades que realizo en mi trabajo </FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta28" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta28" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta28" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta28" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta28" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr>
                  </MDBTableBody>
                  
                </MDBTable>
                </RadioGroup>
                    </FormControl>
                <Grid item style={{ marginTop: 16 }} spacing={2} item xs={12}>
                <center>
                  <Button 
                   variant="contained"
                    color="primary"

                    onClick={(e) => this.evaluar(values)}
                   
                    type = "submit"
                  >
                    Siguiente
                  </Button>
                  </center>
                </Grid>
              </Grid>
            </Paper>
            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
          </form>
        )}
      />
    </div>
        </MDBContainer>
    
      </div>
      </React.Fragment>





    );


    
  }
}

                  function onSubmit (values) {
                  const vari = JSON.stringify(values,1,2)
                  };





                  // function App() {
                  //   return (
                    
                  // }


                  export default Home;
