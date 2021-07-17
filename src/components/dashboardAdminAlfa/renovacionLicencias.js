import React, { Component } from 'react';
import axios from 'axios'
import {API} from '../utils/http'
import MUIDataTable from "mui-datatables";
import Navbar from './Navbar'
import {MDBBtn,MDBRow,MDBCol, MDBCard, MDBCardHeader,MDBCardTitle,MDBCardBody,MDBContainer,MDBModalBody,MDBModalHeader,MDBModal,MDBModalFooter} from 'mdbreact'
import { Modal } from 'react-bootstrap';
import { array } from 'yargs';
import { Card } from 'antd';
import 'antd/dist/antd.css'; 
import { Menu, Dropdown,  Button, message, Space, Descriptions  } from 'antd';
import { KeyOutlined , UnlockOutlined,DownloadOutlined} from '@ant-design/icons';
import '../views/Login/index.css'
import { DialogUtility } from '@syncfusion/ej2-popups';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class  Renovacion extends Component {
    constructor(props){
        super(props)
        this.state = {
            cardpay:[],
            allUsers:[],
            show:false,
            array:[],
            tablaInicio:true,
            renovar:[],
            periodoSeleccionado:'',
            tablaRenovar:false,
            fk_paquetes:'',
            paquete:"",
            cambiarPaquete:false,
            detallesPaquete:false,
            labelPaquete: '',
            seleccionePeriodo:true,
            modalRenovacion:false
        }
        
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleMenuClick = this.handleMenuClick.bind(this)

    }

    async componentWillMount(){
        let array = [];
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
        
        datos.data.data.getAllSuperUser.map(rows=>{
            
         let dia = rows.fechaRegistro.substring(5,7)    
        let mes = rows.fechaRegistro.substring(8,11);
        let año = rows.fechaRegistro.substring(12,17);
        let mesNumerico;
        if(mes == "Jan") {
            mesNumerico = "01"
        }else if(mes == "Feb") {
            mesNumerico = "02"
        }else if(mes == "Mar") {
            mesNumerico = "03"
        }else if(mes == "Apr") {
            mesNumerico = "04"
        }else if(mes == "May") {
            mesNumerico = "05"
        }else if(mes == "Jun") {
            mesNumerico = "06"
        }else if(mes == "Jul") {
            mesNumerico = "07"
        }else if(mes == "Aug") {
            mesNumerico = "08"
        }else if(mes == "Sep") {
            mesNumerico = "09"
        }else if(mes == "Oct") {
            mesNumerico = "10"
        }else if(mes == "Nov") {
            mesNumerico = "11"
        }else if(mes == "Dec") {
            mesNumerico = "12"
        }      

        let fecha = dia.concat("/").concat(mesNumerico).concat("/").concat(año)
        rows.fechaRegistro = fecha  
         
        array.push(rows) 
         })

        array.sort(function(a, b){
            var aa = a.fechaRegistro.split('/').reverse().join(),
                bb = b.fechaRegistro.split('/').reverse().join();
            return aa < bb ? -1 : (aa > bb ? 1 : 0);
        });
        this.setState({allUsers:array})  
       
        }).catch(err=>{
            
        })
    }

    renovar(data){
        this.setState({fk_paquetes:data.fk_paquetes})
        this.setState({renovar:data})
        this.setState({tablaRenovar:true})
        this.setState({tablaInicio:false})
    }
  
    handleClose(){
        this.setState({show:false})
        this.setState({modalRenovacion:false})
    }
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

     handleButtonClick(e) {
         
       
    }
      
    handleMenuClick(e) {
        this.setState({detallesPaquete:true})
        let periodoSeleccionado;
         if(e.key==="1"){
           periodoSeleccionado = "1 año de renovación";  
           this.setState({periodoSeleccionado:periodoSeleccionado})
         }
         if(e.key==="2"){
            periodoSeleccionado = "2 años de renovación";
            this.setState({periodoSeleccionado:periodoSeleccionado})
        }
        if(e.key==="3"){
            periodoSeleccionado = "3 años de renovación";
            this.setState({periodoSeleccionado:periodoSeleccionado})
        }
        if(e.key==="4"){
            periodoSeleccionado = "4 años de renovación";
            this.setState({periodoSeleccionado:periodoSeleccionado})
        }
        if(e.key==="5"){
            periodoSeleccionado = "5 años de renovación";
            this.setState({periodoSeleccionado:periodoSeleccionado})
        }
        message.info(periodoSeleccionado);
    }

    cerrarRenovacion(){
        this.setState({tablaRenovar:false})
        this.setState({tablaInicio:true})
    }
    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    cambiarPaquete(){
        this.setState({seleccionePeriodo:false})
        this.setState({periodoSeleccionado:false})
        this.setState({cambiarPaquete:true})
        this.setState({detallesPaquete:false})        
    }

    cerrarCambiarPaquete(){
        this.setState({seleccionePeriodo:true})
        this.setState({periodoSeleccionado:true})
        this.setState({cambiarPaquete:false})
        this.setState({detallesPaquete:true})
    }
    onSuccess(){
        let paqueteCambiado = this.state.paquete;
        this.setState({fk_paquetes:paqueteCambiado})
        this.setState({periodoSeleccionado:true})
        this.setState({cambiarPaquete:false})
        this.setState({detallesPaquete:true})
        this.setState({labelPaquete:"Paquete seleccionado: "})
        this.setState({seleccionePeriodo:true})
    }
    renovarLicencia(id){
        if(id === 1){
            this.setState({ modalRenovacion: !this.state.modalRenovacion})
        }else if(id === 2){
            if(this.state.periodoSeleccionado !== true ){
                const sumaFecha = function(d, fecha)
                {
                var Fecha = new Date();
                var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() +1) + "/" + Fecha.getFullYear());
                var sep = sFecha.indexOf('/') != -1 ? '/' : '-';
                var aFecha = sFecha.split(sep);
                var fecha = aFecha[2]+'/'+aFecha[1]+'/'+aFecha[0];
                fecha= new Date(fecha);
                fecha.setDate(fecha.getDate()+parseInt(d));
                var anno=fecha.getFullYear();
                var mes= fecha.getMonth()+1;
                var dia= fecha.getDate();
                mes = (mes < 10) ? ("0" + mes) : mes;
                dia = (dia < 10) ? ("0" + dia) : dia;
                var fechaFinal = dia+sep+mes+sep+anno;
                return (fechaFinal);
                }
    
                var fechaInicial = this.state.renovar.fechaRegistro;
                let expiracionLicencia =  fechaInicial
    
                ///////////////////////////////////////////////////////////////
                var restaFechas = function(f1,f2)
                {
                var aFecha1 = f1.split('/');
                var aFecha2 = f2.split('/');
                var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]);
                var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]);
                var dif = fFecha2 - fFecha1;
                var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
                return dias;
                }
                var f1 = expiracionLicencia;
                var f = new Date();
                let obtenerDia = f.getDate();
                let obtenerMes = f.getMonth() + 1;
                let obtenerAño = f.getFullYear();
                var f2 = obtenerDia + "/0"+ obtenerMes + "/" + obtenerAño
                let calculo = restaFechas(f2,f1) /// dias en numero
    
                let data = this.state.periodoSeleccionado.substring(0,1)
                let añosLicencia =  parseInt(data);
                let diasRenovados = añosLicencia * 365;
    
                var fecha;
                if(calculo > 0){
                    fecha = sumaFecha(diasRenovados,expiracionLicencia);
                    console.log("fecha", fecha)
                }else if(calculo<0) {
                    var fecha2 = sumaFecha(diasRenovados,expiracionLicencia);
                    fecha = sumaFecha(Math.abs(calculo),fecha2);
                }
                const stringToDate = (dateString) => {
                    const [day, month, year] = dateString.split('/');
                    return new Date([month, day, year].join('/'));
                };
    
                let id = this.state.renovar.id;
                let fechaRenovacionActual = stringToDate(fecha).toGMTString().replace(/,/g, "");
                let rfc =  this.state.renovar.RFC;
                let paquete = this.state.fk_paquetes;
                let rs = this.state.renovar.RazonSocial.replace(/,/g, "");
                let fechaAdquisicionInicial = stringToDate(fechaInicial).toGMTString().replace(/,/g, "");
                let nombreAdministrador = this.state.renovar.nombre + " " + this.state.renovar.apellidos
                axios({
                url:  API,
                method:'post',
                data:{
                query:`
                mutation{
                    renovacionLicencias(data:"${[id,rfc,rs,nombreAdministrador,paquete,fechaAdquisicionInicial,fechaRenovacionActual]}"){
                      message
                      }
                    }
                    `
                }
            })
            .then(datos => {
                this.setState({ modalRenovacion: !this.state.modalRenovacion})
                DialogUtility.alert({
                    animationSettings: { effect: 'Zoom' },           
                    title: 'Aviso!',
                    content:`${datos.data.data.renovacionLicencias.message}`,
                    position: "fixed",
                })
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
               
            }).catch(err=>{
                console.log(err.response)
            })
            }else{
                this.setState({ modalRenovacion: !this.state.modalRenovacion})
                DialogUtility.alert({
                    animationSettings: { effect: 'Zoom' },           
                    title: 'Por favor seleccione un periodo de renovación',
                    position: "fixed",
                })
            }
        }
    }
    render(){     
        const menu = (
            <Menu onClick={this.handleMenuClick}>
              <Menu.Item key="1" icon={<KeyOutlined/>}>
                1 año de renovación
              </Menu.Item>
              <Menu.Item key="2" icon={<KeyOutlined/>}>
                2 años de renovación
              </Menu.Item>
              <Menu.Item key="3" icon={<KeyOutlined/>}>
                3 años de renovación
              </Menu.Item>
              <Menu.Item key="4" icon={<KeyOutlined/>}>
                4 años de renovación
              </Menu.Item>
              <Menu.Item key="5" icon={<KeyOutlined/>}>
                5 años de renovación
              </Menu.Item>
            </Menu>
          );


        let datosEmpleados;
        let filtro;
        const options = {
            filterType: "dropdown",
            responsive: "stacked",
            elevation:0,
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
            },
            onFilterChange: (action, filtroTable) => {
              filtro=filtroTable
            }  
           };
           let fecha;
           let tablaInicio;
           if(this.state.tablaInicio === true){
            let nombreAdministrador;
            const columns = ["ID","Cliente","RFC","RS","Dias restantes","Paquete","Renovar"];
            
            let data = this.state.allUsers.map(rows=>{
                var restaFechas = function(f1,f2)
                {
                var aFecha1 = f1.split('/');
                var aFecha2 = f2.split('/');
                var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]);
                var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]);
                var dif = fFecha2 - fFecha1;
                var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
                return dias;
                }
                var f1 = rows.fechaRegistro;
                var f = new Date();
                let obtenerDia = f.getDate();
                let obtenerMes = f.getMonth() + 1;
                let obtenerAño = f.getFullYear();
                var f2 = obtenerDia + "/0"+ obtenerMes + "/" + obtenerAño
                fecha = f2;
                let calculo = restaFechas(f1,f2);
                let diasRestantes = 365 - calculo
    
                if(calculo >= 273){
                    nombreAdministrador = <p style={{color:"red"}}>{rows.nombre+ " " +rows.apellidos}</p>;
    
                }else if(calculo >= 182 && calculo < 273){
                    nombreAdministrador = <p style={{color:"#F76E14"}}>{rows.nombre+ " " +rows.apellidos}</p>
                }else if(calculo >= 91 && calculo < 182 ){
                    nombreAdministrador = <p style={{color:"#E5BB10"}}>{rows.nombre+ " " +rows.apellidos}</p>
                }else if(calculo < 91){
                    nombreAdministrador = <p style={{color:"green"}}>{rows.nombre+ " " +rows.apellidos}</p>
                }
            let botonPaquete = <button type="button" class="btn btn-secondary btn-circle btn-lg" onClick={e=>this.handleShow(rows.fk_paquetes,rows.id,rows.correo,rows.fechaRegistro)}>{rows.fk_paquetes}  </button>
            let boton = <MDBBtn size= "md" color= "primary" onClick={e=>this.renovar(rows)}>Renovar</MDBBtn>
            return([rows.id, nombreAdministrador ,rows.RFC ,rows.RazonSocial ,diasRestantes,botonPaquete,boton])
            })

            tablaInicio =<Card title = "Renovación de licencias"><MUIDataTable
            title={`Listado de clientes`}
            data={data}
            columns={columns}
            options={options}
        />
        </Card> 
        }
        let  botonRenovar, botonCerrarPeriodo, paqueteAutorizado;
        let label;
        if(this.state.periodoSeleccionado){
            let empresasAutorizadas;
            let empleadosAutorizados;
            let id = parseInt(this.state.fk_paquetes);
            if(id===1){
                empresasAutorizadas = "1";
                empleadosAutorizados = "15";
            }else if(id===2){
                empresasAutorizadas = "1";
                empleadosAutorizados = "50";
            }else if(id===3){
                empresasAutorizadas = "1";
                empleadosAutorizados = "100";
            }else if(id===4){
                empresasAutorizadas = "1";
                empleadosAutorizados = "200";
            }else if(id===5){
                empresasAutorizadas = "3";
                empleadosAutorizados = "15";
            }else if(id===6){
                empresasAutorizadas = "3";
                empleadosAutorizados = "50";
            }else if(id===7){
                empresasAutorizadas = "3";
                empleadosAutorizados = "100";
            }else if(id===8){
                empresasAutorizadas = "3";
                empleadosAutorizados = "200";
            }else if(id===9){
                empresasAutorizadas = "5";
                empleadosAutorizados = "15";
            }else if(id===10){
                empresasAutorizadas = "5";
                empleadosAutorizados = "50";
            }else if(id===11){
                empresasAutorizadas = "5";
                empleadosAutorizados = "100";
            }else if(id===12){
                empresasAutorizadas = "5";
                empleadosAutorizados = "200";
            }else if(id===13){
                empresasAutorizadas = "10";
                empleadosAutorizados = "15";
            }else if(id===14){
                empresasAutorizadas = "10";
                empleadosAutorizados = "50";
            }else if(id===15){
                empresasAutorizadas = "10";
                empleadosAutorizados = "100";
            }else if(id===16){
                empresasAutorizadas = "10";
                empleadosAutorizados = "200";
            }else if(id===17){
                empresasAutorizadas = "20";
                empleadosAutorizados = "15";
            }else if(id===18){
                empresasAutorizadas = "20";
                empleadosAutorizados = "50";
            }else if(id===19){
                empresasAutorizadas = "20";
                empleadosAutorizados = "100";
            }else if(id===20){
                empresasAutorizadas = "20";
                empleadosAutorizados = "200";
            }
          paqueteAutorizado = empresasAutorizadas + " RFC " + " - " + empleadosAutorizados + " Empleados"

          botonRenovar = <Button style={{marginTop:10}} danger icon={<i class="fas fa-key">&nbsp;</i>} onClick={e=>this.renovarLicencia(1)}>Renovar licencia </Button>;
          botonCerrarPeriodo =  <Button  style={{marginTop:10}} type="dashed" danger icon={<i class="fas fa-times"> &nbsp;</i>} onClick={e=>this.cerrarRenovacion()}>cerrar</Button>
        }
        let labelPaquete = this.state.labelPaquete || "Paquete Registrado"
        if(this.state.detallesPaquete === true){
            label= <div ><label ><strong>{labelPaquete}</strong> {paqueteAutorizado}</label> <button  type="button" class="btn btn-warning btn-circle btn-lg" onClick={e=>this.cambiarPaquete()}><i class="fas fa-pencil-alt"></i>            </button></div>
            // <MDBBtn color="warning" outline rounded size="sm" onClick={e=>this.cambiarPaquete()}><i class="far fa-edit"></i></MDBBtn>
        }

        let dropdown;
        if(this.state.cambiarPaquete === true ){
            dropdown = <div class="form-row align-items-right">
            <div class="col-auto my-1">
            <select value={this.state.paquete} required onChange={this.changeHandler}  class="custom-select mr-sm-1" name="paquete">
                <option value="0">-- Seleccione un paquete --</option>
                <option value="1">1 RFC a 15 empleados</option>
                <option value="2">1 RFC a 50 empleados</option>
                <option value="3">1 RFC a 100 empleados</option>
                <option value="4">1 RFC a 200 empleados</option>
                <option value="5">3 RFC a 15 empleados</option>
                <option value="6">3 RFC a 50 empleados</option>
                <option value="7">3 RFC a 100 empleados</option>
                <option value="8">3 RFC a 200 empleados</option>
                <option value="9">5 RFC a 15 empleados</option>
                <option value="10">5 RFC a 50 empleados</option>
                <option value="11">5 RFC a 100 empleados</option>
                <option value="12">5 RFC a 200 empleados</option>
                <option value="13">10 RFC a 15 empleados</option>
                <option value="14">10 RFC a 50 empleados</option>
                <option value="15">10 RFC a 100 empleados</option>
                <option value="16">10 RFC a 200 empleados</option>
                <option value="17">20 RFC a 15 empleados</option>
                <option value="18">20 RFC a 50 empleados</option>
                <option value="19">20 RFC a 100 empleados</option>
                <option value="20">20 RFC a 200 empleados</option>
            </select>
            </div> 
            <MDBBtn size="md" color="success" onClick={e=>this.onSuccess()}>Aceptar</MDBBtn>    
            <MDBBtn size="md" color="danger" onClick={e=>this.cerrarCambiarPaquete()}>Cancelar</MDBBtn>    
        </div>
        }
        let tablaRenovar;
        if(this.state.renovar && this.state.tablaRenovar === true){
            let seleccionePeriodo;
            if(this.state.seleccionePeriodo === true){
                seleccionePeriodo = <Space wrap >
                <Dropdown.Button  style={{marginTop:10}} overlay={menu} placement="bottomCenter" icon={<UnlockOutlined  />}>
                    {this.state.periodoSeleccionado || "Seleccione el periodo"}
                </Dropdown.Button>
                </Space>
            }
            let statusLicencia;
            if(this.state.renovar.activo === "true"){
                statusLicencia = "Licencia Activa"
            }
            if(this.state.renovar.activo === "false"){
                statusLicencia = "Licencia Vencida"
            }
            let titleRenovacion = <p><strong>Periodo de renovación</strong></p>
            let titleCliente = <p><strong>Datos del cliente</strong></p>
            let id = <p><strong>ID</strong></p>
            let labelRFC = <p><strong>RFC</strong></p>
            let cliente = <p><strong>Cliente</strong></p>
            let correo = <p><strong>Correo</strong></p>
            let fecha = <p><strong>Fecha de adquisición inicial</strong></p>
            let detalle = <p><strong>Detalle de licencia</strong></p>
            let tituloInicial = <p><strong>RENOVACIÓN DE LICENCIAS</strong></p>
            tablaRenovar =  <Card title={tituloInicial}>
            <Card type="inner" title={titleCliente} extra={<div>{this.state.periodoSeleccionado || <strong><label>Seleccione su periodo de renovacion</label></strong>} &nbsp;&nbsp;&nbsp; <a href="https://madmin.diagnostico035.com" target="_blank">Iniciar sesión en Madmin</a></div>}>
            <Descriptions title={this.state.renovar.RazonSocial}>
                <Descriptions.Item label={id}>{this.state.renovar.id}</Descriptions.Item>
                <Descriptions.Item label={labelRFC}>{this.state.renovar.RFC}</Descriptions.Item>
                <Descriptions.Item label={cliente}>{this.state.renovar.nombre + " " + this.state.renovar.apellidos}</Descriptions.Item>
                <Descriptions.Item label={correo}>{this.state.renovar.correo}</Descriptions.Item>
                <Descriptions.Item label={fecha}>
                {this.state.renovar.fechaRegistro}
                </Descriptions.Item>
                <Descriptions.Item label={detalle}>
                {statusLicencia}
                </Descriptions.Item>                
            </Descriptions>
            </Card>
            <Card type="inner" title={titleRenovacion}> 
            <MDBRow> 
                 
            <MDBCol>    
            {seleccionePeriodo}
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {label}{dropdown}
            <MDBCol>
            </MDBCol>
         
            {botonRenovar} &nbsp;&nbsp;&nbsp;{botonCerrarPeriodo}
            </MDBRow>  
            </Card>
        </Card>
        }
        let nombreCliente = this.state.renovar.nombre + " " +  this.state.renovar.apellidos


       
        return(
            <React.Fragment>
                <div> 
                <Navbar prop={localStorage.getItem("correoAdminAlfa")}/>
                <div  style={{width:1100,marginLeft:"12%",marginTop:"1%",marginBottom:"2%"}} >
                 {tablaInicio}
                 {tablaRenovar}

                </div>
                </div>    
                <>
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
                        <th scope="col">Fecha de vencimiento</th>
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

                <MDBContainer>
                <MDBModal className="modal-lg" isOpen={this.state.modalRenovacion} toggle={this.toggle} centered>
                    <MDBModalHeader>¿Datos correctos de renovación de clientes?</MDBModalHeader>
                     <MDBModalBody>
                     <TableContainer component={Paper}>
                        <Table style={{maxWidth:1000}} size="small" aria-label="a dense table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">RFC</TableCell>
                                <TableCell align="center">Razón S</TableCell>
                                <TableCell align="center">Cliente</TableCell>
                                <TableCell align="center">Última adquisición</TableCell>
                                <TableCell align="center"><srong>Paquete adquirido</srong></TableCell>
                                <TableCell align="center"><strong>Periodo adquirido</strong></TableCell>

                            </TableRow>
                            </TableHead>
                            <TableBody>
                            
                                <TableRow key={this.state.renovar.id}>
                                <TableCell align="center" component="th" scope="row">
                                    {this.state.renovar.id}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {this.state.renovar.RFC}
                                </TableCell>
                                <TableCell align="center">{this.state.renovar.RazonSocial}</TableCell>
                                <TableCell align="center">{nombreCliente}</TableCell>
                                <TableCell align="center">{this.state.renovar.fechaRegistro}</TableCell>
                                <TableCell align="center"><strong>{paqueteAutorizado}</strong></TableCell>
                                <TableCell align="center"><strong>{this.state.periodoSeleccionado }</strong></TableCell>

                                </TableRow>
                            
                            </TableBody>
                        </Table>
                        </TableContainer>
                     </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color="danger" size="md" outline onClick={e=>this.renovarLicencia(1)}>Cancelar</MDBBtn>
                    <MDBBtn color="primary" outline size = "md" onClick={e=>this.renovarLicencia(2)}>Aceptar</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
                </MDBContainer>

                </>
             </React.Fragment>
        )
    }
}

export default Renovacion