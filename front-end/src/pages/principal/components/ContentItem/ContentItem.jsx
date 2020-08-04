import React from "react";
import "./contentItem.css";
import { setTrack } from "../../../../redux/slices/playerSlice.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const PlaylistItem = ({ playlist }) => {

    return (
        <Link to={"/playlist/" + playlist.id} style={{ textDecoration: "none" }}>
            <div className="content-item">
                <div className="content-item-photo">
                    <img className="content-img" src={playlist.images[0] ? playlist.images[0].url : ""} alt=""></img>
                </div>
                <div className="content-item-name">
                    {playlist.name}
                </div>
                <div className="content-item-subname">
                    {"De " + playlist.owner.display_name}
                </div>
            </div>
        </Link>
    )
}

const ShowItem = ({ showData }) => {

    const show = showData.show;

    return (
        <Link to={"/podcasts/" + show.id} style={{ textDecoration: "none" }}>
            <div className="content-item">
                <div className="content-item-photo">
                    <img className="content-img" src={show.images[0] ? show.images[0].url : ""} alt=""></img>
                </div>
                <div className="content-item-name">
                    {show.name}
                </div>
                <div className="content-item-subname">
                    {show.publisher}
                </div>
            </div>
        </Link>
    )
}

const AlbumItem = ({ name = "", photoUrl = "", artists = {}, id }) => {

    return (
        <Link to={"/album/" + id} style={{ textDecoration: "none" }}>
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
        <Link to={"/artista/" + id} style={{ textDecoration: "none" }}>
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

export { TrackItem, ArtistItem, AlbumItem, PlaylistItem, ShowItem };