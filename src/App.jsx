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

  const audio = 
      <audio
      ref = {audioRef}
      src= {currentSong.src}
      onEnded={() => {turnNextSong(currentSong.name)}}
    />

  const musicInfo = 
  <Musicinfo
    musicName = {currentSong.name}
    musicAuthor = {currentSong.author}
  />
  
  const controlMenu =  
  <Controlmenu
      mainActionText = {isPlaying ? "STOP" : "PLAY"}
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
