import './Header.css'
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
export default function Header() {
    return (
        <header className="header">
            <div className="logo">
                <span className="logo-icon">✝️</span> <span>FaithFeed</span>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search" />
                <button>🔍</button>
            </div>
            <Link to='/profile'>
                <div className="user-menu">
                    <div className="avatar">
                        <FaRegUser />
                    </div>
                </div>
            </Link>
        </header>
    );
}