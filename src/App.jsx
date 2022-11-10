import React, {useRef, useState} from 'react';
import Musicinfo from './components/Musicinfo/Musicinfo';
import Controlmenu from './components/Controlmenu/Controlmenu';
import './App.css';


function App() {
  const [songAlbum, setAlbum] = useState([
    {name: 'Fields of Verdun', author: 'Sabaton', src: "./music/Sabaton - Fields of Verdun.mp3", image: 'https://i1.sndcdn.com/artworks-0IhPEXSAPYKk-0-t240x240.jpg'}, 
    {name: 'Father And Son', author: 'Cat Stevens', src: "./music/Cat Stevens - Father And Son.mp3", image: 'https://images.genius.com/f6265a2ae92f9e485a7680801a72953a.500x500x1.jpg'},
    {name: 'Hurt', author: 'Johnny Cash', src: "./music/Johnny Cash - Hurt.mp3", image: 'https://i.scdn.co/image/ab67616d0000b2736f4f62da3d811b6501a69ffa'}
  ])

  const [range, setRange] = useState(0)

  const [trackDuration, setTrackDuration] = useState(0)

  const [currentTime, setCurrentTime] = useState(0)

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

  const handleChanges = () => {
    const sliderTime = (audioRef.current.currentTime / audioRef.current.duration) * 100
    if (!isNaN(sliderTime)){
      setRange(sliderTime)
      const minuteDuration = Math.floor(audioRef.current.duration / 60) 
      const secondsDuration = Math.floor(audioRef.current.duration - minuteDuration*60)
      const currentMinute = Math.floor(audioRef.current.currentTime / 60) 
      const currentSecond = Math.floor(audioRef.current.currentTime - currentMinute*60)
      let minuteHolder = ''
      if (minuteDuration >= 10){
        minuteHolder = minuteDuration
      } else{
        minuteHolder = '0' + minuteDuration
      }
      let secondsHolder = ''
      if (secondsDuration >= 10){
        secondsHolder = secondsDuration
      } else{
        secondsHolder = '0' + secondsDuration
      }
      setTrackDuration(`${minuteHolder}:${secondsHolder}`)

      if (currentMinute < 1){
        minuteHolder = '0' + '0'
      } else if(currentMinute >= 1 && currentMinute < 10){
        minuteHolder = '0' + currentMinute
      } else{
        minuteHolder = currentMinute
      }

      if (currentSecond < 1){
        secondsHolder = '0' + '0'
      } else if(currentSecond >= 1 && currentSecond < 10){
        secondsHolder = '0' + currentSecond
      } else{
        secondsHolder = currentSecond
      }

      setCurrentTime(`${minuteHolder}:${secondsHolder}`)
    }
  }

  const audio = 
      <audio
      ref = {audioRef}
      src= {currentSong.src}
      onEnded={() => {turnNextSong(currentSong.name)}}
      onTimeUpdate = {handleChanges}
    />

  const musicInfo = 
  <Musicinfo
    musicName = {currentSong.name}
    musicAuthor = {currentSong.author}
    songImage = {currentSong.image}
    sliderValue = {range}
    onChange = {sliderOnChange}
    trackDuration = {trackDuration}
    currentTime = {currentTime}
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
