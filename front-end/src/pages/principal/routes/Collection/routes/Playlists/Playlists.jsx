import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getMyPlaylists } from "../../../../../../api-calls/api-calls";
import { PlaylistItem } from "../../../../components/ContentItem/ContentItem";

import Section from "../../../../components/Section/Section";

const PlaylistView = () => {

    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        getMyPlaylists().then((response) => {

            setPlaylists(response.data.items);
        });

    }, []);

    return (
        <Section title="Playlists">
            {playlists.map((playlist, index) => (
                <PlaylistItem key={index} playlist={playlist} />
            ))}
        </Section>
    )
}

export default PlaylistView;