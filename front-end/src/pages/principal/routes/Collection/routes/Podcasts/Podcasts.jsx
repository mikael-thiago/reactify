import React, { useState } from "react";
import { useEffect } from "react";
import { getMyShows } from "../../../../../../api-calls/api-calls";
import Section from "../../../../components/Section/Section";
import { ShowItem } from "../../../../components/ContentItem/ContentItem";

const PodcastsView = () => {
    const [podcasts, setPodcasts] = useState([]);

    useEffect(() => {
        getMyShows().then((response) => {
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