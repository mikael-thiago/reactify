import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTime, setDuration, setPlaying } from "../../../redux/slices/playerSlice";
import "./player.css";

import pause from "../../../images/pause.svg";
import play from "../../../images/play-player.svg";

const PlayerController = () => {
    return (
        <div className="player-controller">
            <div className="player-controls">
                <div className="player-control previous">

                </div>
                <div className="player-control play-pause">

                </div>
                <div className="player-control next">

                </div>
            </div>
            <div className="player-timeline-wrapper">
                <div className="player-actual-time">

                </div>
                <div className="player-timeline">

                </div>
                <div className="player-duration">

                </div>
            </div>
        </div>
    )
}

const Player = () => {

    const player = useSelector((state) => state.player);

    const dispatch = useDispatch();

    const audioRef = useRef();

    const handlePlayPause = () => {

        if (player.actualTime === player.duration)
            dispatch(setTime({ actualTime: 0 }));

        if (player.playing)
            audioRef.current.pause();
        else
            audioRef.current.play();

        dispatch(setPlaying({ playing: !player.playing }));
    }

    const parseTime = (time) => {
        let hours = 0, minutes = 0, seconds = 0;

        if (time > 60) {

            minutes = time / 60;

            time = time % 60;


            if (minutes >= 60) {
                hours = minutes / 60;
                minutes = minutes % 60;
            }
        }

        seconds = time;

        hours = (hours > 0 ? (hours > 9 ? hours : "0" + hours + ":") : "");
        minutes = (minutes > 9 ? minutes : "0" + minutes);
        seconds = (seconds > 9 ? seconds : "0" + seconds);

        return hours + minutes + ":" + seconds;

    }

    return (
        <div className="player">

            <div className="player-track-info">
                <div className="player-track-photo">
                    <img src={player.photoUrl} alt="" />
                </div>

                <div className="player-track-text">
                    <div className="player-track-name">
                        {player.trackName}
                    </div>
                    <div className="player-track-artists">
                        {player.trackArtists.map((artist, index) => ((player.trackArtists.length - 1) === index ? artist.name : artist.name + ", ")
                        )}
                    </div>
                </div>

            </div>

            <div className="player-controller">

                {player.trackUrl ? <audio autoPlay onPlay={() => { dispatch(setDuration({ duration: audioRef.current.duration })); }} onTimeUpdate={() => { dispatch(setTime({ actualTime: audioRef.current.currentTime })) }} src={player.trackUrl} ref={audioRef}>
                </audio> : <></>}
                <div className="player-controls">
                    <button className="player-control-play-pause" onClick={handlePlayPause}>
                        <img src={(player.playing ? pause : play)} alt="">
                        </img>
                    </button>
                </div>
                <div className="player-timeline">

                    <div className="player-track-time-info actual-time">
                        {parseTime(parseInt(player.actualTime))}
                    </div>

                    <div className="player-timeline-actual" style={{ width: (player.actualTime * 100 / player.duration) + "%" }}>

                    </div>
                    <div className="player-timeline-restant" style={{ width: (100 - (player.actualTime * 100 / (player.duration === 0 ? 1 : player.duration))) + "%" }}>

                    </div>

                    <div className="player-track-time-info duration">
                        {parseTime(parseInt(player.duration))}
                    </div>
                </div>
            </div>

            <div className="player-sound">

            </div>

        </div >
    )
}

export default Player;