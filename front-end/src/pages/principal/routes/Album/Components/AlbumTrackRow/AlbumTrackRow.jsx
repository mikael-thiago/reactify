import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setTrack } from "../../../../../../redux/slices/playerSlice";

import music from "../../../../../../images/musica.svg";
import play from "../../../../../../images/play.svg";

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

const AlbumTrackRow = ({ track = {}, albumPhotoUrl = "" }) => {

    const [hover, setHover] = useState(false);

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
                <div className="album-track-name-artists">
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
        </div>
    )
}

export default AlbumTrackRow;