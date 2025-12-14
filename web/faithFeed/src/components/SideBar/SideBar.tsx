import { IoMdHome } from "react-icons/io";
import { Link } from 'react-router-dom';
import { MdOutlineOndemandVideo } from "react-icons/md";
import { RiUserCommunityLine } from "react-icons/ri";
import { RiRobot3Line } from "react-icons/ri";
import './SideBar.css'
import { useState } from "react";
export default function SideBar() {

    const [page, setPage] = useState('home');
    return (
        <aside className="sidebar">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setPage('home')}>
                <div className={`nav-item ${page == 'home' ? 'active' : ''}`}><IoMdHome size={28} /> <span>Home</span></div>
            </Link>
            <Link to="/videos" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setPage('video')}>
                <div className={`nav-item ${page == 'video' ? 'active' : ''}`}><MdOutlineOndemandVideo size={28} /> <span>Videos</span></div>
            </Link>
            <Link to="/communities" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setPage('communities')}>
                <div className={`nav-item ${page == 'communities' ? 'active' : ''}`}> <RiUserCommunityLine size={28} /> <span>Communities</span></div>
            </Link>
            <Link to="/aimentor" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setPage('aiMentor')}>
                <div className={`nav-item ${page == 'aiMentor' ? 'active' : ''}`}> <RiRobot3Line size={24} /> <span>Ai Mentor</span></div>
            </Link>
        </aside>
    );
}