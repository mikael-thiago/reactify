import React, { useRef, useState, useEffect, useContext } from 'react';
import "./login.css";

import axios from "axios";
import { UserContext } from '../contexts/userContext';

const LoginCard = ({ search, history }) => {

    const emailRef = useRef(null);
    const senhaRef = useRef(null);

    const userContext = useContext(UserContext);

    useEffect(() => {

        const params = new URLSearchParams(search);
        const access_token = params.get("access_token");

        if (access_token !== null) {
            userContext.login(access_token);
            console.log(userContext);
            history.push("/principal");
        } else {
            if (userContext.access_token !== null) history.push("/principal");
        }

    });

    return (
        <div className="login-card">
            <div className="login-card-header">

            </div>

            <div className="login-card-body">
                <form className="login-form">
                    <label htmlFor="Email">Email</label>
                    <input type="text" name="Email" ref={emailRef} />
                    <label htmlFor="Senha">Senha</label>
                    <input type="password" name="Senha" ref={senhaRef} />

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
        <>
            <LoginCard search={props.location.search} history={props.history} />
            <div className="login-body">

            </div>
        </>
    );
}

export default LoginPage;