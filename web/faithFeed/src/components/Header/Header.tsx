import './Header.css'
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
            <div className="user-menu">
                <div className="avatar">👤</div>
            </div>
        </header>
    );
}