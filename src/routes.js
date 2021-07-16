import '../src/App.scss';
import { ApolloProvider } from 'react-apollo';
import client from './Graphql';
import checkToken from '../src/resolvers/checkToken';
 // import checkSurveyATS from '../src/resolvers/checkSurveyATS';
// import checkSurveyRP from '../src/resolvers/checkSurveyRP';
// import checkSurveyEEO from '../src/resolvers/checkSurveyEEO';
import {
  BrowserRouter as Router,
  Route,Redirect,Switch
} from 'react-router-dom';
import React, { Component } from 'react';

// import SignUp from './components/views/SignUp/signup';
//  import Paquetes from './components/packComercial/packComercial';
 import Paquetes from './components/packComercial/paquetes';
 import Facturacion from './components/dashboardAdminAlfa/facturacion';
 import FacturacionRealizada from './components/dashboardAdminAlfa/facturacionRealizada';

 import Login from './components/views/Login/loginAdminAlfa';
 import SignAlfa from './components/views/SignUp/signUpAdminAlfa';
 import DashboardAdminAlfa from './components/dashboardAdminAlfa/dashboard';
 import Renovacion from './components/dashboardAdminAlfa/renovacion';
 import Promocion from './components/dashboardAdminAlfa/promocion';
 import Sistemas from './components/dashboardAdminAlfa/sistemas';
 import Validacion from './components/views/SignUp/validation';
 import EliminarEval from './components/dashboardAdminAlfa/eliminarEvaluacion';
 import ValidacionEval from './components/dashboardAdminAlfa/validacionEval';
 import RenovacionLicencias from './components/dashboardAdminAlfa/renovacionLicencias';


class Routes extends Component{
  
  render(){
    const PrivateRoute = ({component:Component, ...rest}) => (
      <Route {...rest} render = {(props) => (checkToken() === true ? <Component {...props}/> : <Redirect to="/"/> )}/>      
      )
      

      return(
        <ApolloProvider client={client}>
          <Router>
          <Switch>
              <main>
                 
                  {/* <PrivateRoute exact path='/paquetes' component={Paquetes}/> */}
                  <PrivateRoute exact path='/facturacion' component={Facturacion}/>
                  <PrivateRoute exact path='/facturacionRealizada' component={FacturacionRealizada}/>

                  <PrivateRoute exact path='/paquetes' component={Paquetes}/>

                  <Route exact path='/' component={Login}/>
                  <PrivateRoute exact path='/register473' component={SignAlfa}/>
                  {/* <Route exact path='/verify/:id' component={Verify}/> */}
                  {/* <PrivateRoute exact path='/signup' component={SignUp}/> */}
                  {/* <PrivateRoute exact path='/result' component={Result}/> */}
                  <PrivateRoute exact path='/dashboardAdminAlfa' component={DashboardAdminAlfa}/>
                  <PrivateRoute exact path='/renovacion' component={Renovacion}/>
                  <PrivateRoute exact path='/promociones' component={Promocion}/>
                  <PrivateRoute exact path='/usuariosDiagnostico' component={Sistemas}/>
                  <PrivateRoute exact path='/validacion' component={Validacion}/>
                  <PrivateRoute exact path='/eliminarEval' component={EliminarEval}/>
                  <PrivateRoute exact path='/validacionEval' component={ValidacionEval}/>
                  <PrivateRoute exact path='/RenovacionLicencias' component={RenovacionLicencias}/>


              </main>
              </Switch>
          </Router>
          </ApolloProvider>
      )
  }
}
export default Routes;




