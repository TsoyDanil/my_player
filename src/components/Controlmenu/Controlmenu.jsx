import React from "react";
import './Controlmenu.css'

const Controlmenu = (props) => {
    return (
        <div className="Controlmenu">
            <button className="skip_button" onClick={props.turnPrevSong}>PREV</button>
            <button className="main_action_button" onClick={props.mainAction}>{props.mainActionText}</button>
            <button className="skip_button" onClick={props.turnNextSong}>NEXT</button>
        </div>
    )
}

export default Controlmenu