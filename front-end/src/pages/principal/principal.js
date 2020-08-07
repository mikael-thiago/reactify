import React, { useEffect, useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

//Components
import Player from "./components/Player/Player";
import Inicio from "./routes/Inicio/Inicio";
import Sidebar from "./components/Sidebar/Sidebar";
import SearchPage from "./routes/Search/Search";
import AlbumPage from "./routes/Album/Album";
import Topbar from "./components/Topbar/Topbar";
import ArtistPage from "./routes/Artist/Artist";
import CollectionPage from "./routes/Collection/Collection";

//Redux
import reduxStore from "../../redux/store/store.js";
import { Provider } from "react-redux";

//Token Services
import { getToken } from "../../services/token_manipulation";

//Styles
import "./principal.css";

const Body = () => {

    return (
        <div className="body">
            <Topbar />
            <Switch>
                <Route path="/on/search/:query">
                    <SearchPage />
                </Route>
                <Route path="/on/collection">
                    <CollectionPage />
                </Route>
                <Route path="/on/album/:id">
                    <AlbumPage />
                </Route>
                <Route path="/on/artista/:id">
                    <ArtistPage />
                </Route>
                <Route exact path="/on">
                    <Inicio />
                </Route>
            </Switch>

        </div>
    );
}

const Principal = ({ history }) => {

    const [tokenChecked, setTokenChecked] = useState(false);

    useEffect(() => {
        if (getToken() === null || getToken() === undefined) history.push("/");
        else setTokenChecked(true);
    }, []);

    return (
        tokenChecked ?
            (<>
                <Provider store={reduxStore}>

                    <div className="principal-wrapper">
                        <Sidebar />
                        <Body />
                        <Player />
                    </div>

                </Provider>
            </>): (<></>)
    )
}

export default withRouter(Principal);