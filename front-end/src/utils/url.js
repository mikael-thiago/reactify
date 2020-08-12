export const getQueryParams = (url) => {

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

export const getResources = (url) => {

    let resources = url.split("//")[1].split("/").splice(1);

    return resources;
}