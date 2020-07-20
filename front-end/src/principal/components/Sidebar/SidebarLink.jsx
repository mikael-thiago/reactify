import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SidebarLink = ({ name, to = "", xmlns = "", d = "" }) => {

    const routeState = useSelector((state) => state.route);

    const activeClass = (routeState.route === name) ? " active" : "";

    return (
        <div className={"sidebar-item" + activeClass}>
            <Link to={to}>
                <div className="sidebar-item-icon">
                    <svg viewBox="0 0 512 512" width="24" height="24" xmlns={xmlns}><path d={d} fill="currentColor">
                    </path>
                    </svg>
                </div>
                <div className="sidebar-item-name">
                    {name}
                </div>
            </Link>
        </div>
    );
}

export default SidebarLink;