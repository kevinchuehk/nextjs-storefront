import Link from 'next/link'
import React, { useState, useEffect } from 'react'

export default function Navbar() {
    const [isLogin, setLogin ] = useState(false)

    useEffect(() => {
        const isLogin = (sessionStorage.getItem("isLogin") == "true")  ? true : false
        setLogin(isLogin)
    })

    const logout = () => {
        sessionStorage.removeItem("isLogin")
        sessionStorage.removeItem("token")
    }


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
                    {
                        isLogin ?
                        <Link href="/">
                        <button 
                            className="btn btn-ghost btn-circle" 
                            disabled={!isLogin}

                            onClick={logout}
                        >登出</button>
                        </Link> : null
                    }
                </div>
            </div>
        </>
    )
}