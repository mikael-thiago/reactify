
const token_key = "ACCESS_TOKEN";
const refresh_token_key = "REFRESH_TOKEN";

const login = (access_token, refresh_token) => {
    localStorage.setItem(token_key, access_token);
    localStorage.setItem(refresh_token_key, refresh_token);
}

const setToken = (access_token) => {

    localStorage.setItem(token_key, access_token);

}

const logout = () => {
    localStorage.setItem(token_key, null);
    localStorage.setItem(refresh_token_key, null);
}

const getToken = () => {

    if (localStorage.getItem(token_key) !== null && localStorage.getItem(token_key) !== "null" && localStorage.getItem(token_key) !== undefined)
        return { ACCESS_TOKEN: localStorage.getItem(token_key), REFRESH_TOKEN: localStorage.getItem(refresh_token_key) }

    return null;
}

export { login, logout, getToken, setToken };