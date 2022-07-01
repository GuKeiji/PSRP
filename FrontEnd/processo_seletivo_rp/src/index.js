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


const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Login" component={Login} />
        <Route path="/Cadastro" component={CadastroUsuarios} />
        <Route path="/MeuPerfil" component={MeuPerfil} />
        <Route path="/VerPerfis" component={VerPerfis} />
        <Route path="/EditarMeuPerfil" component={EditarMeuPerfil} />
        <Route path="/EditarPerfil" component={EditarPerfil} />
        <Route path="/Perfil" component={Perfil} />
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
