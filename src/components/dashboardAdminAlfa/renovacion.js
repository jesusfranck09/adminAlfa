import React, { Component } from 'react';
import axios from 'axios'
import {API} from '../utils/http'
import MUIDataTable from "mui-datatables";
import Navbar from './Navbar'

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
                getRenovacion(data:"${[idAdmin]}"){
                  idRenovacion
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
                  fechaExpiracionLicencia
                  paquete
                  fk_superusuario
                  }
                }
                `
            }
        })
        .then(datos => {	 
          totalData.push(datos.data.data.getRenovacion)  
          this.setState({cardpay: totalData})
          console.log("datos", datos)
        }).catch(err=>{
            console.log("err", err)
            console.log("este es el error" , err.response)
        })
    }

    handleChange(event) {
    this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
    }
  
    render(){

        const columns = ["idCliente","idRegistro" , "idPAgo","FechaPago", "Carrito",  "id Paypal","Cliente Paypal","Apellidos","CP","Estado","Metodo de pago","Status","Subtotal","Total","Moneda"];
        let data; 
        if(this.state.cardpay[0]){
            data= this.state.cardpay[0].map(rows=>{
                console.log("rows", this.state.cardpay[0])
                return([rows.fk_superusuario,rows.idRenovacion,rows.idPago,rows.fechaPago,rows.carrito ,rows.idPaypalCliente ,rows.nombrePaypalCliente,rows.apellidosPaypalCliente,rows.cpPaypalCliente,rows.estadoPaypalCliente,rows.metodoPago, rows.statusPago,rows.subtotalTransaccion,rows.montoTransaccion,rows.monedaTransaccion])
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
           
             <div>
               <Navbar/>
               <div style={{width:"90%",marginLeft:"8%",marginTop:"2%"}}>
                <MUIDataTable
                title={`Datos del cliente en la plataforma paypal`}
                data={data}
                columns={columns}
                options={options}
                /> 
                <br/>
                <br/>
                </div>
                </div>

        )
    }
}

export default Facturacion