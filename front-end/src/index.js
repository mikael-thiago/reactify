import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginPage from './pages/login/login.jsx'
import Principal from './pages/principal/principal';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Switch>

      <Route exact path="//">
        <LoginPage />
      </Route>

      <Route path="/on">
        <Principal />
      </Route>

    </Switch >
  )
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);