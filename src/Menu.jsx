import React from 'react';
import Link from 'next/link';

const Menu = () => (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link href="/">
                        <a className="nav-link">Home</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/speakers">
                        <a className="nav-link">Speakers</a>
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
);

export default Menu;
