import { IoMdHome } from "react-icons/io";
import { MdOutlineOndemandVideo } from "react-icons/md";
import './SideBar.css'
export default function SideBar() {
    return (
        <aside className="sidebar">
            <div className="nav-item active"><IoMdHome /> Home</div>
            <div className="nav-item"><MdOutlineOndemandVideo /> Videos</div>
            <div className="nav-item">🎞️ Communities</div>
            <div className="nav-item">📁 Ai Mentor</div>
        </aside>
    );
}