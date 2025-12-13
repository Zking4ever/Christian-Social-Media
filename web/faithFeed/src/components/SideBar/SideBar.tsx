import { IoMdHome } from "react-icons/io";
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineOndemandVideo } from "react-icons/md";
import { RiUserCommunityLine } from "react-icons/ri";
import { RiRobot3Line } from "react-icons/ri";
import './SideBar.css'

export default function SideBar() {
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path: string) => currentPath === path ? 'active' : '';

    return (
        <aside className="sidebar">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={`nav-item ${isActive('/')}`}><IoMdHome size={24} /> <span>Home</span></div>
            </Link>
            <Link to="/videos" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={`nav-item ${isActive('/videos')}`}><MdOutlineOndemandVideo size={24} /> <span>Videos</span></div>
            </Link>
            <div className={`nav-item ${isActive('/communities')}`}> <RiUserCommunityLine size={24} /> <span>Communities</span></div>
            <div className={`nav-item ${isActive('/aiMentor')}`}> <RiRobot3Line size={24} /> <span>Ai Mentor</span></div>
        </aside>
    );
}