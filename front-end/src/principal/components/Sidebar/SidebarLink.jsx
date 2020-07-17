import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setRoute } from "../../../redux/slices/routeSlice.js";
import { setActiveItem } from "../../../redux/slices/sidebarSlice.js";

const SidebarLink = ({ name, to = "", xmlns = "", d = "" }) => {

    const sidebarState = useSelector((state) => state.sidebar);

    const activeClass = (sidebarState.activeItem === name) ? " active" : "";

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setRoute({ route: name }));
        dispatch(setActiveItem({ activeItem: name }));
    }

    if (activeClass === " active") {
        dispatch(setRoute({ route: name }));
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