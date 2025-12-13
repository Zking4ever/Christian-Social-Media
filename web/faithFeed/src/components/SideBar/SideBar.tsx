import { IoMdHome } from "react-icons/io";
import { MdOutlineOndemandVideo } from "react-icons/md";
import './SideBar.css'
export default function SideBar() {
    return (
        <aside className="sidebar">
            <div className="nav-item active"><IoMdHome /> <span>Home</span></div>
            <div className="nav-item"><MdOutlineOndemandVideo /> <span>Videos</span></div>
            <div className="nav-item"><span>🎞️ Communities</span></div>
            <div className="nav-item"><span>📁 Ai Mentor</span></div>
        </aside>

    );
}