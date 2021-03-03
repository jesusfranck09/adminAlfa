import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import { MDBBtn} from 'mdbreact';

import  axios from 'axios'
import {API} from '../utils/http'
import { DialogUtility } from '@syncfusion/ej2-popups';
import Navbar from '../dashboardAdminAlfa/Navbar'
import MUIDataTable from "mui-datatables";

class Eliminar extends Component {
    constructor(props){
        super(props)
        this.state= {
            idEmpleado: "",
            eval: "",
            array:[]
        }
        this.avanzar= this.avanzar.bind(this)
    }

    componentWillMount(){
        var id = "1267";

        axios({
            url:  API,
            method:'post',
            data:{
            query:`
             query{
                getSingleEmployee(data:"${[id]}"){
                    nombre
                    id
                    ApellidoP
                    ApellidoM
                    Curp
                    RFC
                    FechaNacimiento
                    Sexo
                    EstadoCivil
                    correo
                    AreaTrabajo
                    Puesto
                    TipoPuesto
                    NivelEstudios
                    TipoPersonal
                    JornadaTrabajo
                    TipoContratacion
                    TiempoPuesto
                    ExperienciaLaboral
                    RotacionTurnos
                    fk_administrador
                    ATSContestado
                    RPContestado
                    EEOContestado
                    CentroTrabajo
                    ATSDetectado
                    periodo
                    }
                  }
              `
            }
          })
          .then(datos => {
              console.log("datos" , datos) 	
              this.setState({array:datos.data.data.getSingleEmployee})
          }).catch(err=>{
              console.log("error" , err.response)
          })  
    }

    validate = async () =>{
      
    }
      submitHandler = event => {
        
        event.preventDefault();
        console.log("datos" , event)
      };

      avanzar(id,periodo){

        if(this.state.eval && id && periodo ) {
            axios({
                url:  API,
                method:'post',
                data:{
                query:`
                 mutation{
                    deleteEval(data:"${[id,periodo,this.state.eval]}"){
                        message
                        }
                      }
                  `
                }
              })
              .then(datos => {
                DialogUtility.alert({
                    animationSettings: { effect: 'Zoom' },           
                    title: `Aviso!`,
                    content:datos.data.data.deleteEval.message , 
                    position: "fixed",
                    
                })
                window.location.reload();
             }).catch(err=>{
                  console.log("error" , err.response)
              })  
        }else{
            DialogUtility.alert({
                animationSettings: { effect: 'Zoom' },           
                title: `Algo salió mal`,
                content:"Estimado administrador, revise que todos los campos esten corretos y vuelva a intentarlo." , 
                position: "fixed",
                
            })
        }     
      }
      
 
      changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state.eval)
      };
    render(){
        const columns = ["ID","Nombre", "Correo", "Periodo" ,  "Evaluacion ATS","Evaluacion RP","Evaluacion EEO", `Eliminar respuestas`];
        let atsContestado;
        let rpContestado;
        let eeoContestado;

        const data = this.state.array.map(rows=>{
            if(rows.ATSContestado == 'true'){
                atsContestado = 'Realizada' 
            }else  if(rows.ATSContestado == 'false'){
                atsContestado = 'No Realizada' 
            }
            if(rows.RPContestado == 'true'){
                rpContestado = 'Realizada' 
            }else  if(rows.RPContestado == 'false'){
                rpContestado = 'No Realizada' 
            }
            if(rows.EEOContestado == 'true'){
                eeoContestado = 'Realizada' 
            }else  if(rows.EEOContestado == 'false'){
                eeoContestado = 'No Realizada' 
            }
          let boton = <div><MDBBtn size="md" color="danger" onClick={(e) => { if (window.confirm('¿Desea remover la evaluación?, las respuestas no se podrán recuperar')) this.avanzar(rows.id,rows.periodo)}}>Eliminar  <strong>{this.state.eval} </strong></MDBBtn></div>
          return([ rows.id  , rows.nombre + " " + rows.ApellidoP  , rows.correo , rows.periodo ,atsContestado , rpContestado , eeoContestado,boton])
        })

        let datosEmpleados;
        let filtro;
        const options = {
            filterType: "dropdown",
            responsive: "stacked",
            textLabels: {
                       body: {
                         noMatch: "Lo Siento ,No se han encontrado Resultados :(",
                         toolTip: "Sort",
                         columnHeaderTooltip: column => `Sort for ${column.label}`
                       },
                       pagination: {
                         next: "Siguiente Página",
                         previous: "Anterior Página",
                         rowsPerPage: "Filas por Página:",
                         displayRows: "de",
                       },
                       toolbar: {
                         search: "Buscar",
                         downloadCsv: "Descargar CSV",
                         print: "Imprimir",
                         viewColumns: "Ver Columnas",
                         filterTable: "Filtrar Tabla",
                       },
                       filter: {
                         all: "Todos",
                         title: "Filtros",
                         reset: "Deshacer",
                       },
                       viewColumns: {
                         title: "Mostrar Columnas",
                         titleAria: "Show/Hide Table Columns",
                       },
                       selectedRows: {
                         text: "Filas Selecionadas",
                         delete: "Borrar",
                         deleteAria: "Eliminar Filas Seleccionadas",
                       },
                     },
          
            onTableChange: (action, tableState) => {
            datosEmpleados = tableState.displayData
            console.log("datosEmpleados " , datosEmpleados)
            },
            onFilterChange: (action, filtroTable) => {
              filtro=filtroTable
              console.log("filtro" , filtro) 
              }     };
        return(
            <div>
              <Navbar/>
                <div  style={{marginTop:"2%",width:"85%" , marginLeft:"10%"}}  >
    
                            <form
                            onSubmit={this.submitHandler}
                            noValidate
                            >
                            <div>
                               
                            <label
                                    htmlFor="idEmpleado"
                                    class="black-text"
                                >
                                   <strong>Seleccione su evaluación</strong>
                            </label>
                            
                                    <div class="col-auto my-1 mb-2"></div>
                                    <select value={this.state.eval}  onChange={this.changeHandler}  class="custom-select mr-md-1" name="eval">
                                        <option value="selection">-- Seleccione una opción --</option>
                                        <option value="ATS">ATS</option>
                                        <option value="RP">RP</option>
                                        <option value="EEO">EEO</option>
                                    </select>
                                  </div>
                                 
                            </form>
                              
                       
                    </div>
                    <div style={{marginTop:"2%",width:"85%" , marginLeft:"10%"}}>      
                            <MUIDataTable
                            title={`Tabla de Movimientos`}
                            data={data}
                            columns={columns}
                            options={options}
                            />
                     </div> 
            </div>
        )
    }
}

export default Eliminar