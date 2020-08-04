import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

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
        <Link className={"sidebar-item" + activeClass} to={to}>
            <i className="sidebar-item-icon">
                <svg viewBox="0 0 512 512" width="24" height="24" xmlns={xmlns}><path d={d} fill="currentColor">
                </path>
                </svg>
            </i>
            <div className="sidebar-item-name">
                {name}
            </div>
        </Link>
    );
}

export default withRouter(SidebarLink);