import { useRef } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {

    //const router = useRouter();

    return (
        <>
            <div className="hero-section">
                <img src="/home.jpg"></img>
                <div className="hero-text">
                    <h1>SOUNDLY</h1>
                    <p>One stop for all music.</p>
                </div>
            </div>
        </>
    )
}
