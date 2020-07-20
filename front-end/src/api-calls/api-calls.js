import axios from "axios";

const getRefreshedToken = async (refresh_token) => {
    const response = await (axios.get("http://localhost:4000/authenticate/refreshToken/" + refresh_token));
    return response.data.access_token;
}

const getMyAlbuns = async (access_token, refresh_token) => {
    let result;

    result = await (axios.get("https://api.spotify.com/v1/me/albums", {
        headers: {
            "Authorization": "Bearer " + access_token
        }
    }));


    return result;
}

const getNewReleases = async (access_token) => {
    const result = await (axios.get("https://api.spotify.com/v1/browse/new-releases", {
        headers: {
            "Authorization": "Bearer " + access_token
        }
    }));

    console.log(result.data);

    return result;
}

const getMyRecentlyPlayed = async (access_token, refresh_token) => {
    const result = await (axios.get("https://api.spotify.com/v1/me/player/recently-played", {
        headers: {
            "Authorization": "Bearer " + access_token
        }
    }
    ));

    return result;
}

const getMyTopArtists = async (access_token, refresh_token) => {
    const result = (await axios.get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
            "Authorization": "Bearer " + access_token
        }
    }));

    return result;
}

const getMyPlaylists = async (access_token, refresh_token) => {
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

const getAlbum = async (access_token, album_id) => {
    const result = (await axios.get("https://api.spotify.com/v1/albums/" + album_id, {
        headers: {
            "Authorization": "Bearer " + access_token
        }
    }));

    return result;
}

const getArtists = async (access_token, artists_id) => {
    const result = (await axios.get("https://api.spotify.com/v1/artists?ids=" + (artists_id.map((artist_id, index) => ((index == artists_id - 1) ? artist_id : artist_id + ","))), {
        headers: {
            "Authorization": "Bearer " + access_token
        }
    }));

    return result;
}

const getArtist = async (access_token, artist_id) => {
    const result = (await axios.get("https://api.spotify.com/v1/artists/" + artist_id, {
        headers: {
            "Authorization": "Bearer " + access_token
        }
    }));

    return result;
}

const getArtistTopTracks = async (access_token, artist_id, country_code) => {
    const result = (await axios.get("https://api.spotify.com/v1/artists/" + artist_id + "/top-tracks?country=" + country_code, {
        headers: {
            "Authorization": "Bearer " + access_token
        }
    }));

    return result;
}

const getArtistAlbums = async (access_token, artist_id, country_code, include_groups) => {
    let retorno = [];

    let result = { data: { next: "https://api.spotify.com/v1/artists/" + artist_id + "/albums?country=" + country_code + "&include_groups=" + (include_groups.map((include_group, index) => ((index === include_groups.length - 1) ? include_group : include_group + ","))) + "&limit=50" } };

    do {
        result = (await axios.get(result.data.next, {
            headers: {
                "Authorization": "Bearer " + access_token
            }
        }));

        for (var i = 0; i < result.data.items.length; i++) {
            retorno.push(result.data.items[i]);
        }
    } while (result.data.next !== null);

    return retorno;
}

const getArtistRelatedArtists = async (access_token, artist_id) => {
    const result = (await axios.get("https://api.spotify.com/v1/artists/" + artist_id + "/related-artists", {
        headers: {
            "Authorization": "Bearer " + access_token
        }
    }));

    return result.data.artists;
}


export { getMyAlbuns, getMyRecentlyPlayed, getMyTopArtists, getMyPlaylists, getSearchResult, getRefreshedToken, getNewReleases, getAlbum, getArtists, getArtist, getArtistTopTracks, getArtistAlbums, getArtistRelatedArtists };