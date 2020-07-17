import React, { useContext, useState, useEffect, useMemo } from "react";

import { getMyRecentlyPlayed, getMyTopArtists, getRefreshedToken, getNewReleases } from "../../../api-calls/api-calls";

import { ContentItem, ArtistItem } from "../ContentItem/ContentItem";

import { getToken, login } from '../../../services/token_manipulation.js';

import "./inicio.css";

const Inicio = () => {

    const authorizationData = getToken();

    const [data, setData] = useState({});
    const recentlyPlayed = data.recentlyPlayed || [];
    const topArtists = data.topArtists || [];

    useEffect(() => {

        if (authorizationData !== null) {

            getNewReleases(authorizationData.access_token);

            getMyRecentlyPlayed(authorizationData.access_token).then((response) => {

                getMyTopArtists(authorizationData.access_token).then((responseTopArtists) => {
                    setData({ recentlyPlayed: response.data.items, topArtists: responseTopArtists.data.items });
                });
            }).catch((erro) => {
                getRefreshedToken(authorizationData.refresh_token).then((access_token) => {

                    login(access_token, authorizationData.refresh_token);
                    authorizationData.access_token = access_token;

                    getMyRecentlyPlayed(authorizationData.access_token).then((response) => {

                        getMyTopArtists(authorizationData.access_token).then((responseTopArtists) => {
                            setData({ recentlyPlayed: response.data.items, topArtists: responseTopArtists.data.items });
                        });
                    })

                });
            })
        }
    }, []);

    return (

        <div className="inicio-wrapper">

            <div className="section-wrapper">
                <div className="section-title">
                    Tocado Recentemente
                </div>

                <div className="section-content">
                    {recentlyPlayed.map((item, index) => (
                        <ContentItem key={index} name={item.track.name} photoUrl={item.track.album.images[0].url} artists={item.track.artists} />
                    )
                    )
                    }
                </div>
            </div>

            <div className="section-wrapper">
                <div className="section-title">
                    Artistas Preferidos
                </div>

                <div className="section-content">
                    {topArtists.map((item, index) => (
                        <ArtistItem key={index} name={item.name} photoUrl={item.images[0].url} />
                    )
                    )
                    }
                </div>

                <div style={{ height: "100px" }}>

                </div>
            </div>

        </div>
    )
}

export default Inicio;