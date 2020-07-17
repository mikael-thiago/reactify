import React from "react";
import { useSelector } from "react-redux";
import "./player.css";

const Player = () => {

    const player = useSelector((state) => state.player);

    console.log(player);

    return (
        <div className="player">
            <div className="track-info">
                <div className="track-photo">
                    <img src={player.photoUrl} alt="" />
                </div>
                <div className="track-text">
                    <div className="track-name">
                        {player.trackName}
                    </div>
                    <div className="track-artists">
                        {player.trackArtists.map((artist, index) => ((player.trackArtists.length - 1) === index ? artist.name : artist.name + ", ")
                        )}
                    </div>
                </div>
            </div>
            <div className="player-controller">

            </div>
            <div className="player-sound">

            </div>
        </div>
    )
}

export default Player;