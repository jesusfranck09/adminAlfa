import React, { Component } from 'react';
import { MDBBtn, MDBModal, MDBModalFooter, MDBModalHeader,MDBContainer,MDBModalBody} from 'mdbreact';
import axios from 'axios'
import {API} from '../utils/http'
import MUIDataTable from "mui-datatables";
import Navbar from './Navbar'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Modal } from 'react-bootstrap';
import { Card } from 'antd';


class  Facturacion extends Component {
    constructor(props){
        super(props)
        this.state = {
            cardpay:[],
            modal: false,
            show:false,
            array:[],
        }
        this.handleClose = this.handleClose.bind(this)
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

    
    handleClose(){
      this.setState({show:false})
    }
    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }
      getMuiTheme = () => createMuiTheme({
        overrides: {
          MUIDataTableHeadCell: {
            root: {
              '&:nth-child(2)': {
                width: 20
              }
            }
          }
        }
      })
      handleShow(id,idUsuario,correo,fecha){
        id = parseInt(id) 
        let array = []
        if(id===1){
            array.push(["1","1","15",idUsuario,correo,fecha])
            this.setState({array:array})
        }else if(id===2){
            
            array.push(["1","1","50",idUsuario,correo,fecha])
            this.setState({array:array[0]})
        }else if(id===3){
            array.push(["1","1","100",idUsuario,correo,fecha])
            this.setState({array:array[0]})
        }else if(id===4){
            array.push(["1","1","200",idUsuario,correo,fecha])
            this.setState({array:array[0]})
        }else if(id===5){
            array.push(["3","3","15",idUsuario,correo,fecha])
            this.setState({array:array[0]})
        }else if(id===6){
            array.push(["3","3","50",idUsuario,correo,fecha])
            this.setState({array:array[0]})
        }else if(id===7){
            array.push(["3","3","100",idUsuario,correo,fecha])
            this.setState({array:array[0]})
        }else if(id===8){
            array.push(["3","3","200",idUsuario,correo,fecha])
            this.setState({array:array[0]})
        }else if(id===9){
            array.push(["5","5","15",idUsuario,correo,fecha])
            this.setState({array:array[0]})
        }else if(id===10){
            array.push(["5","5","50",idUsuario,correo,fecha])
            this.setState({array:array[0]})
        }else if(id===11){
            array.push(["5","5","100",idUsuario,correo,fecha])
            this.setState({array:array[0]})
        }else if(id===12){
            array.push(["5","5","200",idUsuario,correo,fecha])
            this.setState({array:array[0]})
        }else if(id===13){
            array.push(["10","10","15",idUsuario,correo,fecha])
            this.setState({array:array[0]})
        }else if(id===14){
            array.push(["10","10","50",idUsuario,correo,fecha])
            this.setState({array:array[0]})
        }else if(id===15){
            array.push(["10","10","100",idUsuario,correo,fecha])
            this.setState({array:array[0]})
        }else if(id===16){
            array.push(["10","10","200",idUsuario,correo,fecha])
            this.setState({array:array[0]})
        }else if(id===17){
            array.push(["20","20","15",idUsuario,correo,fecha])
            this.setState({array:array[0]})
        }else if(id===18){
            array.push(["20","20","50",idUsuario,correo,fecha])
            this.setState({array:array[0]})
        }else if(id===19){
            array.push(["20","20","100",idUsuario,correo,fecha])
            this.setState({array:array[0]})
        }else if(id===20){
            array.push(["20","20","200",idUsuario,correo,fecha])
            this.setState({array:array[0]})
        }
        this.setState({show:true})
    }  
    render(){

        const columns = ["id","Nombre","RFC", "Razón social","Correo","Adquirido","Paquete"]
        let data; 
        if(this.state.cardpay[0]){
            
            var fecha;
            data= this.state.cardpay[0].map(rows=>{
                let botonPaquete = <button type="button" class="btn btn-secondary btn-circle btn-lg" onClick={e=>this.handleShow(rows.fk_paquetes,rows.id,rows.correo,rows.fechaRegistro)}>{rows.fk_paquetes}  </button>
                fecha=rows.fechaRegistro.substring(4,16)
                console.log("rows", this.state.cardpay[0])
                return([rows.id,rows.nombre + " " + rows.apellidos,rows.RFC,rows.RazonSocial,rows.correo,fecha,botonPaquete])
              })    
        }
     
        let datosEmpleados;
        let filtro;
        const options = {
            filterType: "dropdown",
            responsive: "stacked",
            elevation:0,
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
              }     
        };
   
        return(
           <React.Fragment>
             <Navbar/>
             <div style={{width:"80%",marginLeft:"13%",marginTop:"1%"}}>
                <Card title="Listado de clientes en la BD">
                <MuiThemeProvider theme={this.getMuiTheme()}>
                <MUIDataTable
                title={`Cientes registrados en Diagnóstico035`}
                data={data}
                columns={columns}
                options={options}
                /> 
                </MuiThemeProvider>
                </Card>
            </div>
          
          <Modal  size="lg" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Datos del paquete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <table class="table table-bordered">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Empresas</th>
                        <th scope="col">RFC</th>
                        <th scope="col">Empleados</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Fecha de registro</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">{this.state.array[3]}</th>
                        <td>{this.state.array[0]}</td>
                        <td>{this.state.array[1]}</td>
                        <td>{this.state.array[2]}</td>
                        <td>{this.state.array[4]}</td>
                        <td>{this.state.array[5]}</td>
                        </tr>
                    </tbody>
                    </table>
                     
                    </Modal.Body>
                    <Modal.Footer>
                    <MDBBtn color="danger" size = "md"onClick={this.handleClose}>
                        Cerrar
                    </MDBBtn>
                    </Modal.Footer>
             </Modal>
          </React.Fragment>
        )
    }
}

export default Facturacion