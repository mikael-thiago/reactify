import React, { useState } from "react";
import "./artist.css";
import { useEffect } from "react";
import { getArtistTopTracks, getArtistAlbums, getArtistRelatedArtists } from "../../../api-calls/api-calls";
import { getToken } from "../../../services/token_manipulation";
import { withRouter, Link, Route } from "react-router-dom";

import play from "../../../images/play.svg";
import music from "../../../images/musica.svg";
import { useSelector, useDispatch } from "react-redux";
import { setTrack } from "../../../redux/slices/playerSlice";
import { ArtistItem } from "../../components/ContentItem/ContentItem";

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

const TrackRow = ({ track = {} }) => {

    const [hover, setHover] = useState(false);

    const player = useSelector((state) => state.player);
    const dispatch = useDispatch();

    const albumPhotoUrl = (track.album.images[0]) ? track.album.images[0].url : "";

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
        <div className="artist-track-row" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className="music-icon" onClick={playMusic}>
                <img src={hover ? play : music}></img>
            </div>
            <div className="artist-track-text">
                <div className="artist-track-name">
                    {track.name}
                </div>
                <div className="artist-track-artists">
                    {track.artists.map((artist, index) => ((index === track.artists.length - 1) ? artist.name : artist.name + ", "))}
                </div>
            </div>
            <div className="artist-track-duration">
                {musicDurationTime()}
            </div>
        </div>
    )
}

const Section = ({ title, children }) => {
    return (
        <div className="artist-section">
            <div className="artist-section-title">
                {title}
            </div>
            {children}
        </div>
    )
}

const AlbumItem = ({ album }) => {
    const albumId = album.id, albumName = album.name, albumPhotoUrl = ((album.images[0]) ? album.images[0].url : "");

    return (
        <div className="artist-album">
            <div className="artist-album-photo">
                <img src={albumPhotoUrl} alt="" />
            </div>
            <Link className="artist-album-name" to={"/album/" + albumId}>
                {albumName}
            </Link>
        </div>
    )
}

const MainArtistView = ({ id }) => {
    const artistId = id;
    const authorizationData = getToken();

    const [data, setData] = useState({
        topTracks: [],
        albums: {
            albums: [],
            appears_on: [],
            singles: [],
            compilations: []
        },
        relatedArtists: []
    });

    const topTracks = data.topTracks;

    useEffect(() => {

        getArtistTopTracks(authorizationData.access_token, artistId, "BR").then((response) => {

            const include_groups = ["album", "single", "appears_on", "compilation"];

            getArtistAlbums(authorizationData.access_token, artistId, "BR", include_groups).then((albumsResponse) => {

                let albumData = {
                    album: [],
                    appears_on: [],
                    single: [],
                    compilation: []
                }

                albumsResponse.map((album) => {
                    albumData[album.album_group].push(album);
                });

                setData({
                    topTracks: response.data.tracks,
                    albums: {
                        albums: albumData.album,
                        appears_on: albumData.appears_on,
                        singles: albumData.single,
                        compilations: albumData.compilation
                    }
                });

            });

        });

    }, []);

    return (
        <>
            <Section title={"Populares"}>
                <div className="artist-tracks-wrapper">
                    {topTracks.map((track, index) => (
                        <TrackRow track={track} key={index} />
                    ))}
                </div>
            </Section>

            {data.albums.albums.length > 0 ?
                <Section title={"Álbuns"}>
                    <div className="artist-albuns-wrapper">
                        {data.albums.albums.map((album, index) => (
                            <AlbumItem album={album} key={index} />
                        ))}
                    </div>
                </Section> : <></>
            }

            {data.albums.singles.length > 0 ?
                <Section title={"Singles e EPs"}>
                    <div className="artist-albuns-wrapper">
                        {data.albums.singles.map((single, index) => (
                            <AlbumItem album={single} key={index} />
                        ))}
                    </div>
                </Section> : <></>
            }

            {data.albums.compilations.length > 0 ?
                <Section title={"Compilações"}>
                    <div className="artist-albuns-wrapper">
                        {data.albums.compilations.map((compilation, index) => (
                            <AlbumItem album={compilation} key={index} />
                        ))}
                    </div>
                </Section> : <></>
            }

            {data.albums.appears_on.length > 0 ?
                <Section title={"Aparece em"}>
                    <div className="artist-albuns-wrapper">
                        {data.albums.appears_on.map((appears_on, index) => (
                            <AlbumItem album={appears_on} key={index} />
                        ))}
                    </div>
                </Section> : <> </>
            }
        </>
    )
}

const ArtistRelatedArtistsView = ({ id }) => {

    const artistId = id;
    const authorizationData = getToken();
    const [relatedArtists, setRelatedArtists] = useState([]);

    useEffect(() => {
        getArtistRelatedArtists(authorizationData.access_token, artistId).then((response) => {
            console.log(response);
            setRelatedArtists(response);
        });
    }, [])

    return (
        <div className="related-artists-wrapper">
            {relatedArtists.map((artist, index) => (
                <ArtistItem key={index} name={artist.name} photoUrl={(artist.images[0] ? artist.images[0].url : "")} id={artist.id} />
            ))}
        </div>
    )
}

const ArtistViewSwitches = ({ id }) => {
    const artistId = id;

    const [activeView, setActiveView] = useState(0);

    return (
        <div className="artist-view-switches">
            <div className="artist-view-switch-wrapper">
                <Link className={"artist-view-switch" + (activeView === 0 ? " active-view" : "")} onClick={() => setActiveView(0)} to={"/artista/" + artistId}>
                    <div>
                        Visão geral
                    </div>
                </Link>

                <Link className={"artist-view-switch" + (activeView === 1 ? " active-view" : "")} onClick={() => setActiveView(1)} to={"/artista/" + artistId + "/related-artists"}>
                    <div>
                        Artistas Relacionados
                    </div>
                </Link>
            </div>
        </div >
    )
}

const ArtistPage = ({ match }) => {

    const artistId = match.params.id;

    return (
        <div className="artist-wrapper">

            <div className="artist-info">

            </div>

            <ArtistViewSwitches id={artistId} />

            <div className="artist-view">
                <Route exact={true} path={"/artista/:id"}>
                    <MainArtistView id={artistId} />
                </Route>
                <Route path={"/artista/:id/related-artists"}>
                    <ArtistRelatedArtistsView id={artistId} />
                </Route>
            </div>

            <div>

            </div>
        </div>
    )
}

export default withRouter(ArtistPage);