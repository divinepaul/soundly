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
import Player from "./Player/Player";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from "next/link";
import { useRouter } from "next/router";
import SearchContext from "@/lib/search";
import Head from "next/head";

//function useDidUpdateEffect(fn, inputs) {
//const didMountRef = useRef(false);

//useEffect(() => {
//if (didMountRef.current) { 
//return fn();
//}
//didMountRef.current = true;
//}, inputs);
//}

export default function Layout({ children }) {


    const [user, setUser] = useContext(UserContext);
    const [searchBy, search] = useContext(SearchContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const router = useRouter();

    const handleClose = (link) => {
        setAnchorEl(null);
        router.push(link);
    };
    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const home = () => {
        if (user && user.type == "artist" || user.type == "customer") {
            router.push("/home");
        } else {
            router.push("/");
        }
    }

    const changeSearch = (event) => {
        search(event.target.value);
        router.push("/explore");
    }

    return (
        <>
            <div className={styles.mainroot}>
                <Head>
                    <title>Soundly</title>
                </Head>

                <div className={styles.navbar}>
                    <h1 onClick={home}>Soundly</h1>

                    <input onChange={changeSearch} value={searchBy} placeholder="Search Songs" className={styles.navSearch}>
                    </input>

                    <div>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={openMenu}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                {user && user.type == "artist" ?
                                    <Avatar sx={{ width: 42, height: 42 }} src={"/api/image/artist/" + user.artist_id}></Avatar>
                                    :
                                    <Avatar sx={{ width: 42, height: 42 }}></Avatar>
                                }

                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                <main className={styles.content}>
                    {children}
                </main>

                {!router.asPath.startsWith("/admin") &&
                    <Player />
                }

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {user ?
                            <MenuItem onClick={() => handleClose("/api/auth/logout")}>Logout</MenuItem>
                        :
                        <>
                            <MenuItem onClick={() => handleClose("/login")}>Login</MenuItem>
                            <MenuItem onClick={() => handleClose("/customer_register")}>Customer Register</MenuItem>
                            <MenuItem onClick={() => handleClose("/artist_register")}>Artist Register</MenuItem>
                            <MenuItem onClick={() => handleClose("/publisher_register")}>Publisher Register</MenuItem>
                        </>
                    }
                </Menu>
            </div>
        </>
    )
}
