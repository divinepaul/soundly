import db from "@/db";
import { auth } from "@/lib/random_functions";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { useRouter } from "next/router";

export async function getServerSideProps(context) {

    auth(context.req);

    let masters = await db.select("*")
        .from("tbl_playlist_master")
        .where('email', '=', context.req.user.email)
        .andWhere('playlist_status', '=', 1)




    masters = JSON.parse(JSON.stringify(masters));

    return {
        props: { masters }, // will be passed to the page component as props
    }

}

export default function PlaylistsList(props) {

    let router = useRouter();

    return (
        <div className="default-padding">
            <h1>Playlists</h1>
            <br />
            <div className="music-grid">
                {props.masters.map((master) => (
                    <div className="playlist-grid-item" onClick={() => { router.push("/playlist/" + master.playlist_master_id) }}>
                        <div className="playlist-grid-item-image">
                            <QueueMusicIcon style={{ fontSize: "100px" }} />
                        </div>
                        <h3>{master.playlist_name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
