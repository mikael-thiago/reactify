import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";

import "./album.css";

import music from "../../../images/musica.svg";
import play from "../../../images/play.svg";

import { getAlbum, getArtists } from "../../../api-calls/api-calls.js";
import { getToken } from "../../../services/token_manipulation";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setTrack } from "../../../redux/slices/playerSlice";

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

const TrackRow = ({ track = {}, albumPhotoUrl = "" }) => {

    const [hover, setHover] = useState(false);

    const player = useSelector((state) => state.player);
    const dispatch = useDispatch();

    const musicDurationTime = () => {
        const duration_ms = track.duration_ms;

        let { hours, minutes, seconds } = parseDurationTime(duration_ms);

        seconds = (seconds > 9) ? seconds : "0" + seconds;

        minutes = (minutes > 9) ? minutes : "0" + minutes;

        hours = (hours > 0) ? hours + ":" : "";

        return hours + minutes + ":" + seconds;
    }

    const playMusic = () => {
        dispatch(setTrack({ trackUrl: track.preview_url, photoUrl: albumPhotoUrl, trackName: track.name, trackArtists: track.artists }));
    }

    return (
        <div className="album-track-row" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className="music-icon" onClick={playMusic}>
                <img src={hover ? play : music}></img>
            </div>
            <div className="album-track-text">
                <div className="album-track-name">
                    {track.name}
                </div>
                <div className="album-track-artists">
                    {track.artists.map((artist, index) => ((index === track.artists.length - 1) ? artist.name : artist.name + ", "))}
                </div>
            </div>
            <div className="album-track-duration">
                {musicDurationTime()}
            </div>
        </div>
    )
}

const AlbumPage = ({ match, history }) => {

    const albumId = match.params.id;
    const authorizationData = getToken();

    const [albumData, setAlbumData] = useState(null);

    console.log(albumData);

    useEffect(() => {
        getAlbum(authorizationData.access_token, albumId).then((response) => {

            setAlbumData(response.data);

        });
    }, [])

    const albumDurationMs = () => {
        let duration = 0;
        if (albumData) {
            const tracks = albumData.tracks;

            tracks.items.map((track, index) => {
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

    const ArtistLink = ({ children, artist_id }) => {
        return (
            <Link className="album-artist-link" to={"/artista/" + artist_id} >
                {children}
            </Link>
        );
    }

    const retorno = (albumData ? (
        <div className="album-wrapper">

            <div className="album-info">
                <div className="album-photo">
                    <img src={albumData.images[0] ? albumData.images[0].url : ""}></img>
                </div>
                <div className="album-info-text">
                    <div className="album-type">
                        Álbum
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

                                        <div className="separator"> • </div>
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
            </div>

            <div className="album-tracks-wrapper">
                {albumData.tracks.items.map((track, index) => (<TrackRow track={track} albumPhotoUrl={albumData.images[0] ? albumData.images[0].url : ""} />))}

                <div className="album-copyrights">
                    {albumData.copyrights.map((copyright, index) => (<div>{copyright.text}</div>))}
                </div>
            </div>

        </div>
    ) : (<></>));

    return retorno;
}

export default withRouter(AlbumPage);