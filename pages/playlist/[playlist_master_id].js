import db from "@/db";
import MusicContext from "@/lib/musiccontext";
import { requestWithAuth } from "@/lib/random_functions";
import UserContext from "@/lib/usercontext";
import { DeleteSharp } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useRef } from "react";

export async function getServerSideProps(context) {

    let master = await db.select("*")
        .from("tbl_playlist_master")
        .where('playlist_master_id', '=', context.params.playlist_master_id).first();

    // TODO select only required feilds
    let children = await db.select("*").from("tbl_playlist_child")
        .innerJoin("tbl_music", "tbl_music.music_id", "tbl_playlist_child.music_id")
        .innerJoin("tbl_artist", "tbl_artist.artist_id", "tbl_music.artist_id")
        .innerJoin("tbl_genre", "tbl_music.genre_id", "tbl_genre.genre_id")
        .innerJoin("tbl_language", "tbl_music.language_id", "tbl_language.language_id")
        .where('playlist_master_id', '=', context.params.playlist_master_id)
        .orderBy('tbl_playlist_child.date_added','desc')

    children = children.map(music => {
        delete music.music_file;
        delete music.music_image;
        delete music.artist_image;
        return music
    });

    master = JSON.parse(JSON.stringify(master));
    children = JSON.parse(JSON.stringify(children));

    return {
        props: { master, children }
    }
}

export default function AdminArtistEdit(props) {

    let ref = useRef();
    const [music, setCurrentSong, setPlayList] = useContext(MusicContext);
    const [user, setUser] = useContext(UserContext);

    const router = useRouter();


    let playSong = (music_item) => {
        setCurrentSong(music_item,props.children);
        router.push("/current");
    }

    let deleteFromPlaylist = async (music_item) => {
        await requestWithAuth(router, '/api/playlist/delete',
            {
                playlist_child_id: music_item.playlist_child_id,
            }
        );
        router.reload();
    }

    return (
        <div className="default-padding">
            <h1>Playlist - {props.master.playlist_name}</h1>
            <br/>
            <br/>
            <br/>
            {props.children.length > 0 ?
                props.children.map((music_item) => (
                    <div className="playlist-item" >
                        <div className="playlist-item-details-container" onClick={() => { playSong(music_item) }} >
                            <img src={"/api/image/music/" + music_item.music_id} />
                            <div className="playlist-item-details">
                                <h3>{music_item.music_name}</h3>
                                <p>{music_item.artist_name}</p>
                            </div>
                        </div>
                        { user && user.email == props.master.email &&
                            <IconButton onClick={() => { deleteFromPlaylist(music_item) }}>
                                <DeleteSharp />
                            </IconButton>
                        }
                    </div>
                ))
                : <p>No songs found in this playlist</p>}
        </div>
    );
}
