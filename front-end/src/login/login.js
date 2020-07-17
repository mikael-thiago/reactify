import React, { useRef, useState, useEffect, useContext } from 'react';
import "./login.css";

import "../services/token_manipulation";
import { getToken, login } from '../services/token_manipulation';

const LoginCard = ({ search, history }) => {

    useEffect(() => {

        const params = new URLSearchParams(search);
        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        if (access_token !== null) {
            login(access_token, refresh_token);
            history.push("/principal");
        } else {
            if (getToken() !== null) history.push("/principal");
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
            <LoginCard search={props.location.search} history={props.history} />
            <div className="login-body">

            </div>
        </div>
    );
}

export default LoginPage;