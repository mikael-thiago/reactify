import React, { useEffect } from 'react';
import "./login.css";

import "../../services/token_manipulation";
import { login } from '../../services/token_manipulation';

const LoginCard = ({ setLoggedIn }) => {

    const getParams = (url) => {
        let params = url.split("?")[1];

        let retorno = {};

        if (params) {
            params = params.split("&");
            for (var i = 0; i < params.length; i++) {
                let [key, value] = params[i].split("=");
                retorno[key] = value;
            }
        }

        return retorno;

    }

    useEffect(() => {

        let params = getParams(window.location.href);

        let access_token = params.access_token;
        let refresh_token = params.refresh_token;

        if (access_token !== null && access_token != undefined) {
            login(access_token, refresh_token);
            setLoggedIn(true);
        }

    }, []);

    return (
        <div className="login-card">
            <div className="login-card-header">

            </div>

            <div className="login-card-body">
                <form className="login-form">

                    <div style={{ width: "100%", justifyContent: "center", display: "flex", flexDirection: "row" }}>
                        <button><a href="http://localhost:4000/authenticate/">Login</a></button>
                    </div>

                </form>
            </div>
        </div>
    );
}

const LoginPage = (props) => {

    return (
        <div className="login-wrapper">
            <LoginCard setLoggedIn={props.setLoggedIn} />
            <div className="login-body">

            </div>
        </div>
    );
}

export default LoginPage;