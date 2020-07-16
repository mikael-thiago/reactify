import React, { useContext, useState, useEffect, useMemo } from "react";

import { getMyRecentlyPlayed, getMyTopArtists } from "../../../api-calls/api-calls";

import { ContentItem, ArtistItem } from "../ContentItem/ContentItem";
import { UserContext } from "../../../contexts/userContext";

import "./inicio.css";

const Inicio = () => {

    const userContext = useContext(UserContext);

    const [data, setData] = useState({});
    const recentlyPlayed = data.recentlyPlayed || [];
    const topArtists = data.topArtists || [];

    useEffect(() => {

        if (userContext.access_token !== null) {
            getMyRecentlyPlayed(userContext.access_token).then((response) => {

                getMyTopArtists(userContext.access_token).then((responseTopArtists) => {
                    setData({ recentlyPlayed: response.data.items, topArtists: responseTopArtists.data.items });
                });
            })
        }
    }, [userContext.access_token]);

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
            </div>

            <div style={{ height: "200px" }}>

            </div>
        </div>
    )
}

export default Inicio;