import Link from 'next/link'

export default function Navbar() {
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link href="/">
                        <a className="btn btn-ghost normal-case text-xl">Shop</a>
                    </Link>
                </div>
                <div className="flex-none">
                    <Link href="/cart">
                        <a className="btn btn-ghost btn-circle">
                            購物車
                        </a>
                    </Link>
                    <Link href="/user">
                        <a className="btn btn-ghost btn-circle">
                            用戶
                        </a>
                    </Link>
                </div>
            </div>
        </>
    )
}