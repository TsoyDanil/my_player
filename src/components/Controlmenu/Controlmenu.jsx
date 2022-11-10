import React from "react";
import './Controlmenu.css'

const Controlmenu = (props) => {
    return (
        <div className="Controlmenu">
            <button className="skip_button prev_slip" onClick={props.turnPrevSong}></button>
            <button className={props.mainActionClassName} onClick={props.mainAction}></button>
            <button className="skip_button next_skip" onClick={props.turnNextSong}></button>
        </div>
    )
}

export default Controlmenu