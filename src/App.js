import { useRef, useState } from 'react';
import './App.css';

function App() {

  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: 'Summer Love',
    songArtist: 'Jessie Villa',
    songSrc: './songs/watermarked_Jessie_Villa_Summer_Love_lead_vocal_3_37.mp3',
    SongAvatar: './images/pexels-nicole-avagliano-1132392-2236713.jpg'
  })
  
  //UseState Variables
  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState('04 : 38');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
  const [videoIndex, setVideoIndex] = useState(0);

  const currentAudio = useRef();

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;
  }

  // Change Avatar Class
  let avatarClass = ['objectFitCover', 'objectFitContain', 'none']
  const [avatarClassIndex, setAvatarClassIndex] = useState(0);
  const handleAvatar = () => {
    if (avatarClassIndex >= avatarClass.length - 1) {
      setAvatarClassIndex(0);
    }
    else {
      setAvatarClassIndex(avatarClassIndex + 1);
    }
  }

  //Play Audio Function
  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    }
    else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  }

  const musicAPI = [
    { 
      songName: 'Summer Love',
      songArtist: 'Jessie Villa',
      songSrc: './songs/watermarked_Jessie_Villa_Summer_Love_lead_vocal_3_37.mp3',
      SongAvatar: './images/pexels-nicole-avagliano-1132392-2236713.jpg'
    },

    { songName: 'Start All Over',
      songArtist: 'Cira Grandi',
      songSrc: './songs/watermarked_Cira_Grandi_Start_All_Over_lead_vocal_2_18.mp3',
      SongAvatar: './images/pexels-suissounet-2101187.jpg'
    },

    { songName: 'Invincible',
      songArtist: 'Grace McCoy',
      songSrc: './songs/watermarked_Grace_McCoy_Invincible_lead_vocal_2_50.mp3',
      SongAvatar: './images/pexels-kqpho-1583582.jpg'
    },

    { songName: 'Soul Sister',
      songArtist: 'Lunareh',
      songSrc:'./songs/watermarked_Lunareh_Soul_Sister_background_vocals_3_31.mp3',
      SongAvatar: './images/pexels-jhawley-21323.jpg'
    },

    { songName:  `I wouldn't Mind`,
      songArtist: 'Cowbow Kelly',
      songSrc: './songs/watermarked_Cowboy_Kelly_I_Wouldn_t_Mind_lead_vocal_3_52.mp3',
      SongAvatar: './images/pexels-tobiasbjorkli-2239485.jpg'
    }
  ]


  const handleNextSong = () => {
    if (musicIndex >= musicAPI.length - 1) {
      let setNumber = 0;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
    else {
      let setNumber = musicIndex + 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  }

  const handlePrevSong = () => {
    if (musicIndex === 0) {
      let setNumber = musicAPI.length - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
    else {
      let setNumber = musicIndex - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  }

  const updateCurrentMusicDetails = (number) => {
    let musicObject = musicAPI[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      SongAvatar: musicObject.SongAvatar
    })
    setIsAudioPlaying(true);
  }

  const handleAudioUpdate = () => {
    // Input total length of the audio
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes < 10 ? `0${minutes}` :minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
    setMusicTotalLength(musicTotalLength0);

    // Input Music Current Time
    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` :currentMin} : ${currentSec < 10 ? `0${currentSec}` : currentSec}`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
    setAudioProgress(isNaN(progress)? 0 : progress)
  }

  const vidArray = ['./videos/5117938-hd_1920_1080_24fps.mp4', './videos/854999-uhd_3840_2160_30fps.mp4', './videos/4130872-uhd_3840_2160_25fps.mp4', './videos/8419548-hd_1080_1080_30fps.mp4', './videos/3044098-hd_1920_1080_30fps.mp4'];

  const handleChangeBackground = () => {
    if (videoIndex >= vidArray.length - 1){
      setVideoIndex(0);
    }
    else {
      setVideoIndex(videoIndex + 1)
    }
  }


  return (
    <>
    <div className="container">
      <audio src='./public/songs/watermarked_Jessie_Villa_Summer_Love_lead_vocal_3_37.mp3' ref={currentAudio} onEnded={handleNextSong} onTimeUpdate={handleAudioUpdate}></audio>
      <video src={vidArray[videoIndex]} loop muted autoPlay className='backgroundVideo'></video>
      <div className="blackScreen"></div>
      <div className="music-Container">
        <p className='musicPlayer'>Music Player</p>
        <p className='music-Head-Name'> {currentMusicDetails.songName}</p>
        <p className='music-Artist-Name'>{currentMusicDetails.songArtist}</p>
        <img src={currentMusicDetails.SongAvatar} className={avatarClass[avatarClassIndex]} onClick={handleAvatar} alt="song Avatar" id='songAvatar'/>
      <div className="musicTimerDiv">
        <p className='musicCurrentTime'>{musicCurrentTime}</p>
        <p className='musicTotalLength'>{musicTotalLength}</p>
      </div>
      <input type="range" name="musicProgressBar" className='musicProgressBar' value={audioProgress} onChange={handleMusicProgressBar}/>
      <div className="musicControlers">
        <i className='fa-solid fa-backward musicControler' onClick={handlePrevSong}></i>
        <i className={`fa-solid ${isAudioPlaying? 'fa-pause-circle' : 'fa-circle-play'} playBtn`} onClick={handleAudioPlay}></i>
        <i className='fa-solid fa-forward musicControler' onClick={handleNextSong}></i>
      </div>
      </div>

      <div className="changeBackButton" onClick={handleChangeBackground}> Change Background
      </div>
    </div>
    </>
  );
}

export default App;
