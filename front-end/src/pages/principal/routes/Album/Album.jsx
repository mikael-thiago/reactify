import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";

import "./album.css";

import { getAlbum } from "../../../../api-calls/api-calls.js";
import TrackRow from "../../components/TrackRow/TrackRow";
import { Link } from "react-router-dom";
import { parseDurationTime } from "../../../../utils/time";

const ArtistLink = ({ children, artist_id }) => {
    return (
        <Link className="album-artist-link" to={"/on/artista/" + artist_id} >
            {children}
        </Link>
    );
}

const AlbumInfoBanner = ({ albumData }) => {

    const albumDurationMs = () => {
        let duration = 0;

        if (albumData) {
            const tracks = albumData.tracks;

            tracks.items.map((track) => {
                duration += track.duration_ms;
            });
        }

        return duration;
    }

    const albumDurationTime = () => {

        const duration_ms = albumDurationMs();

        let { hours, minutes, seconds } = parseDurationTime(duration_ms);

        seconds = (hours > 0) ? "" : seconds + "s";

        minutes = minutes + "min";

        hours = (hours > 0) ? hours + "h" : "";

        return hours + " " + minutes + " " + seconds;
    }

    return (
        <header className="album-info">
            <div className="album-photo">
                <img src={albumData.images[0] ? albumData.images[0].url : ""} alt=""></img>
            </div>
            <div className="album-info-text">
                <div className="album-type">
                    ÁLBUM
                </div>
                <div className="album-name">
                    {albumData.name}
                </div>
                <div className="album-artist-year-duration">
                    <div className="artist-photo">
                        <img src={""} alt="" ></img>
                    </div>
                    <div className="album-artists">
                        {albumData.artists.map((artist, index) => {
                            return (
                                <>
                                    <ArtistLink artist_id={artist.id}>
                                        {artist.name}
                                    </ArtistLink>

                                    <span className="separator"> • </span>
                                </>
                            )
                        })}

                    </div>
                    <div className="album-release-year">
                        {albumData.release_date.split("-")[0] + " • "}
                    </div>
                    <div className="album-duration">
                        {albumDurationTime()}
                    </div>
                </div>
            </div>
        </header>
    )
}

const AlbumPage = ({ match }) => {

    const albumId = match.params.id;

    const [albumData, setAlbumData] = useState(null);

    console.log(albumData);

    useEffect(() => {
        getAlbum(albumId).then((response) => {

            setAlbumData(response.data);

        });
    }, [albumId])


    const retorno = (albumData ? (
        <div className="album-wrapper">

            <AlbumInfoBanner albumData={albumData} />

            <div className="album-tracks-wrapper">
                <div className="album-tracks">

                    {albumData.tracks.items.map((track, index) => {
                        track.album = albumData;

                        return <TrackRow showArtists track={track} key={index} />
                    })}

                    <footer className="album-copyrights">
                        {albumData.copyrights.map((copyright, index) => (<span key={index}>{copyright.text}</span>))}
                    </footer>
                </div>
            </div>

        </div>
    ) : (<></>));

    return retorno;
}

export default withRouter(AlbumPage);