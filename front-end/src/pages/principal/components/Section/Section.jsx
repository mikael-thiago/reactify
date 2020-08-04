import React, { useRef, useEffect } from "react";
import "./section.css";


const Section = ({ children, showMore = false, row = false, title = "", rowsToShow }) => {

    const buttonRef = useRef(), sectionRef = useRef();

    var maxHeight;
    const toggleSectionWrap = (ref, buttonRef) => {
        if (buttonRef.current.textContent === "VER TUDO") {
            maxHeight = ref.current.style.maxHeight;
            ref.current.style.maxHeight = "100%";
            buttonRef.current.textContent = "VER MENOS";
        } else {
            ref.current.style.maxHeight = maxHeight;
            buttonRef.current.textContent = "VER TUDO";
        }
    }

    useEffect(() => {
        const child = sectionRef.current.children.item(0);

        if (child && rowsToShow) {
            sectionRef.current.style.maxHeight = ((parseInt(getComputedStyle(child).height) + parseInt(getComputedStyle(child).marginTop) + parseInt(getComputedStyle(child).marginBottom)) * rowsToShow) + "px";
        }


    })

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