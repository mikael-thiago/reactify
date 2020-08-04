import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./principal.css";

import Player from "./components/Player/Player";

import Inicio from "./routes/Inicio/Inicio";
import Sidebar from "./components/Sidebar/Sidebar";
import SearchPage from "./routes/Search/Search";

import reduxStore from "../../redux/store/store.js";
import { Provider } from "react-redux";
import AlbumPage from "./routes/Album/Album";
import Topbar from "./components/Topbar/Topbar";
import ArtistPage from "./routes/Artist/Artist";
import CollectionPage from "./routes/Collection/Collection";

const Body = () => {

    return (
        <div className="body">
            <Topbar />
            <Switch>
                <Route path={"/search/:query"}>
                    <SearchPage />
                </Route>
                <Route path={"/collection"}>
                    <CollectionPage />
                </Route>
                <Route path={"/album/:id"}>
                    <AlbumPage />
                </Route>
                <Route path={"/artista/:id"}>
                    <ArtistPage />
                </Route>
                <Route exact={true} path={"/"}>
                    <Inicio />
                </Route>
            </Switch>

        </div>
    );
}

const Principal = ({ match, history, setLoggedIn }) => {

    const store = reduxStore;

    return (
        <>
            <Provider store={reduxStore}>
                <Router>
                    <div className="principal-wrapper">
                        <Sidebar setLoggedIn={setLoggedIn} match={match} history={history} />
                        <Body match={match} history={history} />
                        <Player match={match} />
                    </div>
                </Router>
            </Provider>
        </>
    )
}

export default Principal;