import React, { useRef, useEffect, useCallback } from "react";
import "./section.css";
import { useState } from "react";
import { useLayoutEffect } from "react";


const Section = ({ children, showMore = false, row = false, title = "", rowsToShow }) => {

    const buttonRef = useRef(), sectionRef = useRef();

    const toggleSectionWrap = (ref, buttonRef) => {
        if (buttonRef.current.textContent === "VER TUDO") {
            ref.current.style.maxHeight = "100%";
            buttonRef.current.textContent = "VER MENOS";
        } else {
            ref.current.style.maxHeight = "";
            buttonRef.current.textContent = "VER TUDO";
        }
    }

    useEffect(() => {
        const child = sectionRef.current.children.item(0);

        if (child && rowsToShow) {
            sectionRef.current.style.maxHeight = ((parseInt(getComputedStyle(child).height) + parseInt(getComputedStyle(child).marginTop) + parseInt(getComputedStyle(child).marginBottom)) * rowsToShow) + "px";
            console.log(sectionRef.current.style.maxHeight);
        }
    }, [])

    return (
        <section className="section">
            <span className="section-span">
                <div className="section-title">
                    {title}
                </div>
                {showMore ? (
                    <button ref={buttonRef} onClick={() => toggleSectionWrap(sectionRef, buttonRef)}>
                        VER TUDO
                    </button>) : (<></>)
                }
            </span>
            <div className={"section-content " + (row ? "row-content" : "column-content")} ref={sectionRef}>
                {children}
            </div>
        </section>
    );
}

export default Section;