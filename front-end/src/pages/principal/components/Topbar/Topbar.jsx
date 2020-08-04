import React from "react";

import { withRouter, Link, Switch, Route } from "react-router-dom";

import "./topbar.css";
import { useEffect } from "react";
import { useState } from "react";

const InputSearch = ({ history, match }) => {

    const [query, setInputQuery] = useState("");

    let timeout;

    const changeSearch = (e) => {
        e.persist();

        setInputQuery(e.target.value);

        if (timeout)
            clearTimeout(timeout);

        timeout = setTimeout(() => {
            history.push("/search/" + e.target.value);
            console.log(timeout);
        }, 1500);
    }

    return (
        <div className="search-input">
            <svg className="search-input-icon" height="24" role="img" width="24" viewBox="0 0 512 512" aria-hidden="true"><path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentColor"></path></svg>
            <input autoFocus placeholder="Busque artistas, músicas ou podcasts" value={query} onChange={changeSearch}></input>
        </div>
    );
}

const TopbarLink = withRouter(({ history, to = "", children }) => {

    useEffect(() => {

    }, [history.location.pathname]);

    return (
        <Link to={to} className={"topbar-button " + (history.location.pathname === to ? "active" : "")}>
            {children}
        </Link>
    )
});

const Topbar = ({ history, match }) => {

    const goBack = () => {
        history.goBack();
    }

    const goForward = () => {
        history.goForward();
    }

    return (
        <div className="topbar">

            <div className="arrows">
                <div className="left-arrow" onClick={goBack}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                        <path d="M15.54 21.15L5.095 12.23 15.54 3.31l.65.76-9.555 8.16 9.555 8.16"></path>
                    </svg>
                </div>

                <div className="right-arrow" onClick={goForward}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                        <path d="M7.96 21.15l-.65-.76 9.555-8.16L7.31 4.07l.65-.76 10.445 8.92"></path>
                    </svg>
                </div>
            </div>

            <Switch>
                <Route path="/search">
                    <InputSearch history={history} match={match} />
                </Route>
                <Route path="/collection">
                    {() => {

                        return (
                            <nav className="topbar-buttons">
                                <TopbarLink to="/collection/playlists">Playlists</TopbarLink>
                                <TopbarLink to="/collection/podcasts">Podcasts</TopbarLink>
                                <TopbarLink to="/collection/artistas">Artistas</TopbarLink>
                                <TopbarLink to="/collection/albuns">Álbuns</TopbarLink>
                            </nav>
                        )
                    }}
                </Route>
                <Route exact path="">
                    {() => (<></>)}
                </Route>
            </Switch>

        </div>
    );
};

export default withRouter(Topbar);