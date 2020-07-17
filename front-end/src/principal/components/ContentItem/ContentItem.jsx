import React from "react";
import "./contentItem.css";
import { setMusic } from "../../../redux/slices/playerSlice.js";
import { useDispatch } from "react-redux";

const ContentItem = ({ name = "", photoUrl = "", artists = {} }) => {

    const dispatch = useDispatch();

    return (
        <div className="content-item" onClick={() => { dispatch(setMusic({ photoUrl: photoUrl, trackUrl: "" })); }}>
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

const ArtistItem = ({ name = "", photoUrl = "" }) => {
    return (
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
    )
}

export { ContentItem, ArtistItem };