import React, { useState, useEffect } from "react";
import { getMyAlbuns } from "../../../../../../api-calls/api-calls";
import { AlbumItem } from "../../../../components/ContentItem/ContentItem";
import { getToken } from "../../../../../../services/token_manipulation";
import Section from "../../../../components/Section/Section";

const ArtistsView = () => {
    const [albuns, setAlbuns] = useState([]);
    const authorizationData = getToken();

    useEffect(() => {
        getMyAlbuns(authorizationData.access_token).then((response) => {
            console.log(response.data.items);
            setAlbuns(response.data.items);
        })
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