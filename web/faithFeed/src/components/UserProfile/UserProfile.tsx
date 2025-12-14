
import React, { useMemo } from 'react';
import './UserProfile.css';
import { useAuth } from '../../context/AuthContext';

interface UserProfileProps {
    user?: {
        name: string;
        username: string;
        bio: string;
        avatarUrl: string;
        followers: number;
        following: number;
    };
}

const getRandomColor = () => {
    const colors = [
        'linear-gradient(135deg, #FF6B6B, #FF8E53)',
        'linear-gradient(135deg, #4facfe, #00f2fe)',
        'linear-gradient(135deg, #43e97b, #38f9d7)',
        'linear-gradient(135deg, #fa709a, #fee140)',
        'linear-gradient(135deg, #667eea, #764ba2)',
        'linear-gradient(135deg, #89f7fe, #66a6ff)',
        'linear-gradient(135deg, #c471f5, #fa71cd)',
        'linear-gradient(135deg, #fbc2eb, #a6c1ee)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

const UserProfile: React.FC<UserProfileProps> = () => {
    const { user,logout } = useAuth();
    const letter = user.name
    // Default data if no prop provided
    const userData = {
        name: `${user.name}`,
        username: `${user.email}`,
        bio: 'Sharing the light of Christ ✨ | Worship Leader 🎵 | Psalm 23:1',
        avatarUrl: `https://avatar.iran.liara.run/username?username=${(user.name).split('')[0]}`,
        followers: 1205,
        following: 450
    };

    // Memoize the background style so it doesn't change on every render unless component remounts
    const backgroundStyle = useMemo(() => ({
        background: getRandomColor()
    }), []);



    return (
        <div className="user-profile-card">
            <div className="profile-cover" style={backgroundStyle}></div>

            <div className="profile-avatar-container">
                <img
                    src={userData.avatarUrl}
                    alt={`${userData.name}'s avatar`}
                    className="profile-avatar"
                />
            </div>

            <div className="profile-info">
                <h2 className="profile-name">{userData.name}</h2>
                <p className="profile-username">{userData.username}</p>
                <p className="profile-bio">{userData.bio}</p>
                
                <button style={{backgroundColor:'var(--accent-color)',color:'white'}} onClick={()=>logout()}>Log out</button>
            </div>
        </div>
    );
};

export default UserProfile;
