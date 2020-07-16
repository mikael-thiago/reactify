import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../contexts/userContext";
import SidebarLink from "./SidebarLink";

import "./sidebar.css";
import { getMyPlaylists } from "../../../api-calls/api-calls";

import logo from "../../../images/logo.png";

const PlaylistItem = ({ name = "" }) => {
    return (
        <div className="sidebar-playlist-item">
            {name}
        </div>
    )
}

const Sidebar = ({ match, history, setRoute }) => {
    const userContext = useContext(UserContext);
    const [itemActive, setItemActive] = useState(null);
    const [playlists, setPlaylists] = useState([]);

    const logout = () => {
        userContext.logout();
        history.push("/");
    }

    useEffect(() => {
        if (userContext.access_token !== null) {
            getMyPlaylists(userContext.access_token).then((response) => {
                setPlaylists(response.data.items);
            });
        }

        if (!itemActive) {
            const route = window.location.href.split("/")[window.location.href.split("/").length - 1];
            if (route === "search")
                setItemActive("Buscar");
            else if (route === "inicio")
                setItemActive("Início");
            else if (route === "#2")
                setItemActive("Sua Biblioteca");
        }

    }, [userContext.access_token]);

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <img src={logo} alt=""></img>
            </div>
            <div className="sidebar-body">
                <div className="sidebar-body-navs">
                    <SidebarLink setActive={setItemActive} setRoute={setRoute} name="Início" to={`${match.url}/inicio`} xmlns="http://www.w3.org/2000/svg" d="M448 463.746h-149.333v-149.333h-85.334v149.333h-149.333v-315.428l192-111.746 192 110.984v316.19z" active={itemActive} />
                    <SidebarLink setActive={setItemActive} setRoute={setRoute} name="Buscar" to={`${match.url}/search`} xmlns="http://www.w3.org/2000/svg" d="M357.079 341.334l94.476 110.73-32.508 27.683-94.222-110.476q-45.714 30.476-100.826 30.476-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 23.365-5.841 45.714t-16.635 41.651-25.778 35.555zM224 357.079q28.19 0 53.841-11.048t44.19-29.587 29.587-44.19 11.048-53.841-11.048-53.841-29.587-44.191-44.19-29.587-53.841-11.047-53.841 11.047-44.191 29.588-29.587 44.19-11.047 53.841 11.047 53.841 29.588 44.19 44.19 29.587 53.841 11.048z" active={itemActive} />
                    <SidebarLink setActive={setItemActive} setRoute={setRoute} name="Sua Biblioteca" to={`${match.url}/#2`} xmlns="http://www.w3.org/2000/svg" d="M311.873 77.46l166.349 373.587-39.111 17.27-166.349-373.587zM64 463.746v-384h42.666v384h-42.666zM170.667 463.746v-384h42.667v384h-42.666z" active={itemActive} />
                </div>
                <div className="sidebar-body-playlists">
                    <div className="sidebar-body-playlists-title">
                        PLAYLISTS
                    </div>

                    <div className="sidebar-body-playlists-items">

                        <div className={"sidebar-item"}>
                            <button>
                                <svg className="sidebar-item-icon" shapeRendering="crispEdges" style={{ backgroundColor: "currentColor", padding: "4px" }} shapeRendering="crispEdges" viewBox="0 0 36 36" width="26" height="26"><path d="m28 20h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z">                                </path>
                                </svg>
                                <div className="sidebar-item-name">
                                    Criar playlist
                                </div>
                            </button>
                        </div>

                        <SidebarLink setActive={setItemActive} name="Músicas Curtidas" />
                    </div>

                </div>

                <div className="sidebar-body-playlists-divider"></div>

                <div className="sidebar-body-playlists">
                    <div className="sidebar-body-playlists-items">
                        {playlists.map((playlist, index) => (<PlaylistItem key={index} name={playlist.name} />))}
                    </div>
                </div>

                <div>
                    <button onClick={logout}>Sair</button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;