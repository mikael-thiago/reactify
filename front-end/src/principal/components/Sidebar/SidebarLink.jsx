import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../contexts/userContext";

const SidebarLink = ({ name, to = "", xmlns = "", d = "", active = "", setActive, setRoute }) => {

    const activeClass = (active === name) ? " active" : "";

    const handleClick = () => {
        setRoute(name);
        setActive(name);
    }

    if (activeClass === " active") {
        setRoute(name);
    }

    return (
        <div className={"sidebar-item" + activeClass} onClick={handleClick}>
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