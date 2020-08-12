import axios from "axios";
import { getToken, setToken } from "../services/token_manipulation";

const refreshToken = async () => {

    //eslint-disable-next-line
    var { _, REFRESH_TOKEN } = getToken();

    const response = await (axios.get("http://localhost:4000/authenticate/refreshToken/" + REFRESH_TOKEN));

    setToken(response.data.access_token);

}

const getData = async (URL) => {

    //eslint-disable-next-line
    var { ACCESS_TOKEN, _ } = getToken();

    let result;

    try {

        result = await (axios.get(URL, {
            headers: {
                "Authorization": "Bearer " + ACCESS_TOKEN
            }
        }));


    } catch (erro) {

        await refreshToken();

        //eslint-disable-next-line
        ({ ACCESS_TOKEN, _ } = getToken());

        result = await (axios.get(URL, {
            headers: {
                "Authorization": "Bearer " + ACCESS_TOKEN
            }
        }));


    }

    return result;
}

const getMyAlbuns = async () => {
    const URL = "https://api.spotify.com/v1/me/albums";

    let result;

    result = await getData(URL);

    return result;
}

const getMyArtists = async () => {

    const URL = "https://api.spotify.com/v1/me/following?type=artist";

    let result;

    result = await getData(URL);

    return result;
}

const getNewReleases = async () => {
    const URL = "https://api.spotify.com/v1/browse/new-releases";

    let result;

    result = await getData(URL);

    return result;
}

const getMyRecentlyPlayed = async () => {
    const URL = "https://api.spotify.com/v1/me/player/recently-played";

    let result;

    result = await getData(URL);

    return result;
}

const getMyTopArtists = async () => {
    const URL = "https://api.spotify.com/v1/me/top/artists";

    let result;

    result = await getData(URL);

    return result;
}

const getMyPlaylists = async () => {
    const URL = "https://api.spotify.com/v1/me/playlists";

    let result;

    result = await getData(URL);

    return result;
}

const getSearchResult = async (query, type) => {
    let queryParsed = "";
    let querySplited = query.split(" ");

    for (let i = 0; i < querySplited.length; i++) {
        if (queryParsed === "") queryParsed = querySplited[i];
        else if (querySplited[i] !== "") queryParsed = queryParsed + "+" + querySplited[i];
    }

    const URL = "https://api.spotify.com/v1/search?q=" + queryParsed + "&type=" + type;

    let result;

    result = await getData(URL);

    return result;
}

const getAlbum = async (album_id) => {
    const URL = "https://api.spotify.com/v1/albums/" + album_id;

    let result;

    result = await getData(URL);

    return result;
}

const getArtists = async (artists_id) => {
    const URL = "https://api.spotify.com/v1/artists?ids=" + (artists_id.map((artist_id, index) => ((index === artists_id - 1) ? artist_id : artist_id + ",")));

    let result;

    result = await getData(URL);

    return result;
}

const getArtist = async (artist_id) => {
    const URL = "https://api.spotify.com/v1/artists/" + artist_id;

    let result;

    result = await getData(URL);

    return result;
}

const getArtistTopTracks = async (artist_id, country_code) => {
    const URL = "https://api.spotify.com/v1/artists/" + artist_id + "/top-tracks?country=" + country_code;

    let result;

    result = await getData(URL);

    return result;
}

const getArtistAlbums = async (artist_id, country_code, include_groups) => {
    let retorno = [];

    let result = { data: { next: "https://api.spotify.com/v1/artists/" + artist_id + "/albums?country=" + country_code + "&include_groups=" + (include_groups.map((include_group, index) => ((index === include_groups.length - 1) ? include_group : include_group + ","))) + "&limit=50" } };

    do {
        const URL = result.data.next;

        result = await getData(URL);

        for (var i = 0; i < result.data.items.length; i++) {
            retorno.push(result.data.items[i]);
        }
    } while (result.data.next !== null);

    return retorno;
}

const getArtistRelatedArtists = async (artist_id) => {
    const URL = "https://api.spotify.com/v1/artists/" + artist_id + "/related-artists";

    let result;

    result = await getData(URL);

    return result.data.artists;
}

const getMyShows = async () => {
    const URL = "https://api.spotify.com/v1/me/shows";

    let result;

    result = await getData(URL);

    return result;
}

export { getMyAlbuns, getMyRecentlyPlayed, getMyTopArtists, getMyPlaylists, getSearchResult, getNewReleases, getAlbum, getArtists, getArtist, getArtistTopTracks, getArtistAlbums, getArtistRelatedArtists, getMyShows, getMyArtists };