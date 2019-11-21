
import React from 'react';
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

// import axios from 'axios';

import { MDBRow, MDBCol } from 'mdbreact';

function onSubmit (values) {
  // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  // await sleep(300);

 
  alert ( JSON.stringify(values, 0, 2))

  console.log("hola prros" )


//  const url = 'http://localhost:8000/graphql'
//   axios({
//     url:  url,
//     method:'post',
//     data:{
//     query:`
//      mutation{
//       registerSingleEmployee(data:"${resultados}"){
//           message
//             }
//           }
//         `
//     }
//         }).then((datos) => {
//           console.log("los datos son ",datos)
//           alert("Registro Exitoso");
//           // this.props.history.push("/inicio")
//         })
        
//         .catch((err) => {
//           console.log("los datos son ",err.response)
        
//         })


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

function App() {
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      {/* <CssBaseline /> */}
      <Form
        onSubmit={onSubmit}
        initialValues={{ employed: true, stooge: 'sexo',estadoC: 'estadoC',rotacion : 'rotacion' }}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine,values }) => (
          <form onSubmit={handleSubmit}>
           <Alert color="primary">Datos Personales del Colaborador</Alert>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="Nombre"
                    component={TextField}
                    type="text"
                    label="Nombre"
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="ApellidoP"
                    component={TextField}
                    type="text"
                    label="Apellido Paterno"
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="ApellidoM"
                    component={TextField}
                    type="text"
                    label="Apelllido Materno"
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                  
                    fullWidth
                    required
                    name="curp"
                    component={TextField}
                    type="text"
                    label="CURP"
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
                    required
                    fullWidth
                    name="fechaN"
                    component={Select}
                    label="Año de Nacimiento"
                    formControlProps={{ fullWidth: true }}
                  >
                    <MenuItem value="1950">1950</MenuItem>
                    <MenuItem value="1951">1951</MenuItem>
                    <MenuItem value="1952">1952</MenuItem>
                    <MenuItem value="1953">1953</MenuItem>
                    <MenuItem value="1954">1954</MenuItem>
                    <MenuItem value="1955">1955</MenuItem>
                    <MenuItem value="1956">1956</MenuItem>
                    <MenuItem value="1957">1957</MenuItem>
                    <MenuItem value="1958">1958</MenuItem>
                    <MenuItem value="1959">1959</MenuItem>
                    <MenuItem value="1960">1960</MenuItem>
                    <MenuItem value="1961">1961</MenuItem>
                    <MenuItem value="1962">1962</MenuItem>
                    <MenuItem value="1963">1963</MenuItem>
                    <MenuItem value="1964">1964</MenuItem>
                    <MenuItem value="1965">1965</MenuItem>
                    <MenuItem value="1966">1966</MenuItem>
                    <MenuItem value="1967">1967</MenuItem>
                    <MenuItem value="1968">1968</MenuItem>
                    <MenuItem value="1969">1969</MenuItem>
                    <MenuItem value="1970">1970</MenuItem>
                    <MenuItem value="1971">1971</MenuItem>
                    <MenuItem value="1972">1972</MenuItem>
                    <MenuItem value="1973">1973</MenuItem>
                    <MenuItem value="1974">1973</MenuItem>
                    <MenuItem value="1975">1975</MenuItem>
                    <MenuItem value="1976">1976</MenuItem>
                    <MenuItem value="1977">1977</MenuItem>
                    <MenuItem value="1979">1979</MenuItem>
                    <MenuItem value="1980">1980</MenuItem>
                    <MenuItem value="1981">1981</MenuItem>
                    <MenuItem value="1982">1982</MenuItem>
                    <MenuItem value="1983">1983</MenuItem>
                    <MenuItem value="1984">1984</MenuItem>
                    <MenuItem value="1985">1985</MenuItem>
                    <MenuItem value="1986">1986</MenuItem>
                    <MenuItem value="1987">1987</MenuItem>
                    <MenuItem value="1988">1988</MenuItem>
                    <MenuItem value="1989">1989</MenuItem>
                    <MenuItem value="1990">1990</MenuItem>
                    <MenuItem value="1991">1991</MenuItem>
                    <MenuItem value="1992">1992</MenuItem>
                    <MenuItem value="1993">1993</MenuItem>
                    <MenuItem value="1994">1994</MenuItem>
                    <MenuItem value="1995">1995</MenuItem>
                    <MenuItem value="1996">1996</MenuItem>
                    <MenuItem value="1997">1997</MenuItem>
                    <MenuItem value="1998">1998</MenuItem>
                    <MenuItem value="1999">1999</MenuItem>
                    <MenuItem value="2000">2000</MenuItem>
                    <MenuItem value="2001">2001</MenuItem>
                   
                  
                  </Field>
                  </Grid>

                  <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="Estado Civil"
                    component={Select}
                    label="Estado Civil"
                    formControlProps={{ fullWidth: true }}
                  >

                  <MenuItem value="Casado">Casado</MenuItem>
                  <MenuItem value="Soltero">Soltero</MenuItem>
                  <MenuItem value="Unión libre">Unión libre</MenuItem>
                  <MenuItem value="Divorciado">Divorciado</MenuItem>
                  <MenuItem value="Viudo">Viudo</MenuItem>
                    </Field>
                    </Grid>

                <Grid item xs={6}>
                  <Field
                    name="Correo"
                    fullWidth
                    required
                    component={TextField}
                    type="email"
                    label="Correo"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="cp"
                    fullWidth
                    required
                    component={TextField}
                    type="text"
                    label="Código Postal"
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="area"
                    fullWidth
                    required
                    component={TextField}
                    type="text"
                    label="Area"
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    fullWidth
                    name="city"
                    component={Select}
                    label="Puesto"
                    formControlProps={{ fullWidth: true }}
                  >
                    <MenuItem value="Operativo">Operativo</MenuItem>
                    <MenuItem value="Profesional o técnico">Profesional o técnico</MenuItem>
                    <MenuItem value="Supervisor">Supervisor</MenuItem>
                    <MenuItem value="Gerente">Gerente</MenuItem>
                    </Field>
                    </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="city"
                    component={Select}
                    label="Seleccione su Ciudad"
                    formControlProps={{ fullWidth: true }}
                  >
                    
                    <MenuItem value="Aguascalientes">Aguascalientes</MenuItem>
                    <MenuItem value="Apodaca">Apodaca</MenuItem>
                    <MenuItem value="Buenavista">Buenavista</MenuItem>
                    <MenuItem value="Campeche">Campeche</MenuItem>
                    <MenuItem value="Cancún">Cancún</MenuItem>
                    <MenuItem value="Celaya">Celaya</MenuItem>
                    <MenuItem value="Chalco">Chalco</MenuItem>
                    <MenuItem value="Chetumal">Chetumal</MenuItem>
                    <MenuItem value="Chicoloapan">Chicoloapan</MenuItem>
                    <MenuItem value="Chihuahua">Chihuahua</MenuItem>
                    <MenuItem value="Chilpancingo">Chilpancingo</MenuItem>
                    <MenuItem value="Chimalhuacán">Chimalhuacán</MenuItem>
                    <MenuItem value="Ciudad Acuña">Ciudad Acuña</MenuItem>
                    <MenuItem value="Ciudad de México DF (CDMX)">Ciudad de México DF (CDMX)</MenuItem>
                    <MenuItem value="Ciudad del Carmen">Ciudad del Carmen</MenuItem>
                    <MenuItem value="Ciudad López Mateos">Ciudad López Mateos</MenuItem>
                    <MenuItem value="Ciudad Madero">Ciudad Madero</MenuItem>
                    <MenuItem value="Ciudad Obregón">Ciudad Obregón</MenuItem>
                    <MenuItem value="Ciudad Valles">Ciudad Valles</MenuItem>
                    <MenuItem value="Ciudad Victoria">Ciudad Victoria</MenuItem>
                    <MenuItem value="Coatzacoalcos">Coatzacoalcos</MenuItem>
                    <MenuItem value="Colima">Colima</MenuItem>
                    <MenuItem value="PariCórdobas">Córdoba</MenuItem>
                    <MenuItem value="Cuauhtémoc">Cuauhtémoc</MenuItem>
                    <MenuItem value="Cuautitlán">Cuautitlán</MenuItem>
                    <MenuItem value="Cuautitlán">Cuautitlán Izcalli</MenuItem>
                    <MenuItem value="Cuautla">Cuautla</MenuItem>
                    <MenuItem value="Cuernavaca">Cuernavaca</MenuItem>
                    <MenuItem value="Culiacán">Culiacán</MenuItem>
                    <MenuItem value="Durango">Durango</MenuItem>
                    <MenuItem value="Ecatepec">Ecatepec</MenuItem>
                    <MenuItem value="Ensenada">Ensenada</MenuItem>
                    <MenuItem value="Fresnillo">Fresnillo</MenuItem>
                    <MenuItem value="General Escobedo">General Escobedo</MenuItem>
                    <MenuItem value="Gómez Palacio">Gómez Palacio</MenuItem>
                    <MenuItem value="Guadalajara">Guadalajara</MenuItem>
                    <MenuItem value="Guadalupe">Guadalupe</MenuItem>
                    <MenuItem value="Guaymas">Guaymas</MenuItem>
                    <MenuItem value="Hermosillo">Hermosillo</MenuItem>
                    <MenuItem value="Hidalgo del Parral">Hidalgo del Parral</MenuItem>
                    <MenuItem value="Iguala">Iguala</MenuItem>
                    <MenuItem value="Irapuato">Irapuato</MenuItem>
                    <MenuItem value="Ixtapaluca">Ixtapaluca</MenuItem>
                    <MenuItem value="Jiutepec">Jiutepec</MenuItem>
                    <MenuItem value="Juárez">Juárez</MenuItem>
                    <MenuItem value="La Paz">La Paz</MenuItem>
                    <MenuItem value="León">León</MenuItem>
                    <MenuItem value="Los Mochis">Los Mochis</MenuItem>
                    <MenuItem value="Manzanillo">Manzanillo</MenuItem>
                    <MenuItem value="Matamoros">Matamoros</MenuItem>
                    <MenuItem value="Mazatlán">Mazatlán</MenuItem>
                    <MenuItem value="Mérida">Mérida</MenuItem>
                    <MenuItem value="Mexicali">Mexicali</MenuItem>
                    <MenuItem value="Minatitlán">Minatitlán</MenuItem>
                    <MenuItem value="Miramar">Miramar</MenuItem>
                    <MenuItem value="Monclova">Monclova</MenuItem>
                    <MenuItem value="Monterrey">Monterrey</MenuItem>
                    <MenuItem value="Morelia">Morelia</MenuItem>
                    <MenuItem value="Naucalpan">Naucalpan</MenuItem>
                    <MenuItem value="Naucalpan de Juárez">Naucalpan de Juárez</MenuItem>
                    <MenuItem value="Nezahualcóyotl">Nezahualcóyotl</MenuItem>
                    <MenuItem value="Nogales">Nogales</MenuItem>
                    <MenuItem value="Nuevo Laredo">Nuevo Laredo</MenuItem>
                    <MenuItem value="Oaxaca de Juárez">Oaxaca de Juárez</MenuItem>
                    <MenuItem value="Ojo de Agua">Ojo de Agua</MenuItem>
                    <MenuItem value="Orizaba">Orizaba</MenuItem>
                    <MenuItem value="Piedras Negras">Piedras Negras</MenuItem>
                    <MenuItem value="Playa del Carmen">Playa del Carmen</MenuItem>
                    <MenuItem value="Poza Rica de Hidalgo">Poza Rica de Hidalgo</MenuItem>
                    <MenuItem value="Puerto Vallarta">Puerto Vallarta</MenuItem>
                    <MenuItem value="Querétaro">Querétaro</MenuItem>
                    <MenuItem value="Reynosa">Reynosa</MenuItem>
                    <MenuItem value="Salamanca">Salamanca</MenuItem>
                    <MenuItem value="Saltillo">Saltillo</MenuItem>
                    <MenuItem value="San Cristóbal de las Casas">San Cristóbal de las Casas</MenuItem>
                    <MenuItem value="Saltillo">Saltillo</MenuItem>
                    <MenuItem value="San Francisco Coacalco">San Francisco Coacalco</MenuItem>
                    <MenuItem value="San Juan Bautista Tuxtepec">San Juan Bautista Tuxtepec</MenuItem>
                    <MenuItem value="San Juan del Río">San Juan del Río</MenuItem>
                    <MenuItem value="San Luis Potosí">San Luis Potosí</MenuItem>
                    <MenuItem value="San Luis Río Colorado">San Luis Río Colorado</MenuItem>
                    <MenuItem value="San Miguel de Allende">San Miguel de Allende</MenuItem>
                    <MenuItem value="San Nicolás de los Garza">San Nicolás de los Garza</MenuItem>
                    <MenuItem value="San Pablo de las Salinas">San Pablo de las Salinas</MenuItem>
                    <MenuItem value="San Pedro Garza García">San Pedro Garza García</MenuItem>
                    <MenuItem value="Santa Catarina">Santa Catarina</MenuItem>
                    <MenuItem value="Soledad de Graciano Sánchez">Soledad de Graciano Sánchez</MenuItem>
                    <MenuItem value="Tampico">Tampico</MenuItem>
                    <MenuItem value="Tapachula">Tapachula</MenuItem>
                    <MenuItem value="Tehuacán">Tehuacán</MenuItem>
                    <MenuItem value="Tepexpan">Tepexpan</MenuItem>
                    <MenuItem value="Tepic">Tepic</MenuItem>
                    <MenuItem value="Texcoco de Mora">Texcoco de Mora</MenuItem>
                    <MenuItem value="Tijuana">Tijuana</MenuItem>
                    <MenuItem value="Tlalnepantla">Tlalnepantla</MenuItem>
                    <MenuItem value="Tlaquepaque">Tlaquepaque</MenuItem>
                    <MenuItem value="Toluca">Toluca</MenuItem>
                    <MenuItem value="Tonalá">Tonalá</MenuItem>
                    <MenuItem value="Torreón">Torreón</MenuItem>
                    <MenuItem value="Tulancingo de Bravo">Tulancingo de Bravo</MenuItem>
                    <MenuItem value="Tuxtla">Tuxtla</MenuItem>
                    <MenuItem value="Uruapan">Uruapan</MenuItem>
                    <MenuItem value="Veracruz">Veracruz</MenuItem>
                    <MenuItem value="Villa de Álvarez">Villa de Álvarez</MenuItem>
                    <MenuItem value="Villa Nicolás Romero">Villa Nicolás Romero</MenuItem>
                    <MenuItem value="Villahermosa">Villahermosa</MenuItem>
                    <MenuItem value="Xalapa Enriquez">Xalapa Enriquez</MenuItem>
                    <MenuItem value="Xico">Xico</MenuItem>
                    <MenuItem value="Zacatecas">Zacatecas</MenuItem>
                    <MenuItem value="Zamora">Zamora</MenuItem>
                    <MenuItem value="Zapopan">Zapopan</MenuItem>
                  </Field>
                </Grid>

          
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="estudios"
                    component={Select}
                    label="Nivel de Estudios"
                    formControlProps={{ fullWidth: true }}
                  >

                  <MenuItem value="Sin formación">Sin formación</MenuItem>
                  <MenuItem value="Primaria">Primaria</MenuItem>
                  <MenuItem value="Secundaria">Secundaria</MenuItem>
                  <MenuItem value="Preparatoria o Bachillerato">Preparatoria o Bachillerato</MenuItem>
                  <MenuItem value="Licenciatura">Licenciatura</MenuItem>
                  <MenuItem value="Maestría">Maestría</MenuItem>
                  <MenuItem value="Doctorado">Doctorado</MenuItem>

                    </Field>
                    </Grid>

                  <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="personal"
                    component={Select}
                    label="Tipo de Personal"
                    formControlProps={{ fullWidth: true }}
                  >
                  <MenuItem value="Sindicalizado">Sindicalizado</MenuItem>
                  <MenuItem value="Ninguno">Ninguno</MenuItem>
                  <MenuItem value="Confianza">Confianza</MenuItem>
                    </Field>
                    </Grid>

                    <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="Jornada"
                    component={Select}
                    label="Tipo de jornada de trabajo:"
                    formControlProps={{ fullWidth: true }}
                  >
                  <MenuItem value="Fijo nocturno (entre las 20:00 y 6:00 hrs)">Fijo nocturno (entre las 20:00 y 6:00 hrs)</MenuItem>
                  <MenuItem value="Fijo diurno (entre las 6:00 y 20:00 hrs">Fijo diurno (entre las 6:00 y 20:00 hrs</MenuItem>
                   <MenuItem value="Fijo mixto (combinación de nocturno y diurno)">Fijo mixto (combinación de nocturno y diurno)</MenuItem>
  
                    
                    </Field>
                    </Grid>


                  <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="contratacion"
                    component={Select}
                    label="Tipo de Contratación"
                    formControlProps={{ fullWidth: true }}
                  >

                  <MenuItem value="Por obra o proyecto">Por obra o proyecto</MenuItem>
                  <MenuItem value="por tiempo">Por tiempo determinado (temporal)</MenuItem>
                  <MenuItem value="Tiempo indeterminado">Tiempo indeterminado</MenuItem>
                  <MenuItem value="Honorarios">Honorarios</MenuItem>
                    </Field>
                    </Grid>


                    <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="Tiempo en el puesto Actual"
                    component={Select}
                    label="Tiempo en el puesto Actual"
                    formControlProps={{ fullWidth: true }}
                  >

                  <MenuItem value="Menos de 6 meses">Menos de 6 meses</MenuItem>
                  <MenuItem value="Entre 6 meses y 1 año">Entre 6 meses y 1 año</MenuItem>
                  <MenuItem value="Entre 1 a 4 años">Entre 1 a 4 años</MenuItem>
                  <MenuItem value="Entre 5 a 9 años">Entre 5 a 9 años</MenuItem>
                  <MenuItem value="Entre 10 a 14 años">Entre 10 a 14 años</MenuItem>
                  <MenuItem value="Entre 15 a 19 años">Entre 15 a 19 años</MenuItem>
                  <MenuItem value="Entre 20 a 24 años">Entre 20 a 24 años</MenuItem>
                  <MenuItem value="25 años o más">25 años o más</MenuItem>
                    </Field>
                    </Grid>

                    <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="Tiempo experiencia laboral"
                    component={Select}
                    label="Tiempo experiencia laboral"
                    formControlProps={{ fullWidth: true }}
                    
                  >

                  <MenuItem value="Menos de 6 meses">Menos de 6 meses</MenuItem>
                  <MenuItem value="Entre 6 meses y 1 año">Entre 6 meses y 1 año</MenuItem>
                  <MenuItem value="Entre 1 a 4 años">Entre 1 a 4 años</MenuItem>
                  <MenuItem value="Entre 5 a 9 años">Entre 5 a 9 años</MenuItem>
                  <MenuItem value="Entre 10 a 14 años">Entre 10 a 14 años</MenuItem>
                  <MenuItem value="Entre 15 a 19 años">Entre 15 a 19 años</MenuItem>
                  <MenuItem value="Entre 20 a 24 años">Entre 20 a 24 años</MenuItem>
                  <MenuItem value="25 años o más">25 años o más</MenuItem>
                    </Field>
                    </Grid>



                    <Grid  item xs={12}>
                  <FormControl component="fieldset">
                    <RadioGroup row>
                      <MDBRow>
                      <MDBCol>
                      <FormLabel component="legend" className="text-center mt-3 ml-3">Realiza rotación de turnos:</FormLabel>
                      </MDBCol> 
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
                      </MDBRow>

                    </RadioGroup>
                  </FormControl>
                </Grid>


                <Grid  item xs={12}>
                  <FormControl component="fieldset">
                    <RadioGroup row>
                      <MDBRow>
                      <MDBCol>
                      <FormLabel component="legend" className="text-center mt-3 ml-3">SEXO</FormLabel>
                      </MDBCol> 
                      <FormControlLabel 
                        label="Hombre"
                        control={
                          <Field
                          required
                            name="stooge"
                            component={Radio}
                            type="radio"
                            value="hombre"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Mujer"
                        control={
                          <Field
                          required
                            name="stooge"
                            component={Radio}
                            type="radio"
                            value="mujer"
                          />
                        }
                      />
                      </MDBRow>

                    </RadioGroup>
                  </FormControl>
                </Grid>

          
                
                {/* <Grid item>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Tiempo de Labor</FormLabel>
                    <FormGroup row>
                      <FormControlLabel
                        label="1-5 años"
                        control={
                          <Field
                            name="sauces"
                            component={Checkbox}
                            type="checkbox"
                            value="time1"
                          />
                        }
                      />
                      <FormControlLabel
                        label="5-10 años"
                        control={
                          <Field
                            name="sauces"
                            component={Checkbox}
                            type="checkbox"
                            value="time2"
                          />
                        }
                      />
                      <FormControlLabel
                        label="10-15 años"
                        control={
                          <Field
                            name="sauces"
                            component={Checkbox}
                            type="checkbox"
                            value="time3"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Mas de 15 años"
                        control={
                          <Field
                            name="sauces"
                            component={Checkbox}
                            type="checkbox"
                            value="time4"
                          />
                        }
                      />
                    </FormGroup>
                  </FormControl>
                </Grid> */}
                
               {/* <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={reset}
                    disabled={submitting || pristine}
                  >
                    Cancelar
                  </Button>
                </Grid> */}

                <Grid item style={{ marginTop: 16 }}>
                  <Button
                   variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
           <pre>{JSON.stringify(values, 0, 2)}</pre> 
          </form>
        )}
      />
    </div>
  );
}

export default App;