import Layout from '@/components/layout'
import '@/styles/globals.css'
import '@/styles/Form.css'
import '@/styles/Input.css'
import '@/styles/Modal.css'
import UserContext from '@/lib/usercontext'
import { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import SearchContext from '@/lib/search'
import { request } from '@/lib/random_functions'
import deepcopy from 'deepcopy'
import MusicContext from '@/lib/musiccontext'

export default function App({ Component, pageProps }) {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [music, setMusic] = useState({ currentSong: null, playlist: [] });

    const [searchBy, search] = useState("");

    let setCurrentSong = async (music_obj, playlist) => {
        let copy = deepcopy(music);
        if (playlist) {
                copy.currentSong = music_obj;
                copy.playlist = playlist;
                setMusic(copy);
        } else {
            if (!music.playlist.length) {
                let [_, data] = await request("/api/music/random_playlist");
                copy.currentSong = music_obj;
                copy.playlist = data;
                setMusic(copy);
            } else {
                copy.currentSong = music_obj;
                setMusic(copy);
            }
        }
    }

    let setPlayList = async (music_obj, playlist) => {
        //if (!music.playlist.length) {
            //let [res, data] = await request("/api/music/random_playlist");
            //let copy = deepcopy(music);
            //copy.currentSong = music_obj;
            //copy.playlist = data;
            //setMusic(copy);
        //} else {

        //}
    }

    useEffect(() => {
        (async () => {
            let res = await fetch("/api/auth/user");
            console.log(res.status);
            if (res.status == 200) {
                let data = await res.json();
                setUser(data);
            }
            setIsLoading(false);
        })();
    }, []);

    return (
        <UserContext.Provider value={[user, setUser]}>
            <SearchContext.Provider value={[searchBy, search]}>
                <MusicContext.Provider value={[music, setCurrentSong, setPlayList]}>
                    {isLoading ?
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={isLoading}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        :
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    }
                </MusicContext.Provider>
            </SearchContext.Provider>
        </UserContext.Provider>
    );
}
