import Link from 'next/link';

export default function AdminLayout({ children }) {
    return (
        <>
            <div className="admin-nav">
                <Link href="/admin/customer/view">Customer</Link>
                <br />
                <Link href="/admin/artist/view">Artist</Link>
                <br />
                <Link href="/admin/publisher/view">Publisher</Link>
                <br />
                <Link href="/admin/genre/view">Genres</Link>
                <br />
                <Link href="/admin/language/view">Languages</Link>
                <br />
                <Link href="/admin/music/view">Music</Link>
                <br />
                <Link href="/api/auth/logout">Logout</Link>
                <br />
            </div>
            {children}
        </>

    );

}
