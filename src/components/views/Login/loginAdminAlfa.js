import React from "react";
import diagnostico from '../../images/diagnostico.png'
import "mdbreact/dist/css/mdb.css";
import {MDBInput} from 'mdbreact'
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  MDBMask,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBAnimation,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import "./index.css";
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { DialogUtility } from '@syncfusion/ej2-popups';

const LOGIN = gql`
    mutation LOGIN($email: String!, $password: String!){
        loginAdminAlfa(email: $email, password: $password){
          id
          message 
          token    
          correo
          nombre
        }
    }
`
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            isPasswordShown: false,
        }
        this.handleData = this.handleData.bind(this)
      }
componentWillMount(){
    localStorage.removeItem("elToken")
    localStorage.removeItem("nombre")
    localStorage.removeItem("apellidos")
    localStorage.removeItem("rfc")
    localStorage.removeItem("razonsocial")
    localStorage.removeItem("usuario")
    localStorage.removeItem("correo")
    localStorage.removeItem("max")
    localStorage.removeItem("idAdminAlfa")
    localStorage.removeItem("fechaRegistro")
    localStorage.removeItem("fechaRegistroSuperusuario")
    localStorage.removeItem("ok")
    localStorage.removeItem("empleadoActivo")
    localStorage.removeItem("DepartamentoActivo")
    localStorage.removeItem("SucursalActiva")
    localStorage.removeItem("PuestoActivo")
}      
handleInput = (e) => {
    const {id, value} = e.target
     this.setState({
        [id]:value
    });
  }

  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };


  handleForm = (e, login) => { 
    e.preventDefault();

    console.log('Enviando formulario...');
    login({variables: { 
        ...this.state
    }});
  }
  
  
  handleData = (data) => {

    console.log("data del dash" , data)
    if (data.loginAdminAlfa.token === 'no hay token' && data.loginAdminAlfa.message=="ningun dato"){
      DialogUtility.alert({
        animationSettings: { effect: 'Zoom' },           
        title: 'Por favor no deje espacios en blanco',
        position: "fixed",
    })
    setTimeout(() => {
      window.location.reload();
    }); 

  }
 if(data.loginAdminAlfa.token=='no hay token' && data.loginAdminAlfa.message=='usuario y contraseña incorrectos'){
    DialogUtility.alert({
      animationSettings: { effect: 'Zoom' },           
      title: 'USUARIO Y CONTRASEÑA INCORRECTOS',
      position: "fixed",
  })  
  setTimeout(() => {
    window.location.reload();
  }, 2000); 
  }
     

      if(data.loginAdminAlfa.message=='Login exitoso'){
        console.log("data del admin",data.loginAdminAlfa )
        var texto = "";
        var ahora=new Date(); 
        var hora=ahora.getHours();
        console.log("hora" , hora)
        if (hora>=6 && hora<13) {
            texto="Buenos días";  
        } else if (hora>=13 && hora<21) { 
            texto="Buenas tardes";
        } else { 
            texto="Buenas noches";
        }
      localStorage.setItem('elToken', data.loginAdminAlfa.token)  
      localStorage.setItem('idAdminAlfa', data.loginAdminAlfa.id) 
      localStorage.setItem('correoAdminAlfa', data.loginAdminAlfa.correo) 
      DialogUtility.alert({
        animationSettings: { effect: 'Zoom' },           
        title: `Hola ${texto} ${data.loginAdminAlfa.nombre}`,
        content:"Su sesón ha iniciado exitosamente" , 
        position: "fixed",
        
    })

    this.props.history.push("/dashboardAdminAlfa")    
  }
  }

  
  render() {
    const { isPasswordShown } = this.state;

    return (
        <Mutation mutation={LOGIN}>
        {

    (loginAdminAlfa, {data, error}) => {
    if (data){
      this.handleData(data)
    } 
    return ( 
        <React.Fragment>
    <form onSubmit={e => this.handleForm(e, loginAdminAlfa)}>
      <div id="apppage">
      <MDBView>
          <MDBMask >
            <MDBContainer style={{marginTop:"2%"}}>
              <MDBRow  >
              <img src ={diagnostico} style={{width:220,height:70}}/>
              <MDBCol>
              <MDBAnimation type="fadeInRight" delay=".3s">
              <MDBCard className ="card">
                <div className="header pt-3 grey lighten-2">
                  <MDBRow className="d-flex justify-content-start">
                    <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                      Iniciar sesión
                    </h3>
                  </MDBRow>
                </div>
                  <MDBCardBody >
                  <MDBRow style={{marginLeft:"5%"}}>
                    <MDBInput label="Correo" group type="email" validate   id="email" onChange={this.handleInput} />
                    <MDBInput
                      id="password" 
                      label="Contraseña"
                      group
                      validate
                      onChange={this.handleInput} 
                      type={isPasswordShown ? "text" : "password"}
                    > </MDBInput>
                    <i
                    className="fa fa-eye password-icon"
                    onClick={this.togglePasswordVisiblity}  style={{marginTop:"15%"}}/>
                   
                   </MDBRow>
                    <div className="text-center mb-4">
                    <MDBBtn
                      color='success'
                      rounded
                      type='submit'
                      className='btn-block z-depth-1'
                    >
                      Ingresar
                    </MDBBtn>
                    </div>
                  
                  </MDBCardBody>
                </MDBCard>
                </MDBAnimation>   
              </MDBCol>
|
              </MDBRow>          
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
      </form>
      </React.Fragment>
                 )
            }
        }
      </Mutation>
    );
  }
}

export default Login;