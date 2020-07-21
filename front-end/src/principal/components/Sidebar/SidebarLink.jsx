import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setRoute } from "../../../redux/slices/routeSlice";
import { useState } from "react";
import { useEffect } from "react";
import { searchSlice } from "../../../redux/slices/searchSlice";

const SidebarLink = ({ name, to = "", xmlns = "", d = "", id = null, history }) => {

    const [active, setActive] = useState(false);

    const activeClass = active ? " active" : "";

    useEffect(() => {
        let splitedPathName = history.location.pathname.split("/");

        if (id !== "") {
            if (splitedPathName.includes(id)) {
                setActive(true);
            } else {
                setActive(false);
            }
        } else {
            let activate = true;

            for (var index in splitedPathName) {
                if (splitedPathName[index] !== "") activate = false;
            }

            setActive(activate);
        }

    }, [history.location.pathname])

    return (
        <div className={"sidebar-item" + activeClass} >
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

export default withRouter(SidebarLink);