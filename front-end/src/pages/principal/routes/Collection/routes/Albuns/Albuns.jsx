import React, { useState, useEffect } from "react";
import { getMyAlbuns } from "../../../../../../api-calls/api-calls";
import { AlbumItem } from "../../../../components/ContentItem/ContentItem";
import Section from "../../../../components/Section/Section";

const ArtistsView = () => {
    const [albuns, setAlbuns] = useState([]);

    useEffect(() => {
        getMyAlbuns().then((response) => {
            setAlbuns(response.data.items);
        });
    }, []);

    return (
        <Section title="Álbuns">
            {albuns.map((album, index) => (
                <AlbumItem name={album.album.name} photoUrl={album.album.images[0] ? album.album.images[0].url : ""} artists={album.album.artists} id={album.album.id} key={index} />
            ))}
        </Section>
    )
}

export default ArtistsView;