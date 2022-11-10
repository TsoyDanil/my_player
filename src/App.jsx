import React, {useRef, useState} from 'react';
import Musicinfo from './components/Musicinfo/Musicinfo';
import Controlmenu from './components/Controlmenu/Controlmenu';
import './App.css';


function App() {
  const [songAlbum, setAlbum] = useState([
    {name: 'Fields of Verdun', author: 'Sabaton', src: "./music/Sabaton - Fields of Verdun.mp3"}, 
    {name: 'Father And Son', author: 'Cat Stevens', src: "./music/Cat Stevens - Father And Son.mp3"},
    {name: 'Hurt', author: 'Johnny Cash', src: "./music/Johnny Cash - Hurt.mp3"}
  ])

  const [range, setRange] = useState(0)

  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef(null)

  const [currentSong, setCurrentSong] = useState(songAlbum[0])

  const playStop = () => {
    if (isPlaying){
      audioRef.current.pause()
    }
    else{
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const sliderOnChange = () => {
    
  }

  const turnNextSong = (currentSongName) => {
    let index = songAlbum.findIndex(song => song.name === currentSongName)
    index = index + 1
    if (index >= songAlbum.length){
      index = 0
    }
    setCurrentSong(songAlbum[index])
    setIsPlaying(true)
    audioRef.current.autoplay = true
  }

  const turnPrevSong = (currentSongName) => {
    let index = songAlbum.findIndex(song => song.name === currentSongName)
    index = index - 1
    if (index < 0){
      index = songAlbum.length - 1
    }
    setCurrentSong(songAlbum[index])
    setIsPlaying(true)
    audioRef.current.autoplay = true
  }

  const showTime = () => {
    console.log(audioRef.current.currentTime)
  }

  const slideHandler = () => {
    const sliderTime = (audioRef.current.currentTime / audioRef.current.duration) * 100
    if (!isNaN(sliderTime)){
      setRange(sliderTime)
    }
  }

  const audio = 
      <audio
      ref = {audioRef}
      src= {currentSong.src}
      onEnded={() => {turnNextSong(currentSong.name)}}
      onTimeUpdate = {slideHandler}
    />

  const musicInfo = 
  <Musicinfo
    musicName = {currentSong.name}
    musicAuthor = {currentSong.author}
    sliderValue = {range}
    onChange = {sliderOnChange}
    
  />
  
  const controlMenu =  
  <Controlmenu
      mainActionClassName = {!isPlaying ? 'main_action_button_play' : 'main_action_button_pause'}
      mainAction = {playStop}
      turnPrevSong = {() => {turnPrevSong(currentSong.name)}}
      turnNextSong = {() => {turnNextSong(currentSong.name)}}
  />

  return (
    <div className='App_container'>
      <div className='App_inner_container'>
        {audio}
        {musicInfo}
        {controlMenu}
      </div>
    </div>
  );
}

export default App;
