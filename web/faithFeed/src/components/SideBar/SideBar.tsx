import { IoMdHome } from "react-icons/io";
import { Link } from 'react-router-dom';
import { MdOutlineOndemandVideo } from "react-icons/md";
import { RiUserCommunityLine } from "react-icons/ri";
import { RiRobot3Line } from "react-icons/ri";
import './SideBar.css'
export default function SideBar({ currentPage }: { currentPage: string }) {
    return (
        <aside className="sidebar">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}><IoMdHome size={28} /> <span>Home</span></div>
            </Link>
            <Link to="/videos" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={`nav-item ${currentPage === 'video' ? 'active' : ''}`}><MdOutlineOndemandVideo size={28} /> <span>Videos</span></div>
            </Link>
            <Link to="/commuity" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={`nav-item ${currentPage === 'communities' ? 'active' : ''}`}> <RiUserCommunityLine size={28} /> <span>Communities</span></div>
            </Link>
            <Link to="/aimentor" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={`nav-item ${currentPage === 'aiMentor' ? 'active' : ''}`}> <RiRobot3Line size={24} /> <span>Ai Mentor</span></div>
            </Link>
        </aside>
    );
}