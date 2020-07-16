import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import LoginPage from './login/login';
import Principal from './principal/principal';
import UserContextProvider from './contexts/userContext';

ReactDOM.render(
  <UserContextProvider>
    <Router>
      <Switch>
        <Route exact={true} path="/" component={LoginPage} />
        <Route exact={false} path="/principal" component={Principal} />
      </Switch>
    </Router>
  </UserContextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
