import { IoMdHome } from "react-icons/io";
import './SideBar.css'
export default function SideBar() {
    return (
        <aside className="sidebar">
            <div className="nav-item active"><IoMdHome /> Home</div>
            <div className="nav-item">🔥 Trending</div>
            <div className="nav-item">🎞️ Shorts</div>
            <div className="nav-item">📁 Library</div>
        </aside>
    );
}