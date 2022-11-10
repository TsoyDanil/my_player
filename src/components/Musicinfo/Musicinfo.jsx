import React from "react";
import "./Musicinfo.css"

const Musicinfo = (props) => {
    return (
        <div className="Musicinfo_container">
            <div className="Header_container">
                <h1 className="Music_name">{props.musicName}</h1>
                <h2 className="Music_author">{props.musicAuthor}</h2>
            </div>
            <img className="Song_image" src={props.songImage} alt="" />
            <div className="Music_time_info_container">
                <p className="Music_time_info_text">{props.currentTime}</p>
                <p className="Music_time_info_text">{props.trackDuration}</p>
            </div>
            <input className="Slider" type="range" value={props.sliderValue} onChange = {props.onChange}/>
        </div>
    )
}

export default Musicinfo