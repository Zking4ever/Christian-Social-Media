
import React, { useMemo } from 'react';
import './UserProfile.css';

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

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    // Default data if no prop provided
    const userData = user || {
        name: 'Grace Walker',
        username: '@gracewalker',
        bio: 'Sharing the light of Christ ✨ | Worship Leader 🎵 | Psalm 23:1',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
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

                <div className="profile-stats">
                    <div className="stat-item">
                        <span className="stat-value">{userData.followers.toLocaleString()}</span>
                        <span className="stat-label">Followers</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{userData.following.toLocaleString()}</span>
                        <span className="stat-label">Following</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
