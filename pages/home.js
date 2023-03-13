import db from "@/db";
//import { Button } from "@mui/material";
//import { useRouter } from "next/router";
//import PersonAddIcon from '@mui/icons-material/PersonAdd';
//import { useContext, useEffect, useState } from "react";
//import MusicContext from "@/lib/musiccontext";
//import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import { auth, request, requestWithAuth } from "@/lib/random_functions";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
//import UserContext from "@/lib/usercontext";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { useContext } from "react";
import MusicContext from "@/lib/musiccontext";
import SearchContext from "@/lib/search";

export async function getServerSideProps(context) {
    auth(context.req);

    let user;

    if (context.req.user.type == "customer") {
        user = await db.select("*")
            .from("tbl_customer")
            .where('customer_id', '=', context.req.user.customer_id).first();
    } else {
        user = await db.select(
            "artist_id",
            "email",
            "artist_phone",
            "date_added",
            "artist_name"
        )
            .from("tbl_artist")
            .where('artist_id', '=', context.req.user.artist_id).first();
    }

    let likedSongs = await db.select("*")
        .from("tbl_playlist_master")
        .innerJoin("tbl_playlist_child", "tbl_playlist_child.playlist_master_id", "tbl_playlist_master.playlist_master_id")
        .innerJoin("tbl_music", "tbl_music.music_id", "tbl_playlist_child.music_id")
        .innerJoin("tbl_artist", "tbl_artist.artist_id", "tbl_music.artist_id")
        .where("playlist_name", "Favorites")
        .where("tbl_playlist_master.email", context.req.user.email)
        .orderBy('tbl_playlist_child.date_added','desc')
        .limit(6)

    let followingArtists = await db.select("*")
        .from("tbl_follower")
        .innerJoin("tbl_artist", "tbl_artist.artist_id", "tbl_follower.artist_id")
        .where("tbl_follower.email", context.req.user.email)
        .limit(6)

    let artists = await db.select("*")
        .from("tbl_artist")
        .limit(6)

    artists = artists.map(music => {
        delete music.artist_image;
        return music
    });

    followingArtists = followingArtists.map(music => {
        delete music.artist_image;
        return music
    });

    let playlists = await db.select("*")
        .from("tbl_playlist_master")
        .where('email', '=', context.req.user.email)
        .andWhere('playlist_status', '=', 1)

    likedSongs = likedSongs.map(music => {
        delete music.music_file;
        delete music.music_image;
        delete music.artist_image;
        return music
    });

    let genres = await db.select("*")
        .from("tbl_genre")
        .where("genre_status", "=", 1)

    let languages = await db.select("*")
        .from("tbl_language")
        .where("language_status", "=", 1)

    user = JSON.parse(JSON.stringify(user));
    genres = JSON.parse(JSON.stringify(genres));
    languages = JSON.parse(JSON.stringify(languages));
    likedSongs = JSON.parse(JSON.stringify(likedSongs));
    followingArtists = JSON.parse(JSON.stringify(followingArtists));
    artists = JSON.parse(JSON.stringify(artists));
    playlists = JSON.parse(JSON.stringify(playlists));

    return {
        props: {
            user,
            genres,
            languages,
            likedSongs,
            followingArtists,
            playlists,
            artists
        },
    }
}

export default function UserHome(props) {
    let router = useRouter();

    const [music, setCurrentSong, setPlayList] = useContext(MusicContext);
    const [searchBy, search] = useContext(SearchContext);

    let playSong = async (music) => {
        let [_, data] = await request("/api/music/random_playlist");
        setCurrentSong(music,data);
        router.push("/current");
    }

    let changeSearch = (value) => {
        search(value);
        router.push("/explore");

    }

    return (
        <div className="default-padding">
            <h1>Welcome, {props.user.artist_name} {props.user.customer_name} </h1>
            <br />
            <h3>Let's start listening.</h3>
            <br />
            <br />

            {props.likedSongs.length > 0 &&
                <>
                    <h2>Liked Songs</h2>
                    <br />
                    <div className="music-grid">
                        {props.likedSongs.map((music) => (
                            <div onClick={() => playSong(music)} className="music-grid-item">
                                <img src={"/api/image/music/" + music.music_id} />
                                <h3>{music.music_name}</h3>
                                <p>{music.artist_name}</p>
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
                            <Button  onClick={()=>router.push("/playlist/" + props.likedSongs[0].playlist_master_id)} variant="outlined">View All Liked Songs</Button>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                </>
            }

            {props.followingArtists.length > 0 ? 
                <>
                    <h2>Artists You follow</h2>
                    <br />
                    <div className="music-grid">
                        {props.followingArtists.map((artist) => (
                            <div onClick={() => router.push("/artist/" + artist.artist_id)} className="music-grid-item">
                                <img className="artist-list-image" src={"/api/image/artist/" + artist.artist_id} />
                                <br />
                                <h3>{artist.artist_name}</h3>
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
                            <Button variant="outlined" onClick={() => { router.push("/artists")}}>View All Artists</Button>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                </>
             : 
                <>
                    <h2>Recommened Artists</h2>
                    <br />
                    <div className="music-grid">
                        {props.artists.map((artist) => (
                            <div onClick={() => router.push("/artist/" + artist.artist_id)} className="music-grid-item">
                                <img className="artist-list-image" src={"/api/image/artist/" + artist.artist_id} />
                                <br />
                                <h3>{artist.artist_name}</h3>
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
                            <Button variant="outlined" onClick={() => { router.push("/artists")}}>View All Artists</Button>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                </>
            }


            {props.playlists.length > 0 &&
                <>
                    <h2>Your Playlists</h2>
                    <br />
                    <div className="music-grid">
                        {props.playlists.map((master) => (
                            <div className="playlist-grid-item" onClick={() => { router.push("/playlist/" + master.playlist_master_id) }}>
                                <div className="playlist-grid-item-image">
                                    <QueueMusicIcon style={{ fontSize: "100px" }} />
                                </div>
                                <h3>{master.playlist_name}</h3>
                            </div>
                        ))}
                    </div>
                    <br />
                    <br />
                    <br />
                </>
            }

            <h2>Available Genres</h2>
            <br />
            <div class="genre-container">
                {props.genres.map((genre) => (
                    <div className="genre-item" onClick={()=> changeSearch(genre.genre_name)}>
                        {genre.genre_name}
                    </div>
                ))}
            </div>
            <br />
            <h2>Available Languages</h2>
            <br />
            <div class="genre-container">
                {props.languages.map((language) => (
                    <div className="genre-item" onClick={()=> changeSearch(language.language_name)}>
                        {language.language_name}
                    </div>
                ))}
            </div>
        </div>
    );
}
