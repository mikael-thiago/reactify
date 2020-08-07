import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrack } from "../../../../redux/slices/playerSlice.js";

import music from "../../../../images/musica.svg";
import play from "../../../../images/play.svg";

import "./trackRow.css";
import { parseDurationTime } from "../../../../utils/time.js";


const TrackRow = ({ track = {}, showArtists = false, showImage = false }) => {

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
        dispatch(setTrack({ trackUrl: track.preview_url, photoUrl: (track.album.images[0] ? track.album.images[0].url : ""), trackName: track.name, trackArtists: track.artists }));
    }

    return (
        <div className="track-row" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className="music-icon" onClick={playMusic}>
                <img src={hover ? play : music} alt=""></img>
            </div>

            {showImage && track.album.images[0] ?
                (<div className="track-row-album-photo">
                    <img src={track.album.images[0].url} alt="" />
                </div>) :
                <></>
            }

            <div className="track-text">
                <div className="track-name-artists">
                    <div className="track-name">
                        {track.name}
                    </div>
                    {showArtists ?
                        (<div className="track-artists">
                            {track.artists.map((artist, index) => ((index === track.artists.length - 1) ? artist.name : artist.name + ", "))}
                        </div>) : <></>}
                </div>
                <div className="track-duration">
                    {musicDurationTime()}
                </div>
            </div>
        </div>
    )
}

export default TrackRow;