import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './components/Login';
import Search from './components/Search';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import "./App.css";
import './styles/bootstrap.min.css';

const App = () => (
  <MuiThemeProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/login' component={Login}/>
        <Route path='/search' component={Search}/>
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>
);

ReactDOM.render(<App/>, document.getElementById('root'))
