import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children, history }) => {
    const [access_token, setAccessToken] = useState(null);

    useEffect(() => {
        let access_token_storage = localStorage.getItem("access_token");

        console.log(typeof access_token_storage);
        if (access_token_storage !== null) {
            console.log("setando token");
            setAccessToken(access_token_storage);
        }

    }, [])

    const login = (access_token) => {
        localStorage.setItem("access_token", access_token);
        setAccessToken(access_token);
    }

    const logout = () => {
        localStorage.setItem("access_token", null);
        setAccessToken(null);
    }

    return (
        <UserContext.Provider value={{ access_token, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;