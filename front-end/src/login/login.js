import React, { useRef } from 'react';
import "./login.css";

import axios from "axios";

const LoginCard = () => {

    const emailRef = useRef(null);
    const senhaRef = useRef(null);

    const clearInputs = () => {
        emailRef.current.value = "";
        senhaRef.current.value = "";
    }

    const handleLoginClick = (e) => {
        e.preventDefault();
        autentica();
        clearInputs();
    }

    const autentica = async (e) => {
        const result = (await axios.post("http://localhost:4000/authenticate", { email: emailRef.current.value, senha: senhaRef.current.value })).data;
        console.log(result);
    }

    return (
        <div className="login-card">
            <div className="login-card-header">

            </div>

            <div className="login-card-body">
                <form className="login-form">
                    <label for="Email">Email</label>
                    <input type="text" name="Email" ref={emailRef} />
                    <label for="Senha">Senha</label>
                    <input type="password" name="Senha" ref={senhaRef} />

                    <div style={{ width: "100%", justifyContent: "center", display: "flex", flexDirection: "row" }}>
                        <button onClick={handleLoginClick}>Login</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

const LoginPage = () => {
    return (
        <>
            <LoginCard />
            <div className="login-body">

            </div>
        </>
    );
}

export default LoginPage;