
const token_key = "access_token";
const refresh_token_key = "refresh_token";

const login = (access_token, refresh_token) => {
    localStorage.setItem(token_key, access_token);
    localStorage.setItem(refresh_token_key, refresh_token);
}

const logout = () => {
    localStorage.setItem(token_key, null);
    localStorage.setItem(refresh_token_key, null);
}

const getToken = () => {
    if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token") !== "null" && localStorage.getItem("access_token") !== undefined)
        return { access_token: localStorage.getItem("access_token"), refresh_token: localStorage.getItem("refresh_token") }

    return null;
}

export { login, logout, getToken };