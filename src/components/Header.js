"use client";

import { useAuth } from "@/context/auth";
import Link from "next/link";

function Header() {
    const auth = useAuth();

    return (
        <header className="header">
            <div className="header__container">
                <h1 className="header__logo">FurniTech</h1>
                <nav className="header__nav">
                {auth.token ? (
                    <Link
                    href="/"
                    onClick={auth.logout}
                    className="header__nav-link header__nav-link--logout"
                    >
                    Logout
                    </Link>
                ) : (
                    <Link
                    href="/"
                    className="header__nav-link header__nav-link--login"
                    >
                    Login
                    </Link>
                )}
                </nav>
            </div>
        </header>
    )
}

export default Header;