import React, { useState, useEffect } from "react";
import { getMyArtists } from "../../../../../../api-calls/api-calls";
import { ArtistItem } from "../../../../components/ContentItem/ContentItem";
import Section from "../../../../components/Section/Section";

const ArtistsView = () => {

    const [artists, setArtists] = useState([]);

    useEffect(() => {
        getMyArtists().then((response) => {

            setArtists(response.data.artists.items);

        });

    }, []);

    return (
        <Section title="Artistas">
            {artists.map((artist, index) => (
                <ArtistItem key={index} name={artist.name} photoUrl={artist.images[0] ? artist.images[2].url : ""} id={artist.id} />
            ))}
        </Section>
    )
}

export default ArtistsView;