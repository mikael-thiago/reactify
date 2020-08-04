import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";

import "./album.css";

import { getAlbum, getArtists } from "../../../../api-calls/api-calls.js";
import { getToken } from "../../../../services/token_manipulation";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setTrack } from "../../../../redux/slices/playerSlice";
import ArtistLink from "./Components/ArtistLink/ArtistLink";
import AlbumTrackRow from "./Components/AlbumTrackRow/AlbumTrackRow";
import { AlbumItem } from "../../components/ContentItem/ContentItem";

const parseDurationTime = (ms) => {

    const HOUR_IN_MS = 3600000;
    const MINUTES_IN_MS = 60000;
    const SECONDS_IN_MS = 1000;

    let hours = 0, minutes = 0, seconds = 0;

    if (ms > HOUR_IN_MS) {
        hours = (ms / HOUR_IN_MS);
        ms = ms % HOUR_IN_MS;
    }

    if (ms > MINUTES_IN_MS) {
        minutes += ms / MINUTES_IN_MS;
        ms = ms % MINUTES_IN_MS;
    }

    if (ms > SECONDS_IN_MS) {
        seconds += ms / SECONDS_IN_MS;
        ms = ms % SECONDS_IN_MS;
    }

    hours = parseInt(hours);
    minutes = parseInt(minutes);
    seconds = parseInt(seconds);

    return { hours: hours, minutes: minutes, seconds: seconds };

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
                <img src={albumData.images[0] ? albumData.images[0].url : ""}></img>
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

                                    <text className="separator"> • </text>
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
    const authorizationData = getToken();

    const [albumData, setAlbumData] = useState(null);

    console.log(albumData);

    useEffect(() => {
        getAlbum(authorizationData.access_token, albumId).then((response) => {

            setAlbumData(response.data);

        });
    }, [])


    const retorno = (albumData ? (
        <div className="album-wrapper">

            <AlbumInfoBanner albumData={albumData} />

            <div className="album-tracks-wrapper">
                <div className="album-tracks">
                    {albumData.tracks.items.map((track, index) => (<AlbumTrackRow track={track} albumPhotoUrl={albumData.images[0] ? albumData.images[0].url : ""} />))}

                    <footer className="album-copyrights">
                        {albumData.copyrights.map((copyright, index) => (<text>{copyright.text}</text>))}
                    </footer>
                </div>
            </div>

        </div>
    ) : (<></>));

    return retorno;
}

export default withRouter(AlbumPage);