import React, { useState, useEffect } from "react";

import { getMyRecentlyPlayed, getMyTopArtists } from "../../../../api-calls/api-calls";

import { TrackItem, ArtistItem } from "../../components/ContentItem/ContentItem";

import "./inicio.css";
import Section from "../../components/Section/Section";

const Inicio = () => {


    const [data, setData] = useState({});
    const recentlyPlayed = data.recentlyPlayed || [];
    const topArtists = data.topArtists || [];

    useEffect(() => {

        getMyRecentlyPlayed().then((response) => {

            getMyTopArtists().then((responseTopArtists) => {

                setData({ recentlyPlayed: response.data.items, topArtists: responseTopArtists.data.items });
            });

        });

    }, []);


    return (

        <div className="inicio-wrapper">

            <Section rowsToShow={1} title="Tocados Recentemente" >
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