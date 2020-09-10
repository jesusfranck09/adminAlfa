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
import { DialogUtility } from '@syncfusion/ej2-popups';


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
                getPromocion(data:"${[idAdmin]}"){
                  idPromocion
                  nombre
                  apellidos
                  rfc
                  razonSocial
                  telefono
                  correo
                  noFactura
                  }
                }
                `
            }
        })
        .then(datos => {	 
          totalData.push(datos.data.data.getPromocion)  
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
    aprobar(id){
       axios({
        url:  API,
        method:'post',
        data:{
        query:`
        mutation{
            approvedPromotion(data:"${[id]}"){
             message
              }
            }
            `
        }
    })
    .then(datos => {	 
      
       let message = datos.data.data.approvedPromotion.message;
       if(message =  'registro exitoso'){
        DialogUtility.alert({
          animationSettings: { effect: 'Zoom' },           
          content: "Registro exitoso!, se envió un correo electrónico al cliente con los datos de su nueva licencia con copia al administrador, espere un momento por favor ...",
          title: 'Aviso!',
          position: "fixed"
        });
        setTimeout(()=>{
          window.location.reload()
        },3000)
       }else{
     
       }
    }).catch(err=>{
        console.log("err", err)
        console.log("este es el error" , err.response)
    })
    }
    rechazar(id){
      axios({
        url:  API,
        method:'post',
        data:{
        query:`
        mutation{
            rejectPromotion(data:"${[id]}"){
             message
              }
            }
            `
        }
    })
    .then(datos => {	 

      if(datos.data.data.rejectPromotion.message=='promocion rechazada'){
        DialogUtility.alert({
          animationSettings: { effect: 'Zoom' },           
          content: "Promoción rechazada, el registro ha sido eliminado, espere un momento por favor ...",
          title: 'Aviso!',
          position: "fixed"
        });   
        setTimeout(()=>{
          window.location.reload()
        },3000)
    
      }else{
        DialogUtility.alert({
          animationSettings: { effect: 'Zoom' },           
          content: "Upps!, algo salió mal",
          title: 'Aviso!',
          position: "fixed"
        });   
      }
    }).catch(err=>{
        console.log("err", err)
        console.log("este es el error" , err.response)
    })
    }
  
    render(){

        const columns = ["id","Nombre" , "Apellidos","RFC", "Razón social",  "Teléfono","Correo","No. Factura","Aprobar","Rechazar"];
        let data; 
        if(this.state.cardpay[0]){
            

            data= this.state.cardpay[0].map(rows=>{
              let boton = <div><MDBBtn size="md" gradient="aqua" onClick={(e) => { if (window.confirm('¿Desea aprobar la promoción?, el registro de la licencia procederá enviando un correo al cliente con copia al admin ADS')) this.aprobar(rows.idPromocion)}}>Aprobar</MDBBtn></div>
              let botonRechazar = <div><MDBBtn size="md"color="danger" onClick={(e) => { if (window.confirm('¿Desea rechazar la promoción?, los datos se perderan')) this.rechazar(rows.idPromocion)} }>Rechazar</MDBBtn></div>
                console.log("rows", this.state.cardpay[0])
                return([rows.idPromocion,rows.nombre,rows.apellidos,rows.rfc,rows.razonSocial ,rows.telefono ,rows.correo,rows.noFactura,boton,botonRechazar])
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
           
             <div style={{padding:20}}>
                <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    <h5><i>Datos de las promociones aplicadas por los clientes</i></h5>    
                    </Typography>
                </CardContent>
                </CardActionArea>
            
                <MUIDataTable
                title={`Datos del cliente para Diagnóstico035`}
                data={data}
                columns={columns}
                options={options}
                /> 
                <br/>
                <br/>
                </div>

        )
    }
}

export default Facturacion