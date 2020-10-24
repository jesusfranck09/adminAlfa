import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {MDBRow, MDBCol} from 'mdbreact';

import MUIDataTable from "mui-datatables";
import "../../index.css";
import axios from 'axios'
import { API} from '../utils/http'
import Navbar from './Navbar'


class Das extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          AdminAlfa:[],
          register473:''
        }
      }
componentWillMount(){
  // const url = 'http://localhost:8000/graphql'
 var idAdminA = localStorage.getItem("idAdminAlfa")
  axios({
    url:  API,
    method:'post',
    data:{
    query:`
    query{
        getAdminAlfa(data:"${[idAdminA]}"){
          nombreAdmin
          apellidosAdmin
          correo
          fechaVenta
          rfc
          empresas
          empleados
          RazonSocial
          RFC
          telefono
            }
        }
        `
    }
})
.then(datos => {	 
  this.setState({AdminAlfa:datos.data.data.getAdminAlfa})
}).catch(err=>{
    console.log("este es el error" , err.response)
}) 
}  


  render() {
    let nombreAdministrador;
    const columns = ["Administrador","Paquete Empleados", "Empresas",  "Vendido a","RFC","Telefono","Fecha de Venta"];

    const data = this.state.AdminAlfa.map(rows=>{
      nombreAdministrador = rows.nombreAdmin+ " " +rows.apellidosAdmin;
      return([ rows.nombreAdmin + " " + rows.apellidosAdmin ,rows.empleados ,rows.empresas ,rows.RazonSocial,rows.RFC,rows.telefono,rows.fechaVenta])
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

    return (
        <React.Fragment>
                 <div> 
                 <Navbar prop={nombreAdministrador}/>
                 <div  style={{width:1000,marginLeft:"15%",marginTop:"2%",marginBottom:"2%"}} >
                  <MDBRow> 
                  <MDBCol>                     
                  </MDBCol>
                  </MDBRow>
              <MUIDataTable
                title={`Tabla de Movimientos`}
                data={data}
                columns={columns}
                options={options}
              />

            </div>
            </div>    
    </React.Fragment>
    
    );
  }
}

export default Das;