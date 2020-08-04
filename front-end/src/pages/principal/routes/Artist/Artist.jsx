import React, { useState } from "react";
import "./artist.css";
import { useEffect } from "react";
import { getArtistTopTracks, getArtistAlbums, getArtistRelatedArtists, getArtist } from "../../../../api-calls/api-calls";
import { getToken } from "../../../../services/token_manipulation";
import { withRouter, Link, Route } from "react-router-dom";

import { ArtistItem } from "../../components/ContentItem/ContentItem";
import Section from "../../components/Section/Section";
import TrackRow from "../../components/TrackRow/TrackRow.jsx"


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
            <Section row title={"Populares"}>
                {topTracks.map((track, index) => (
                    <TrackRow showArtists track={track} key={index} />
                ))}
            </Section>

            {data.albums.albums.length > 0 ?
                <Section rowsToShow={2} title={"Álbuns"}>
                    {data.albums.albums.map((album, index) => (
                        <AlbumItem album={album} key={index} />
                    ))}
                </Section> : <></>
            }

            {data.albums.singles.length > 0 ?
                <Section rowsToShow={2} title={"Singles e EPs"}>

                    {data.albums.singles.map((single, index) => (
                        <AlbumItem album={single} key={index} />
                    ))}

                </Section> : <></>
            }

            {data.albums.compilations.length > 0 ?
                <Section rowsToShow={2} title={"Compilações"}>

                    {data.albums.compilations.map((compilation, index) => (
                        <AlbumItem album={compilation} key={index} />
                    ))}

                </Section> : <></>
            }

            {data.albums.appears_on.length > 0 ?
                <Section rowsToShow={2} title={"Aparece em"}>

                    {data.albums.appears_on.map((appears_on, index) => (
                        <AlbumItem album={appears_on} key={index} />
                    ))}

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

const ArtistInfoBanner = ({ id }) => {
    const artistId = id;
    const authorizationData = getToken();

    const [artist, setArtist] = useState({});

    useEffect(() => {
        getArtist(authorizationData.access_token, artistId).then((response) => {
            console.log(response.data);
            setArtist(response.data);
        })
    }, []);

    return (
        <header className="artist-info">
            <div className="artist-name">
                {artist.name}
            </div>
            <div className="artist-followers">
                {(artist.followers ? artist.followers.total : "") + " seguidores"}
            </div>
        </header>
    )
}

const ArtistPage = ({ match }) => {

    const artistId = match.params.id;

    return (
        <div className="artist-wrapper">

            <ArtistInfoBanner id={artistId} />

            <ArtistViewSwitches id={artistId} />

            <div className="artist-view">
                <Route path={"/artista/:id/related-artists"}>
                    <ArtistRelatedArtistsView id={artistId} />
                </Route>
                <Route exact path={"/artista/:id"}>
                    <MainArtistView id={artistId} />
                </Route>
            </div>

            <div>

            </div>
        </div>
    )
}

export default withRouter(ArtistPage);