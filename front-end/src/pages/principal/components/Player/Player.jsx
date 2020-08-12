import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTime, setPlaying, setVolume } from "../../../../redux/slices/playerSlice";
import "./player.css";

import pause from "../../../../images/pause.svg";
import play from "../../../../images/play-player.svg";
import speaker from "../../../../images/speaker.svg";
import mute from "../../../../images/mute.svg";

import { useEffect } from "react";

const PlayerAudioController = () => {
    const player = useSelector((state) => state.player);

    const dispatch = useDispatch();

    const handleChangeVolume = (e) => {

        dispatch(setVolume({ volume: e.target.value }));
    }

    return (

        <div className="player-sound">
            <div className="player-volume">
                <div className="player-volume-icon">
                    <img src={player.volume > 0 ? speaker : mute} alt="" />
                </div>
                <input className="player-volume-slider slider" style={{ backgroundImage: `linear-gradient(to right, #bbbbbb ${player.volume * 100}%, #555555 ${player.volume * 100}%)` }} type="range" min="0" max="1.0" step="0.01" onChange={handleChangeVolume} />
            </div>

        </div>
    );
}

const PlayerController = () => {

    const player = useSelector((state) => state.player);

    const dispatch = useDispatch();

    const audioRef = useRef();

    const currentTimePercentage = (player.actualTime * 100 / player.duration) || 0;

    useEffect(() => {

        if (player.trackUrl) {

            if (player.playing)
                audioRef.current.play();
            else
                audioRef.current.pause();

            audioRef.current.volume = player.volume;
        }

    }, [player.playing, player.duration, player.trackUrl, player.volume]);

    const handlePlayPause = () => {

        if (player.trackUrl) {

            dispatch(setPlaying({ playing: !player.playing }));
        }
    }

    const handleTimeChange = (e) => {
        audioRef.current.currentTime = e.target.value;
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
        <>
            <div className="player-controller">

                {player.trackUrl ? <audio autoPlay onTimeUpdate={() => { dispatch(setTime({ actualTime: audioRef.current.currentTime })) }} src={player.trackUrl} ref={audioRef}>
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

                    <input type="range" className="player-timeline-slider slider" min="0" max={player.duration} step="0.001" value={player.actualTime} style={{ backgroundImage: `linear-gradient(to right, #bbbbbb ${currentTimePercentage}%, #555555 ${currentTimePercentage}%)` }} onMouseDown={() => dispatch(setPlaying({ playing: false }))} onMouseUp={() => dispatch(setPlaying({ playing: true }))} onChange={() => { }} onInput={handleTimeChange} />

                    <div className="player-track-time-info duration">
                        {parseTime(parseInt(player.duration))}
                    </div>
                </div>
            </div>

            <PlayerAudioController />

        </>
    )
}

const Player = () => {

    const player = useSelector((state) => state.player);

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

            <PlayerController />

        </div >
    )
}

export default Player;