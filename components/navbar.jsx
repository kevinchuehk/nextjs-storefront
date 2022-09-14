import Link from 'next/link'
import React, { useState, useEffect } from 'react'

export default function Navbar() {
    const [isLogin, setLogin ] = useState(false)

    useEffect(() => {
        const isLogin = sessionStorage.getItem("isLogin") ? true : false
        setLogin(isLogin)
    })

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
                    <Link href={isLogin ? "/profile": "/login"}>
                        <a className="btn btn-ghost btn-circle">
                            用戶
                        </a>
                    </Link>
                </div>
            </div>
        </>
    )
}