import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './Pages/Home/App';
import {
  Route,

  BrowserRouter as Router, Redirect,
  Switch
} from 'react-router-dom';
import CadastroUsuarios from './pages/cadastroUsuarios/cadastroUsuarios'
import Login from './pages/login/login'
import reportWebVitals from './reportWebVitals';
import MeuPerfil from './pages/perfil/meuPerfil';
import VerPerfis from './pages/verPerfis/verPerfis';
import EditarMeuPerfil from './pages/editarPerfil/editarMeuPerfil';
import EditarPerfil from './pages/editarPerfil/editarPerfil';
import Perfil from './pages/perfil/perfil';
import { parseJwt, usuarioAutenticado } from './services/auth'; 

const Logado = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() ?  (
        <Component {...props} />
      ) : (
        <Redirect to="Login" />
      )
    }
  />
);

const PermissaoAdm = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === "2" ? (
        <Component {...props} />
      ) : (
        <Redirect to="Login" />
      )
    }
  />
);

const PermissaoRoot = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === "3" ? (
        <Component {...props} />
      ) : (
        <Redirect to="Login" />
      )
    }
  />
);

const PermissaoAdmRoot = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === "2" || usuarioAutenticado() && parseJwt().role === "3" ? (
        <Component {...props} />
      ) : (
        <Redirect to="Login" />
      )
    }
  />
);






const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Login" component={Login} />
        <PermissaoAdmRoot path="/Cadastro" component={CadastroUsuarios} />
        <Logado path="/MeuPerfil" component={MeuPerfil} />
        <PermissaoAdmRoot path="/VerPerfis" component={VerPerfis} />
        <Logado path="/EditarMeuPerfil" component={EditarMeuPerfil} />
        <PermissaoAdmRoot path="/EditarPerfil" component={EditarPerfil} />
        <PermissaoAdmRoot path="/Perfil" component={Perfil} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);


ReactDOM.render(
  routing, document.getElementById('root')
);
reportWebVitals();
