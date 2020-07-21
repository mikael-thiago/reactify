import React, { useEffect, useContext, useState, useRef } from "react";
import { getSearchResult, getRefreshedToken } from "../../../api-calls/api-calls";

import { TrackItem, ArtistItem, AlbumItem } from "../../components/ContentItem/ContentItem";

import "./search.css";
import { getToken, login } from "../../../services/token_manipulation";
import { useSelector } from "react-redux";
import Section from "../../components/Section/Section";

const SearchPage = () => {
    const authorizationData = getToken();
    const [data, setData] = useState({});

    const albums = data.albums || [];
    const artists = data.artists || [];
    const tracks = data.tracks || [];

    const albumSectionRef = useRef();
    const albumSectionButtonRef = useRef();

    const tracksSectionRef = useRef();
    const tracksSectionButtonRef = useRef();

    const artistsSectionRef = useRef();
    const artistsSectionButtonRef = useRef();

    const query = useSelector((state) => state.search).query;

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

    const toggleSectionWrap = (ref, buttonRef) => {
        if (buttonRef.current.textContent === "VER TUDO") {
            ref.current.style.maxHeight = "100%";
            buttonRef.current.textContent = "VER MENOS";
        } else {
            ref.current.style.maxHeight = "";
            buttonRef.current.textContent = "VER TUDO";
        }
    }

    const renderAlbums = () => {

        if (albums.length !== 0) {
            return (
                <Section title="Álbuns" options={{ showMore: true }}>
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
                <Section title="Tracks" options={{ showMore: true }}>
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
                <Section title="Artistas" options={{ showMore: true }}>
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
            {renderAlbums()}
            {renderTracks()}
            {renderArtists()}

            <div style={{ minHeight: "100px" }}>

            </div>
        </div>
    );
}

export default React.memo(SearchPage);