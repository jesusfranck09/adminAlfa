import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {MDBRow, MDBBtn} from 'mdbreact';

import MUIDataTable from "mui-datatables";
import "../../index.css";
import axios from 'axios'
import { API} from '../utils/http'
import Navbar from './Navbar'
import { makeStyles } from '@material-ui/core/styles';
import {TextField} from 'final-form-material-ui';
import { Card } from 'antd';
import { Form,Field} from 'react-final-form';
import {
  Grid,
} from '@material-ui/core';
import { DialogUtility } from '@syncfusion/ej2-popups';





class Das extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          AdminAlfa:[],
          register473:'',
          tablaInicio:true,
          tablaEditar:false,
          datosSuperUser:[],
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
mostrarTablaEditar(rows){

  axios({
    url:  API,
    method:'post',
    data:{
    query:`
    query{
      getSuperUserWithRFC(data:"${[rows.RFC]}"){
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
  if(datos.data.data.getSuperUserWithRFC[0]){
    this.setState({tablaInicio:false})
    this.setState({tablaEditar:true})
    this.setState({datosSuperUser:datos.data.data.getSuperUserWithRFC})
  }else{
    DialogUtility.alert({
      animationSettings: { effect: 'Zoom' },           
      title: `Aviso`,
      content: "Cliente no encontrado", 
      position: "fixed",
      
  })
  }
  
}).catch(err=>{
    console.log("este es el error" , err)
}) 
}


useStyles = () => makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

onSubmit (values) {
};

validate = values => {
  console.log("values validate", values)
  const errors = {};
  if (!values.RFC) {
    errors.RFC = 'Este campo es requerido';
  }
  if (!values.RazonSocial) {
    errors.RazonSocial = 'Este campo es requerido';
  }
  if (!values.nombre) {
    errors.nombre= 'Este campo es requerido';
  }
  if (!values.Apellidos) {
    errors.Apellidos = 'Este campo es requerido';
  }
  if (!values.telefono) {
    errors.telefono = 'Este campo es requerido';
  }
  if (!values.correo) {
    errors.correo = 'Este campo es requerido';
  }
  return errors;
};

evaluar  = (values) =>{
  console.log(values)
  if(values.RFC && values.nombre && values.apellidos && values.RazonSocial && values.telefono && values.correo){
    let rfc =  values.RFC;
    let nombre = values.nombre;
    let apellidos = values.apellidos;
    let rs = values.RazonSocial;
    let telefono = values.telefono;
    let correo = values.correo;
    let id = values.id
    axios({
      url:  API,
      method:'post',
      data:{
      query:`
      mutation{
        updateSuperUser(data:"${[rfc,nombre,apellidos,rs,telefono,correo,id]}"){
            message
              }
          }
          `
      }
  })
  .then(datos => {	
    this.setState({tablaEditar:false})
    this.setState({tablaInicio:true})

    DialogUtility.alert({
      animationSettings: { effect: 'Zoom' },           
      title: `Aviso`,
      content: `${datos.data.data.updateSuperUser.message}`, 
      position: "fixed",
      
  })
  setTimeout(()=>{
    window.location.reload();
  },2000)
  }).catch(err=>{
      console.log("este es el error" , err)
  }) 
  }else{
    DialogUtility.alert({
      animationSettings: { effect: 'Zoom' },           
      title: `Aviso`,
      content:"Por favor complete todos los campos" , 
      position: "fixed",
      
  })
  }
}
cerrar(){
  this.setState({tablaInicio:true})
  this.setState({tablaEditar:false})
}

  render() {
           const classes = this.useStyles();

          let tablaInicio;
          let nombreAdministrador;

          if(this.state.tablaInicio === true){
            const columns = ["Administrador","Empleados", "Empresas",  "Cliente","RFC","Fecha de Venta","Editar"];
            const data = this.state.AdminAlfa.map(rows=>{
              let botonEditar =  <MDBBtn color = "warning" size = "md" onClick= {e=>this.mostrarTablaEditar(rows)}><i class="fas fa-pencil-alt"></i></MDBBtn>
              nombreAdministrador = rows.nombreAdmin+ " " +rows.apellidosAdmin;
              return([ rows.nombreAdmin + " " + rows.apellidosAdmin ,rows.empleados ,rows.empresas ,rows.RazonSocial,rows.RFC,rows.fechaVenta, botonEditar])
            })
            let datosEmpleados;
            let filtro;
            const options = {
                filterType: "dropdown",
                responsive: "stacked",
                elevation:0,
                textLabels: {
                  body: {
                    noMatch: "Buscando información",
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
        console.log("filtro" , filtro) 
        }     };
            tablaInicio =  <Card title="Página principal"> <MUIDataTable
            title={`Listado de clientes`}
            data={data}
            columns={columns}
            options={options}
          />
          </Card>
          }
    let form;      
    if(this.state.datosSuperUser[0] && this.state.tablaEditar === true){
      console.log(this.state.datosSuperUser[0])
      form = <div>
      <Card title = "Editar Clientes">             

      <Form
         onSubmit={this.onSubmit}
         validate={this.validate}
         render={({ handleSubmit, submitting, values }) => (
           <form onSubmit={handleSubmit}>
              <Grid container alignItems="flex-start" spacing={3} >
              <Grid item xs={3}>
              <Field fullWidth required disabled name="id" component={TextField} 
                     type="text" defaultValue={this.state.datosSuperUser[0].id} label = "ID"/>
              </Grid> 
              <Grid item xs={3}>
              <Field fullWidth required name="RFC" component={TextField} 
                     type="text" defaultValue={this.state.datosSuperUser[0].RFC} label = "RFC"/>
              </Grid> 
              <Grid item xs={3}>      
              <Field fullWidth required name="RazonSocial" component={TextField}
              type="text" defaultValue={this.state.datosSuperUser[0].RazonSocial} label = "Razón Social"/>
              </Grid>
              <Grid item xs={3}>      
              <Field fullWidth required name="nombre" component={TextField}
              type="text" defaultValue={this.state.datosSuperUser[0].nombre}  label = "Nombre"/>
              </Grid>
              <Grid item xs={3}>
              <Field fullWidth required name="apellidos" component={TextField}
              type="text" defaultValue={this.state.datosSuperUser[0].apellidos} label = "Apellidos"/>
              </Grid>
              <Grid item xs={3}>
              <Field fullWidth required name="telefono" component={TextField}
              type="text" defaultValue={this.state.datosSuperUser[0].telefono} label = "Teléfono"/>
              </Grid>
              <Grid item xs={3}>
              <Field fullWidth required name="correo" component={TextField}
              type="text" defaultValue={this.state.datosSuperUser[0].correo} label = "Correo"/>
              </Grid>
              
              <Grid item xs={3}>
              </Grid>
              <Grid item xs={4}>
              <MDBBtn  outline type="submit" color = "success" size = "md"disabled={submitting} onClick={(e)=> { if (window.confirm('¿Los datos son correctos?')) this.evaluar(values)}}>Actualizar</MDBBtn>
              <MDBBtn  outline type="submit" color = "danger" size = "md"disabled={submitting} onClick={(e)=>this.cerrar()}>Cancelar</MDBBtn>
              </Grid>
              
              </Grid>
           </form>
         )}
       />
      </Card>

       </div>
    }      
    

    return (
        <React.Fragment>
            <div> 
            <Navbar prop={nombreAdministrador}/>
            <div  style={{width:1100,marginLeft:"12%",marginTop:"2%",marginBottom:"2%"}} >

            {tablaInicio}
            {form}

            </div>

            </div>    
    </React.Fragment>
    
    );
  }
}

export default Das;