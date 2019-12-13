import React from 'react';
import { Form, Field } from 'react-final-form';
import {  Radio} from 'final-form-material-ui';
import {
  Paper,
  Grid,
  Button,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import { Alert } from 'reactstrap';
import axios from 'axios';
 

import { MDBRow, MDBCol} from 'mdbreact';

import { MDBContainer} from 'mdbreact';

 
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     data:'',
 

    
    };
  }

  evaluar= (values) => {
    console.log("los values son" , values)
    if(values.rotacion === 'si'){

      const correo = localStorage.getItem('correo')

      const url = 'http://localhost:8000/graphql'
      axios({
        url:  url,
        method:'post',
        data:{
        query:`
         mutation{
          rpValidadorPage7(data:"${[values.rotacion,correo]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              console.log("los datos son ",datos)
            }); 
        this.props.history.push("./RPpage7")
    }
    
    if (values.rotacion === 'no') {

      const correo = localStorage.getItem('correoRP')

      const url = 'http://localhost:8000/graphql'
      axios({
        url:  url,
        method:'post',
        data:{
        query:`
         mutation{
          rpValidadorPage7(data:"${[values.rotacion,correo]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              console.log("los datos son ",datos)
            }); 
        this.props.history.push("./RPValidate8")   
       }
  }


  componentWillMount(){
    setTimeout(() => { this.setState({showModal:false})},1500)
}


  handleClick(){

    

// var val =  JSON.parse(values)
// console.log(val.rotacion)
// if(val.rotacion=="si"){

// return(
// console.log("jlkjl")
// )
// }else if(val.rotacion=="no"){ 

  
// }
 

console.log("data" ,this.state.data)

  }


  render() {
    // const { children} = this.props;
    const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
    const container = { width: 2500, height: 1300 }
    return (


      <React.Fragment>
      <div>
     
        <MDBContainer style={container} className="text-center mt-2 pt-5">
    
        <div style={{ padding: 16, margin: 'auto', maxWidth: 1050 }}>
      {/* <CssBaseline /> */}
      <Form
        onSubmit={onSubmit}
        
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine,values }) => (
          <form onSubmit={handleSubmit}>
           <Alert color="primary"> Sección RP <br></br> INSTRUCCIONES : Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.</Alert>
            <Paper style={{ padding: 16 }}><Alert color="secondary">VII.¿ En mi trabajo debo brindar servicio a clientes o usuarios?</Alert>


              <Grid container alignItems="flex-start" spacing={2} item xs={12}>
            
                    <Grid  item xs={12}>
                  <FormControl component="fieldset">
                    <RadioGroup row>
                      <MDBRow>
                       
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
