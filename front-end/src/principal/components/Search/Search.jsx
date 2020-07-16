import React, { useEffect, useContext, useState } from "react";
import { getSearchResult } from "../../../api-calls/api-calls";
import { UserContext } from "../../../contexts/userContext";
import { ContentItem, ArtistItem } from "../ContentItem/ContentItem";

import "./search.css";

const SearchPage = ({ query }) => {
    const userContext = useContext(UserContext);
    const [data, setData] = useState({});

    const albums = data.albums || [];
    const artists = data.artists || [];
    const tracks = data.tracks || [];

    console.log(artists.length);

    useEffect(() => {
        if (query !== "") {

            getSearchResult(userContext.access_token, query, "artist,track,album").then((response) => {
                setData({ albums: response.data.albums.items, artists: response.data.artists.items, tracks: response.data.tracks.items });
            })
        } else {
            setData({});
        }

    }, [query]);

    const renderAlbums = () => {
        if (albums.length !== 0) {
            return (
                <div className="section-wrapper">
                    <div className="section-title">
                        Álbuns
                </div>
                    <div className="section-content">
                        {albums.map((album, index) => (
                            <ContentItem key={index} name={album.name} photoUrl={album.images[0].url} artists={album.artists} />
                        ))}
                    </div>
                </div>
            );
        } else {
            return (
                <>
                </>
            );
        }
    }

    const renderTracks = () => {
        if (tracks.length !== 0) {
            return (


                <div className="section-wrapper">
                    <div className="section-title">
                        Tracks
            </div>
                    <div className="section-content">
                        {tracks.map((track, index) => (
                            <ContentItem key={index} name={track.name} photoUrl={track.album.images[0].url} artists={track.artists} />
                        ))}
                    </div>
                </div>
            );
        } else {
            return (
                <>
                </>
            );
        }
    }

    const renderArtists = () => {
        if (artists.length !== 0) {
            return (
                <div className="section-wrapper">
                    <div className="section-title">
                        Artistas
                </div>
                    <div className="section-content">
                        {artists.map((artist, index) => (
                            <ArtistItem key={index} name={artist.name} photoUrl={artist.images[0] !== undefined ? artist.images[0].url : ""} />
                        ))}
                    </div>
                </div>
            );
        } else {
            return (
                <>
                </>
            );
        }
    }

    return (
        <div className="search-wrapper">
            {renderAlbums()}
            {renderTracks()}
            {renderArtists()}

            <div style={{ minHeight: "100px" }}>

            </div>
        </div>
    );
}

export default React.memo(SearchPage);