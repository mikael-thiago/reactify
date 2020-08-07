import React from "react";
import { Switch, Route } from "react-router-dom";

import PlaylistView from "./routes/Playlists/Playlists";
import PodcastsView from "./routes/Podcasts/Podcasts";
import ArtistsView from "./routes/Artistas/Artistas";
import AlbunsView from "./routes/Albuns/Albuns";

import "./collection.css";

const CollectionPage = () => {
    return (
        <div className="collection-wrapper">
            <Switch>
                <Route exact={true} path="/on/collection/playlists">
                    <PlaylistView />
                </Route>
                <Route path="/on/collection/podcasts">
                    <PodcastsView />
                </Route>
                <Route path="/on/collection/artistas">
                    <ArtistsView />
                </Route>
                <Route path="/on/collection/albuns">
                    <AlbunsView />
                </Route>
            </Switch>
        </div>
    )
}

export default CollectionPage;