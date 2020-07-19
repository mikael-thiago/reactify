import React from "react";
import "./contentItem.css";
import { setTrack } from "../../../redux/slices/playerSlice.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ContentItem = ({ name = "", photoUrl = "", artists = {}, trackUrl = null }) => {

    const dispatch = useDispatch();

    return (
        <div className="content-item" onClick={() => { dispatch(setTrack({ photoUrl: photoUrl, trackUrl: trackUrl, trackName: name, trackArtists: artists })); }}>
            <div className="content-item-photo">
                <img className="content-img" src={photoUrl} alt=""></img>
            </div>
            <div className="content-item-name">
                {name}
            </div>
            <div className="content-item-subname">
                {artists.map((artist, index) => ((artists.length - 1) === index ? artist.name : artist.name + ", ")
                )}
            </div>
        </div>
    )
}

const AlbumItem = ({ name = "", photoUrl = "", artists = {}, id }) => {

    const dispatch = useDispatch();

    return (
        <Link to={"album/" + id} style={{ textDecoration: "none" }}>
            <div className="content-item">
                <div className="content-item-photo">
                    <img className="content-img" src={photoUrl} alt=""></img>
                </div>
                <div className="content-item-name">
                    {name}
                </div>
                <div className="content-item-subname">
                    {artists.map((artist, index) => ((artists.length - 1) === index ? artist.name : artist.name + ", ")
                    )}
                </div>
            </div>
        </Link>
    )
}

const TrackItem = ({ name = "", photoUrl = "", artists = {}, trackUrl = null }) => {

    const dispatch = useDispatch();

    const playTrack = () => {
        dispatch(setTrack({ photoUrl: photoUrl, trackUrl: trackUrl, trackName: name, trackArtists: artists }));
    }

    return (
        <div className="content-item" onClick={playTrack}>
            <div className="content-item-photo">
                <img className="content-img" src={photoUrl} alt=""></img>
            </div>
            <div className="content-item-name">
                {name}
            </div>
            <div className="content-item-subname">
                {artists.map((artist, index) => ((artists.length - 1) === index ? artist.name : artist.name + ", ")
                )}
            </div>
        </div>
    )
}

const ArtistItem = ({ name = "", photoUrl = "", id }) => {
    return (
        <Link to={"artista/" + id} style={{ textDecoration: "none" }}>
            <div className="content-item">
                <div className="content-item-photo">
                    <img className="artist-img" src={photoUrl} alt=""></img>
                </div>
                <div className="content-item-name">
                    {name}
                </div>
                <div className="content-item-subname">
                    Artista
            </div>
            </div>
        </Link>
    )
}

export { TrackItem, ArtistItem, AlbumItem };