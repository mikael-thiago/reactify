import React, { useState, useEffect, useContext, useMemo } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./principal.css";
import Inicio from "./components/Inicio/Inicio";
import Sidebar from "./components/Sidebar/Sidebar";
import SearchPage from "./components/Search/Search";

const Topbar = ({ query, setQuery, route }) => {

    let SidebarAdition;

    if (route === "Início") {
        SidebarAdition = () => (<></>);
    } else if (route === "Buscar") {
        SidebarAdition = () => (
            <div className="search-input">
                <svg className="search-input-icon" height="24" role="img" width="24" viewBox="0 0 512 512" aria-hidden="true"><path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentColor"></path></svg>
                <input autoFocus placeholder="Busque artistas, músicas ou podcasts" value={query} onChange={e => setQuery(e)}></input>
            </div>
        );
    } else {
        SidebarAdition = () => (<div className="topbar-buttons">
            <button className="topbar-button">Playlists</button>
            <button className="topbar-button">Podcasts</button>
            <button className="topbar-button">Artistas</button>
            <button className="topbar-button">Álbuns</button>
        </div>);
    }

    return (
        <div className="topbar">

            <div className="arrows">
                <div className="left-arrow">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                        <path d="M15.54 21.15L5.095 12.23 15.54 3.31l.65.76-9.555 8.16 9.555 8.16"></path>
                    </svg>
                </div>

                <div className="right-arrow">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                        <path d="M7.96 21.15l-.65-.76 9.555-8.16L7.31 4.07l.65-.76 10.445 8.92"></path>
                    </svg>
                </div>
            </div>

            <SidebarAdition />

        </div>
    );
};

const Body = ({ match, history, route }) => {
    const [query, setQuery] = useState("");

    const handleSearchChange = (e) => {

        setQuery(e.target.value)
    }

    return (
        <div className="body">
            <Topbar route={route} query={query} setQuery={handleSearchChange} />
            <Switch>
                <Route exact={true} path={`${match.url}`}>
                    <Inicio />
                </Route>
                <Route exact={true} path={`${match.url}/search`}>
                    <SearchPage query={query} />
                </Route>
            </Switch>

        </div>
    );
}

const Player = () => {
    return (
        <div className="player">
            <h1>ETA</h1>
        </div>
    )
}
const Principal = ({ match, history }) => {

    const [route, setRoute] = useState("Início");

    return (
        <>
            <Router>
                <Sidebar setRoute={setRoute} match={match} history={history} />
                <Body route={route} match={match} history={history} />
                <Player />
            </Router>
        </>
    )
}

export default Principal;