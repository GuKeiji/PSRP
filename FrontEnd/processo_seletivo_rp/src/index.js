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


const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/Login" component={Login} />
        {/* <Route path="/Cadastro" component={CadastroUsuarios} /> */}
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
