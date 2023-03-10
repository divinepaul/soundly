import { useEffect, useState, useRef, useContext } from "react";
import styles from '@/styles/Layout.module.css'
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import VolumeUp from '@mui/icons-material/VolumeUp';
import UserContext from "@/lib/usercontext";
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import MusicContext from "@/lib/musiccontext";

export default function Player() {

    let musicList = ["/api/file/2", "/api/file/3", "/api/file/4"];

    const [currrentMusic, setMusic] = useState(musicList[2]);

    const [currrentTime, setCurrentTime] = useState(0);

    const [volume, setVolume] = useState(100);

    const [isPlaying, setIsPlaying] = useState(false);

    const [music, setCurrentSong, setPlayList] = useContext(MusicContext);

    let player = useRef();


    useEffect(() => {
        if (music.currentSong) {
            console.log(music.currentSong);
            player.current.src = "/api/file/" + music.currentSong.music_id;
            player.current.volume = volume / 100;
            player.current.play();
            setIsPlaying(true);
        }
        console.log(music);
    }, [music]);


    useEffect(() => {
        if (music.currentSong) {
            player.current.src = "/api/file/" + music.currentSong.music_id;
        }
        setInterval(() => {
            if (music.currentSong) {
                if (!player.current.paused) {
                    setCurrentTime(player.current.currentTime);
                }
            }
        }, 1000);
    }, []);

    let toggleMusic = () => {
        if (player.current.paused) {
            player.current.volume = volume / 100;
            player.current.play();
            setIsPlaying(true);
        } else {
            player.current.pause();
            setIsPlaying(false);
        }
    }

    let changeMusic = async (music) => {
        //player.current.pause();
        //player.current.currentTime = 0;
        //setCurrentTime(0);
        //setMusic(music);
        //setIsPlaying(true);
    }

    let nextSong = async () => {
        if (music.currentSong) {

        }
    }

    let previousSong = async () => {
        if (music.currentSong) {

        }
    }

    const changePosition = (event, newValue) => {
        player.current.currentTime = newValue;
        setCurrentTime(newValue);
    };

    const changeVolume = (event, newValue) => {
        setVolume(newValue);
        player.current.volume = newValue / 100;
    };


    return (
        <div className={styles.bottomPlayer}>
            <audio ref={player} />
            <div className={styles.titleSection}>
                <div className={styles.titleSectionImage}>
                    {music.currentSong ?
                        <img src={"/api/image/music/"+music.currentSong.music_id}/>
                        : <></>}
                </div>

                <div>
                <p className={styles.musicTitle}>
                    {music.currentSong ?
                        music.currentSong.music_name
                        : <></>}
                </p>
                <div className={styles.controlsContainer}>
                    <IconButton>
                        <FastRewindRounded />
                    </IconButton>
                    <IconButton>

                        {!isPlaying ?
                            <PlayArrowRounded onClick={toggleMusic} fontSize="large" />
                            :
                            <PauseRounded onClick={toggleMusic} fontSize="large" />
                        }


                    </IconButton>
                    <IconButton aria-label="next song">
                        <FastForwardRounded />
                    </IconButton>
                </div>
                </div>



            </div>

            <div className={styles.durationContainer}>

                {player.current && player.current.duration ?
                    <Slider onChange={changePosition} size="small" value={Math.round(currrentTime)} min={0} max={player.current.duration} aria-label="Disabled slider" />
                    :
                    <Slider size="small" value={0} aria-label="Disabled slider" />
                }



                <div className={styles.durationTextContainer}>
                    <p>{Math.round(currrentTime / 60)}:{Math.round(currrentTime % 60).toString().slice(0, 2).padStart(2, '0')}</p>
                    {player.current && player.current.duration ?
                        <p>{Math.round(player.current.duration / 60)}:
                            {Math.round(player.current.duration % 60).toString().slice(0, 2).padStart(2, '0')}</p>
                        : <p>0:00</p>}
                </div>
            </div>
            <div className={styles.volumeContainer}>
                <VolumeUp style={{ margin: '10px' }} />
                <Slider size="small" value={volume} onChange={changeVolume} min={0} max={100} step={1} aria-label="Disabled slider" />
            </div>
        </div>
    );
}
