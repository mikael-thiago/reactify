import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { login } from '../../services/token_manipulation';

//Utils
import { getQueryParams } from '../../utils/url';

//Styles
import "./login.css";

const LoginCard = withRouter(({ history }) => {

    useEffect(() => {

        let params = getQueryParams(window.location.href);

        let access_token = params.access_token;
        let refresh_token = params.refresh_token;

        if (access_token !== null && access_token !== undefined) {

            login(access_token, refresh_token);

            history.push("/on");

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
});

const LoginPage = (props) => {

    return (
        <div className="login-wrapper">

            <LoginCard />

            <div className="login-body">

            </div>
        </div>
    );
}

export default LoginPage;