import React, { useState } from "react";
import { useEffect } from "react";
import { getMyShows } from "../../../../../api-calls/api-calls";
import { getToken } from "../../../../../services/token_manipulation";
import Section from "../../../../components/Section/Section";
import { ShowItem } from "../../../../components/ContentItem/ContentItem";

const PodcastsView = () => {
    const [podcasts, setPodcasts] = useState([]);
    const authorizationData = getToken();

    useEffect(() => {
        getMyShows(authorizationData.access_token).then((response) => {
            console.log(response.data.items);
            setPodcasts(response.data.items);
        })
    }, []);

    return (
        <Section title="Podcasts">
            {podcasts.map((podcast, index) => (
                <ShowItem showData={podcast} key={index} />
            ))}
        </Section>
    )
}

export default PodcastsView;