import React, { Component } from 'react';
import { MDBBtn, MDBModal, MDBModalFooter, MDBModalHeader,MDBContainer,MDBTable,MDBModalBody,MDBTableHead,MDBTableBody  } from 'mdbreact';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios'
import {API} from '../utils/http'
import MUIDataTable from "mui-datatables";
import { DialogUtility } from '@syncfusion/ej2-popups';


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
             <div style={{padding:20}}>
                <CardActionArea>
                <CardContent>
                    <Typography gutterBottom >
                    <h5><i>Vista general de los clientes, Nota: la tabla no muestra un reporte detallado de cada usuario</i><MDBBtn size="md"style={{marginLeft:"10%"}} onClick={this.toggle}>Ver paquetes</MDBBtn></h5>
                    </Typography>
                </CardContent>
                </CardActionArea>
            
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
              <MDBModalHeader toggle={this.toggle}>Listado de paquetes existentes</MDBModalHeader>
              <MDBModalBody>
              <MDBTable responsive>
                <MDBTableHead>
                    <tr>
                    <th>Id</th>
                    <th>RFC</th>
                    <th>Empresas</th>
                    <th>Empleados</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                    <td><strong>1</strong></td>
                    <td>1</td>
                    <td>1</td>
                    <td>15</td>
                    </tr>
                    <tr>
                    <td><strong>2</strong></td>
                    <td>1</td>
                    <td>1</td>
                    <td>50</td>
                    </tr>
                    <tr>
                    <td><strong>3</strong></td>
                    <td>1</td>
                    <td>1</td>
                    <td>100</td>
                    </tr>
                    <tr>
                    <td><strong>4</strong></td>
                    <td>1</td>
                    <td>1</td>
                    <td>200</td>
                    </tr>
                    <tr>
                    <td><strong>5</strong></td>
                    <td>3</td>
                    <td>3</td>
                    <td>15</td>
                    </tr>
                    <tr>
                    <td><strong>6</strong></td>
                    <td>3</td>
                    <td>3</td>
                    <td>50</td>
                    </tr>
                    <tr>
                    <td><strong>7</strong></td>
                    <td>3</td>
                    <td>3</td>
                    <td>100</td>
                    </tr>
                    <tr>
                    <td><strong>8</strong></td>
                    <td>3</td>
                    <td>3</td>
                    <td>200</td>
                    </tr>
                    <tr>
                    <td><strong>9</strong></td>
                    <td>5</td>
                    <td>5</td>
                    <td>15</td>
                    </tr>
                    <tr>
                    <td><strong>10</strong></td>
                    <td>5</td>
                    <td>5</td>
                    <td>50</td>
                    </tr>
                    <tr>
                    <td><strong>11</strong></td>
                    <td>5</td>
                    <td>5</td>
                    <td>100</td>
                    </tr>
                    <tr>
                    <td><strong>12</strong></td>
                    <td>5</td>
                    <td>5</td>
                    <td>200</td>
                    </tr>
                    <tr>
                    <td><strong>13</strong></td>
                    <td>10</td>
                    <td>10</td>
                    <td>15</td>
                    </tr>
                    <tr>
                    <td><strong>14</strong></td>
                    <td>10</td>
                    <td>10</td>
                    <td>50</td>
                    </tr>
                    <tr>
                    <td><strong>15</strong></td>
                    <td>10</td>
                    <td>10</td>
                    <td>100</td>
                    </tr>
                    <tr>
                    <td><strong>16</strong></td>
                    <td>10</td>
                    <td>10</td>
                    <td>200</td>
                    </tr>
                    <tr>
                    <td><strong>17</strong></td>
                    <td>20</td>
                    <td>20</td>
                    <td>15</td>
                    </tr>
                    <tr>
                    <td><strong>18</strong></td>
                    <td>20</td>
                    <td>20</td>
                    <td>50</td>
                    </tr>
                    <tr>
                    <td><strong>19</strong></td>
                    <td>20</td>
                    <td>20</td>
                    <td>100</td>
                    </tr>
                    <tr>
                    <td><strong>20</strong></td>
                    <td>20</td>
                    <td>20</td>
                    <td>200</td>
                    </tr>
                </MDBTableBody>
                </MDBTable>
              
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="danger" onClick={this.toggle}>Cerrar</MDBBtn>
              </MDBModalFooter>
            </MDBModal>
          </MDBContainer>
          </React.Fragment>
        )
    }
}

export default Facturacion