import React, { useState, useEffect } from "react";

import { getMyRecentlyPlayed, getMyTopArtists, getRefreshedToken } from "../../../../api-calls/api-calls";

import { TrackItem, ArtistItem } from "../../components/ContentItem/ContentItem";

import { getToken, login } from '../../../../services/token_manipulation.js';

import "./inicio.css";
import Section from "../../components/Section/Section";

const Inicio = () => {

    const authorizationData = getToken();

    const [data, setData] = useState({});
    const recentlyPlayed = data.recentlyPlayed || [];
    const topArtists = data.topArtists || [];

    useEffect(() => {

        if (authorizationData !== null) {

            getMyRecentlyPlayed(authorizationData.access_token).then((response) => {

                console.log(response.data.items);

                getMyTopArtists(authorizationData.access_token).then((responseTopArtists) => {
                    console.log(responseTopArtists.data.items);
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

            <Section title="Tocados Recentemente" >
                {recentlyPlayed.map((item, index) => (
                    <TrackItem key={index} name={item.track.name} photoUrl={item.track.album.images[0].url} artists={item.track.artists} trackUrl={item.track.preview_url} />
                ))
                }
            </Section>
            <Section title="Artistas favoritos">
                {topArtists.map((item, index) => (
                    <ArtistItem key={index} name={item.name} photoUrl={item.images[0].url} id={item.id} />
                ))
                }
            </Section>

            <div style={{ height: "100px" }}>

            </div>

        </div >

    )
}

export default Inicio;