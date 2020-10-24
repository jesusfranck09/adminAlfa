import React, { Component } from 'react';
import { MDBBtn} from 'mdbreact';
import axios from 'axios'
import {API} from '../utils/http'
import MUIDataTable from "mui-datatables";
import { DialogUtility } from '@syncfusion/ej2-popups';
import Navbar from '../dashboardAdminAlfa/Navbar'

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
                getCardPay(data:"${[idAdmin]}"){
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
                  }
                }
                `
            }
        })
        .then(datos => {	 
          totalData.push(datos.data.data.getCardPay)  
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
        event.preventDefault();
    }
    click(id){
        let noFactura = this.state.value
        if(noFactura){
            axios({
                url:  API,
                method:'post',
                data:{
                query:`
                mutation{
                    updateCardPay(data:"${[noFactura,id]}"){
                        message
                      }
                    }
                    `
                }
            })
            .then(datos => {	 
                if(datos.data.data.updateCardPay.message=='actualizacion exitosa'){
                    DialogUtility.alert({
                        animationSettings: { effect: 'Zoom' },           
                        content: "Actualización exitosa",
                        title: 'Aviso!',
                        position: "fixed"
                     });
                     setTimeout(()=>{
                        window.location.reload()
                     },2000)
                }
            }).catch(err=>{
                console.log("err", err)
                console.log("este es el error" , err.response)
            })
        }else{
            DialogUtility.alert({
                animationSettings: { effect: 'Zoom' },           
                content: "No deje espacios en blanco",
                title: 'Aviso!',
                position: "fixed"
             });
        }

      
    }

    render(){

        const columns = [ "idPAgo","FechaPago", "Carrito",  "id Paypal","Cliente Paypal","Apellidos","Dirección","CP","Ciudad","Estado","Metodo de pago","Status","Subtotal","Total","Moneda"];
        const columns2 = ["No.factura","Nombre", "Apellidos",  "RFC","Razón social","Telefono","Paquete"];

        const data = this.state.cardpay.map(rows=>{
            return([rows.idPago,rows.fechaPago,rows.carrito ,rows.idPaypalCliente ,rows.nombrePaypalCliente,rows.apellidosPaypalCliente,rows.direccion1PaypalCliente + " " + rows.direccion2PaypalCliente,rows.cpPaypalCliente,rows.ciudadClientePaypal,rows.estadoPaypalCliente,rows.metodoPago, rows.statusPago,rows.subtotalTransaccion,rows.montoTransaccion,rows.monedaTransaccion])
          })
        const data2 = this.state.cardpay.map(rows=>{
        let boton  = <form onSubmit={this.handleSubmit}><input type="text" value={this.state.value} onChange={this.handleChange} style={{width:100}} /><MDBBtn onClick={(e) => { if (window.confirm('¿El número de factura es correcto?')) this.click(rows.ids)}} color="purple" size="sm" type="submit">Enviar</MDBBtn></form> 
        return([boton,rows.nombrecliente,rows.apellidosCliente,rows.rfcCliente,rows.razonSocialCliente,rows.telefonoCliente,rows.paquete])
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
             <div>
               <Navbar/>
               <div style={{width:"90%",marginLeft:"8%",marginTop:"2%"}}>
                
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
                </div>
                </div>

        )
    }
}

export default Facturacion