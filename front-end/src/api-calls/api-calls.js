import axios from "axios";

const getMyAlbuns = async (access_token) => {
    const result = await (axios.get("https://api.spotify.com/v1/me/albums", {
        headers: {
            "Authorization": "Bearer " + access_token
        }
    }));

    return result;
}

const getMyRecentlyPlayed = async (access_token) => {
    const result = await (axios.get("https://api.spotify.com/v1/me/player/recently-played", {
        headers: {
            "Authorization": "Bearer " + access_token
        }
    }));

    return result;
}

const getMyTopArtists = async (access_token) => {
    const result = (await axios.get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
            "Authorization": "Bearer " + access_token
        }
    }));

    return result;
}

const getMyPlaylists = async (access_token) => {
    const result = (await axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: {
            "Authorization": "Bearer " + access_token
        }
    }));

    return result;
}

const getSearchResult = async (access_token, query, type) => {
    let queryParsed = "";
    let querySplited = query.split(" ");

    for (let i = 0; i < querySplited.length; i++) {
        if (queryParsed === "") queryParsed = querySplited[i];
        else if (querySplited[i] !== "") queryParsed = queryParsed + "+" + querySplited[i];
    }

    const result = (await axios.get("https://api.spotify.com/v1/search?q=" + queryParsed + "&type=" + type, {
        headers: {
            "Authorization": "Bearer " + access_token
        }
    }));

    return result;
}

export { getMyAlbuns, getMyRecentlyPlayed, getMyTopArtists, getMyPlaylists, getSearchResult };