import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import LoginPage from './pages/login/login'
import Principal from './pages/principal/principal';
import { getToken } from './services/token_manipulation';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (getToken() !== null) setLoggedIn(true);
  }, []);

  return (
    loggedIn ? <Principal setLoggedIn={setLoggedIn} /> : <LoginPage setLoggedIn={setLoggedIn} />
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
