import React, { useState, useEffect } from "react";
import { getToken } from "../../../../../../services/token_manipulation";
import { getMyArtists } from "../../../../../../api-calls/api-calls";
import { ArtistItem } from "../../../../components/ContentItem/ContentItem";
import Section from "../../../../components/Section/Section";

const ArtistsView = () => {
    const authorizationData = getToken();

    const [artists, setArtists] = useState([]);

    useEffect(() => {
        getMyArtists(authorizationData.access_token).then((response) => {
            console.log(response.data.artists);
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