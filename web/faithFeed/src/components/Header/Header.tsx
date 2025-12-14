import './Header.css'
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { useState } from 'react';

export default function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/videos?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <header className="header">
            <div className="logo">
                <span className="logo-icon">✝️</span> <span>FaithFeed</span>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearch}>🔍</button>
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