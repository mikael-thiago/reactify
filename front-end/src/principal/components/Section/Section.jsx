import React, { useRef } from "react";
import "./section.css";

const Section = ({ children, options = { showMore: false }, title = "" }) => {
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

    return (
        <div className="section">
            <div className="section-span">
                <div className="section-title">
                    {title}
                </div>
                {options.showMore ? (
                    <button ref={buttonRef} onClick={() => toggleSectionWrap(sectionRef, buttonRef)}>
                        VER TUDO
                    </button>) : (<></>)
                }
            </div>
            <div className="section-content" ref={sectionRef}>
                {children}
            </div>
        </div>
    );
}

export default Section;