import React from "react";
import "./Musicinfo.css"

const Musicinfo = (props) => {
    return (
        <div className="Musicinfo_container">
            <h1 className="Music_name">{props.musicName}</h1>
            <h2 className="Music_author">{props.musicAuthor}</h2>
        </div>
    )
}

export default Musicinfo