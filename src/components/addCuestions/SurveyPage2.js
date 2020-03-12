import React from 'react';
import { Form, Field } from 'react-final-form';
import {  Radio  } from 'final-form-material-ui';
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
import Navbar from './NavbarDatos'
import { API} from '../utils/http'

import { MDBBadge } from 'mdbreact';

import { MDBContainer,MDBTableBody,MDBTable,MDBTableHead} from 'mdbreact';

 

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     data:'',
    showModal2:false

    
    };
  }




  evaluar= (values) => {

    if( (values.pregunta3 == "si" || values.pregunta3=="no")&& (values.pregunta4 == "si" || values.pregunta4=="no")&& (values.pregunta5 == "si" || values.pregunta5=="no")
    && (values.pregunta6 == "si" || values.pregunta6=="no") && (values.pregunta7 == "si" || values.pregunta7=="no")&& (values.pregunta8 == "si" || values.pregunta8=="no")
    && (values.pregunta9 == "si" || values.pregunta9=="no")){
        
      const correo = localStorage.getItem('correoATS')
      const periodo = localStorage.getItem("Periodo")
      // const url = 'http://localhost:8000/graphql'
      axios({
        url:  API,
        method:'post',
        data:{
        query:`
         mutation{
          atsPage3(data:"${[values.pregunta3,values.pregunta4,values.pregunta5,values.pregunta6,values.pregunta7,values.pregunta8,values.pregunta9,correo,periodo]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              console.log("los datos son ",datos)
            }); 
      this.props.history.push("./page3")
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
      <div style={{marginTop:20}}>
        <MDBContainer style={container} className="text-center mt-2 pt-5">
    
        <div style={{ padding: 16, margin: 'auto', maxWidth: 1050 }}>
      {/* <CssBaseline /> */}
      <Form
        onSubmit={onSubmit}
        
        validate={validate}
        render={({ handleSubmit,values }) => (
          <form onSubmit={handleSubmit}>
           <Alert color="primary">Sección ATS <br></br>  INSTRUCCIONES: Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.</Alert>
            <Paper style={{ padding: 16 }}><Alert color="dark">III.- Esfuerzo por evitar circunstancias parecidas o asociadas al acontecimiento (durante el último mes).</Alert>


              <Grid container alignItems="flex-start" spacing={2} item xs={12}>
              <FormControl component="fieldset">
                   <RadioGroup >
              <MDBTable striped>
                 
                  <MDBTableHead>
                  <td><FormLabel component="legend"style={{ marginRight:200}}></FormLabel></td>
                  <td><MDBBadge color="ligth"style={{ fontSize:14 }}><strong>SI</strong></MDBBadge></td>
                  <td><MDBBadge color="ligth"style={{ fontSize:14 }}><strong>NO</strong></MDBBadge></td>
                 

                  </MDBTableHead>
                  <MDBTableBody>
                  
                    <tr>
                    
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>3.- ¿Se ha esforzado por evitar todo tipo de sentimientos, conversaciones o situaciones que le puedan recordar el acontecimiento?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta3" component={Radio} type="radio" value="si"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta3" component={Radio} type="radio" value="no"/>} /></td>
                 
                    </tr>
                   
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left" style={{ marginRight:200}}>4.-¿Se ha esforzado por evitar todo tipo de actividades, lugares o personas que motivan recuerdos del acontecimiento?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta4" component={Radio} type="radio" value="si"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta4" component={Radio} type="radio" value="no"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>5.-¿Ha tenido dificultad para recordar alguna parte importante del evento?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta5" component={Radio} type="radio" value="si"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta5" component={Radio} type="radio" value="no"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>6.-¿Ha disminuido su interés en sus actividades cotidianas?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta6" component={Radio} type="radio" value="si"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta6" component={Radio} type="radio" value="no"/>} /></td>
                    </tr>
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>7.-¿Se ha sentido usted alejado o distante de los demás?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta7" component={Radio} type="radio" value="si"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta7" component={Radio} type="radio" value="no"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>8.-¿Ha notado que tiene dificultad para expresar sus sentimientos?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta8" component={Radio} type="radio" value="si"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta8" component={Radio} type="radio" value="no"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>9.-¿Ha tenido la impresión de que su vida se va a acortar, que va a morir antes que otras personas o que tiene un futuro limitado?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta9" component={Radio} type="radio" value="si"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta9" component={Radio} type="radio" value="no"/>} /></td>
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


                  alert(vari)

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
