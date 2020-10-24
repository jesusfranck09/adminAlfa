import React, { Component } from 'react';
import { MDBBtn, MDBModal, MDBModalFooter, MDBModalHeader,MDBContainer,MDBModalBody} from 'mdbreact';
import axios from 'axios'
import {API} from '../utils/http'
import MUIDataTable from "mui-datatables";
import Navbar from './Navbar'


class  Facturacion extends Component {
    constructor(props){
        super(props)
        this.state = {
            cardpay:[],
            modal: false
        }
    }

    async componentWillMount(){
        let totalData= []
        let idAdmin = localStorage.getItem("idAdmin")
        await axios({
            url:  API,
            method:'post',
            data:{
            query:`
            query{
                getAllSuperUser(data:"${[idAdmin]}"){
                    id
                    nombre
                    apellidos
                    RFC
                    RazonSocial
                    telefono
                    correo
                    fechaRegistro
                    fk_paquetes
                    activo
                  }
                }
                `
            }
        })
        .then(datos => {	 
          totalData.push(datos.data.data.getAllSuperUser)  
          this.setState({cardpay: totalData})
          console.log("datos", datos)
        }).catch(err=>{
            console.log("err", err)
            console.log("este es el error" , err.response)
        })
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }
    render(){

        const columns = ["id","Nombre" , "Apellidos","RFC", "Razón social",  "Teléfono","Correo","Adquirido","Paquete"]
        let data; 
        if(this.state.cardpay[0]){
            
            var fecha;
            data= this.state.cardpay[0].map(rows=>{
                fecha=rows.fechaRegistro.substring(4,22)
                console.log("rows", this.state.cardpay[0])
                return([rows.id,rows.nombre,rows.apellidos,rows.RFC,rows.RazonSocial ,rows.telefono ,rows.correo,fecha + " hrs.",rows.fk_paquetes])
              })    
        }
     
        let datosEmpleados;
        let filtro;
        const options = {
            filterType: "dropdown",
            responsive: "stacked",
            textLabels: {
                       body: {
                         noMatch: "Consultando información",
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
            },
            onFilterChange: (action, filtroTable) => {
              filtro=filtroTable
              }     };
   
        return(
           <React.Fragment>
             <Navbar/>
             <div style={{width:"90%",marginLeft:"8%",marginTop:"2%"}}>
                <MDBBtn color="secondary"  size="md"style={{marginLeft:"80%",marginBottom:"2%"}} onClick={this.toggle}>Ver paquetes</MDBBtn>
                <MUIDataTable
                title={`Clientes existentes utilizando Diagnóstico035`}
                data={data}
                columns={columns}
                options={options}
                /> 
                <br/>
                <br/>
            </div>
            <MDBContainer>
            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
              <MDBModalHeader toggle={this.toggle}>Paquetes existentes</MDBModalHeader>
              <MDBModalBody>                
                <table class="table table-striped">
                <thead>
                  <tr>
                  <th>Id</th>
                    <th>RFC</th>
                    <th>Empresas</th>
                    <th>Empleados</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>1</td>
                    <td>1</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>1</td>
                    <td>1</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>1</td>
                    <td>1</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>1</td>
                    <td>1</td>
                    <td>200</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>3</td>
                    <td>3</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>3</td>
                    <td>3</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <th scope="row">7</th>
                    <td>3</td>
                    <td>3</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <th scope="row">8</th>
                    <td>3</td>
                    <td>3</td>
                    <td>200</td>
                  </tr>
                  <tr>
                    <th scope="row">9</th>
                    <td>5</td>
                    <td>5</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <th scope="row">10</th>
                    <td>5</td>
                    <td>5</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <th scope="row">11</th>
                    <td>5</td>
                    <td>5</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <th scope="row">12</th>
                    <td>5</td>
                    <td>5</td>
                    <td>200</td>
                  </tr>
                  <tr>
                    <th scope="row">13</th>
                    <td>10</td>
                    <td>10</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <th scope="row">14</th>
                    <td>10</td>
                    <td>10</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <th scope="row">16</th>
                    <td>10</td>
                    <td>10</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <th scope="row">17</th>
                    <td>20</td>
                    <td>20</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <th scope="row">18</th>
                    <td>20</td>
                    <td>20</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <th scope="row">19</th>
                    <td>20</td>
                    <td>20</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <th scope="row">20</th>
                    <td>20</td>
                    <td>20</td>
                    <td>200</td>
                  </tr>
                </tbody>
              </table>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="success" size="md"onClick={this.toggle}>Cerrar</MDBBtn>
              </MDBModalFooter>
            </MDBModal>
          </MDBContainer>
          </React.Fragment>
        )
    }
}

export default Facturacion