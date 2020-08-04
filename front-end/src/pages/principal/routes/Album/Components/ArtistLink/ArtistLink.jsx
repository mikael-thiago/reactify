import React from "react";
import { Link } from "react-router-dom";

const ArtistLink = ({ children, artist_id }) => {
    return (
        <Link className="album-artist-link" to={"/artista/" + artist_id} >
            {children}
        </Link>
    );
}

export default ArtistLink;