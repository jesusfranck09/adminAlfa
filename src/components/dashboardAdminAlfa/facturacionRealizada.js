import React, { Component } from 'react';
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead,MDBContainer,MDBCard,MDBCardBody  } from 'mdbreact';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios'
import {API} from '../utils/http'
import MUIDataTable from "mui-datatables";

class  Facturacion extends Component {
    constructor(props){
        super(props)
        this.state = {
            cardpay:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                getCardPayRealizada(data:"${[idAdmin]}"){
                  ids  
                  idPago
                  fechaPago
                  carrito
                  idPaypalCliente
                  nombrePaypalCliente
                  apellidosPaypalCliente
                  correoPaypalCliente
                  ciudadClientePaypal
                  direccion1PaypalCliente
                  direccion2PaypalCliente
                  cpPaypalCliente
                  estadoPaypalCliente
                  metodoPago
                  statusPago
                  subtotalTransaccion
                  montoTransaccion
                  monedaTransaccion
                  nombrecliente
                  apellidosCliente
                  rfcCliente
                  razonSocialCliente
                  telefonoCliente
                  correoCliente
                  paquete
                  noFactura
                  }
                }
                `
            }
        })
        .then(datos => {	 
          totalData.push(datos.data.data.getCardPayRealizada)  
          console.log("datos" , totalData)

          this.setState({cardpay: totalData})
        }).catch(err=>{
            console.log("err", err)
            console.log("este es el error" , err.response)
        })
    }

    handleChange(event) {
    this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render(){

        const columns = ["id" , "idPAgo","FechaPago", "Carrito",  "id Paypal","Cliente Paypal","Apellidos","Correo","Dirección","CP","Ciudad","Estado","Metodo de pago","Status","Subtotal","Total","Moneda"];
        const columns2 = ["id","No.factura","Nombre", "Apellidos",  "RFC","Razón social","Telefono","Correo","Paquete"];

        const data = this.state.cardpay.map(rows=>{
            console.log("rows" , rows)
            return([rows.ids,rows.idPago,rows.fechaPago,rows.carrito ,rows.idPaypalCliente ,rows.nombrePaypalCliente,rows.apellidosPaypalCliente,rows.correoPaypalCliente,rows.direccion1PaypalCliente + " " + rows.direccion2PaypalCliente,rows.cpPaypalCliente,rows.ciudadClientePaypal,rows.estadoPaypalCliente,rows.metodoPago, rows.statusPago,rows.subtotalTransaccion,rows.montoTransaccion,rows.monedaTransaccion])
          })
        const data2 = this.state.cardpay.map(rows=>{
        return([rows.ids,rows.noFactura,rows.nombrecliente,rows.apellidosCliente,rows.rfcCliente,rows.razonSocialCliente,rows.telefonoCliente,rows.correoCliente,rows.paquete])
        })  

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
           
             <MDBContainer style={{paddingTop:20}}>
                <CardActionArea>
        
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    <h5><i>Datos de facturacion de licencias vendidas por paypal</i></h5>    
                    </Typography>
                </CardContent>
                </CardActionArea>
               
                <MUIDataTable
                title={`Datos del cliente para Diagnóstico035`}
                data={data2}
                columns={columns2}
                options={options}
                /> 
                 <br/>
                <MUIDataTable
                title={`Datos del cliente en la plataforma paypal`}
                data={data}
                columns={columns}
                options={options}
                /> 
                <br/>
                <br/>
                </MDBContainer>

        )
    }
}

export default Facturacion