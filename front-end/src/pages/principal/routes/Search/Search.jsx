import React, { useEffect, useState } from "react";
import { getSearchResult, getRefreshedToken } from "../../../../api-calls/api-calls";

import { TrackItem, ArtistItem, AlbumItem } from "../../components/ContentItem/ContentItem";

import "./search.css";
import { getToken, login } from "../../../../services/token_manipulation";
import Section from "../../components/Section/Section";
import { withRouter } from "react-router-dom";

const SearchPage = withRouter(({ match }) => {
    const authorizationData = getToken();
    const [data, setData] = useState({});

    const albums = data.albums || [];
    const artists = data.artists || [];
    const tracks = data.tracks || [];

    const query = match.params.query;

    useEffect(() => {

        if (query !== "") {

            getSearchResult(authorizationData.access_token, query, "artist,track,album").then((response) => {
                setData({ albums: response.data.albums.items, artists: response.data.artists.items, tracks: response.data.tracks.items });
            }).catch((erro) => {
                getRefreshedToken(authorizationData.refresh_token).then((access_token) => {

                    login(access_token, authorizationData.refresh_token);
                    authorizationData.access_token = access_token;

                    getSearchResult(authorizationData.access_token, query, "artist,track,album").then((response) => {
                        setData({ albums: response.data.albums.items, artists: response.data.artists.items, tracks: response.data.tracks.items });
                    });

                })
            })
        } else {
            setData({});
        }

    }, [query]);

    const renderAlbums = () => {

        if (albums.length !== 0) {
            return (
                <Section title="Álbuns" showMore>
                    {albums.map((album, index) => (
                        <AlbumItem key={index} name={album.name} photoUrl={album.images[0] ? album.images[0].url : ""} artists={album.artists} id={album.id} />
                    ))}
                </Section>
            );
        } else {
            return (
                <>
                </>
            );
        }
    }

    const renderTracks = () => {

        if (tracks.length !== 0) {
            return (
                <Section title="Tracks" showMore>
                    {tracks.map((track, index) => (
                        <TrackItem key={index} name={track.name} photoUrl={track.album.images[0].url} artists={track.artists} trackUrl={track.preview_url} />
                    ))}
                </Section>
            );
        } else {
            return (
                <>
                </>
            );
        }
    }

    const renderArtists = () => {
        if (artists.length !== 0) {
            return (
                <Section title="Artistas" showMore>
                    {artists.map((artist, index) => (
                        <ArtistItem key={index} name={artist.name} photoUrl={artist.images[0] !== undefined ? artist.images[0].url : ""} id={artist.id} />
                    ))}
                </Section>
            );
        } else {
            return (
                <>
                </>
            );
        }
    }

    return (
        <div className="search-wrapper">
            {renderArtists()}
            {renderAlbums()}
            {renderTracks()}

            <div style={{ minHeight: "100px" }}>

            </div>
        </div>
    );
});

export default SearchPage;