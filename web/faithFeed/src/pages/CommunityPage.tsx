import { useState } from 'react';
import { FaUserPlus, FaUserCheck, FaComments, FaCircle } from 'react-icons/fa';
import { BiMessageRounded } from 'react-icons/bi';
import { MdVerified } from 'react-icons/md';
import './CommunityPage.css';

interface User {
    id: number;
    name: string;
    avatar: string;
    role: 'Member' | 'Pastor' | 'Mentor' | 'Counselor' | 'Singer';
    isFollowing: boolean;
    followers: number;
    posts: number;
    bio: string;
    isOnline: boolean;
    isVerified?: boolean;
}

interface ChatRequest {
    id: number;
    status: 'pending' | 'matched' | 'declined';
    mentorType: 'Pastor' | 'Mentor' | 'Counselor';
    timestamp: string;
    matchedWith?: string;
}

export default function CommunityPage() {
    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            name: 'Pastor Yohanis',
            avatar: 'PJ',
            role: 'Pastor',
            isFollowing: false,
            followers: 1234,
            posts: 89,
            bio: 'Sharing God\'s word and spreading love. Available for spiritual guidance.',
            isOnline: true,
            isVerified: true
        },
        {
            id: 2,
            name: 'Dr. Mamusha Fantahun',
            avatar: 'SJ',
            role: 'Mentor',
            isFollowing: true,
            followers: 567,
            posts: 45,
            bio: 'Christian mentor helping believers grow in faith and overcome challenges.',
            isOnline: true,
            isVerified: true
        },
        {
            id: 3,
            name: 'Yosef Kassa',
            avatar: 'MB',
            role: 'Singer',
            isFollowing: false,
            followers: 892,
            posts: 123,
            bio: 'Licensed Christian counselor. Here to listen and guide through life\'s difficulties.',
            isOnline: false,
            isVerified: true
        },
        {
            id: 4,
            name: 'Emily Davis',
            avatar: 'ED',
            role: 'Member',
            isFollowing: false,
            followers: 234,
            posts: 67,
            bio: 'Blessed to be a blessing. Sharing testimonies and encouraging others in Christ.',
            isOnline: true,
            isVerified: false
        },
        {
            id: 5,
            name: 'Rev. David Miller',
            avatar: 'DM',
            role: 'Pastor',
            isFollowing: true,
            followers: 2341,
            posts: 234,
            bio: 'Servant of Christ. Leading with love and compassion. Always here for prayer.',
            isOnline: true,
            isVerified: true
        },
        {
            id: 6,
            name: 'Grace Thompson',
            avatar: 'GT',
            role: 'Mentor',
            isFollowing: false,
            followers: 445,
            posts: 78,
            bio: 'Youth mentor and Bible study leader. Passionate about discipleship.',
            isOnline: false,
            isVerified: true
        }
    ]);

    const [chatRequests, setChatRequests] = useState<ChatRequest[]>([]);
    const [showChatModal, setShowChatModal] = useState(false);
    const [selectedMentorType, setSelectedMentorType] = useState<'Pastor' | 'Mentor' | 'Counselor'>('Pastor');
    const [filterRole, setFilterRole] = useState<'All' | 'Pastor' | 'Mentor' | 'Counselor' | 'Member'>('All');
    const [searchQuery, setSearchQuery] = useState('');

    const handleFollow = (userId: number) => {
        setUsers(users.map(user => {
            if (user.id === userId) {
                return {
                    ...user,
                    isFollowing: !user.isFollowing,
                    followers: user.isFollowing ? user.followers - 1 : user.followers + 1
                };
            }
            return user;
        }));
    };

    const handleChatRequest = () => {
        // Check for online mentors/pastors/counselors
        const availableMentors = users.filter(
            user => user.role === selectedMentorType && user.isOnline
        );

        if (availableMentors.length === 0) {
            alert(`No ${selectedMentorType.toLowerCase()}s are currently online. Please try again later.`);
            return;
        }

        // Randomly match with available mentor
        const matchedMentor = availableMentors[Math.floor(Math.random() * availableMentors.length)];

        const newRequest: ChatRequest = {
            id: chatRequests.length + 1,
            status: 'matched',
            mentorType: selectedMentorType,
            timestamp: 'Just now',
            matchedWith: matchedMentor.name
        };

        setChatRequests([newRequest, ...chatRequests]);
        setShowChatModal(false);
        alert(`You've been matched with ${matchedMentor.name}! Your anonymous chat will begin shortly.`);
    };

    const filteredUsers = users.filter(user => {
        const matchesRole = filterRole === 'All' || user.role === filterRole;
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.bio.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesRole && matchesSearch;
    });

    return (
        <div className="community-container">
            <div className="community-header">
                <h1>Community</h1>
                <p className="community-subtitle">Connect with fellow believers, mentors, and spiritual leaders</p>
            </div>

            {/* Anonymous Chat Request Section */}
            <div className="chat-request-section">
                <div className="chat-request-card">
                    <div className="chat-request-content">
                        <BiMessageRounded className="chat-icon" />
                        <div className="chat-request-text">
                            <h3>Need Spiritual Guidance?</h3>
                            <p>Request an anonymous chat with available pastors, mentors, or counselors</p>
                        </div>
                    </div>
                    <button className="request-chat-btn" onClick={() => setShowChatModal(true)}>
                        <FaComments /> Request Anonymous Chat
                    </button>
                </div>

                {/* Active Chat Requests */}
                {chatRequests.length > 0 && (
                    <div className="active-requests">
                        <h3>Your Chat Requests</h3>
                        <div className="requests-list">
                            {chatRequests.map(request => (
                                <div key={request.id} className={`request-item ${request.status}`}>
                                    <div className="request-info">
                                        <span className="request-type">{request.mentorType}</span>
                                        <span className="request-status">
                                            {request.status === 'matched' ? `Matched with ${request.matchedWith}` : 
                                             request.status === 'pending' ? 'Finding available mentor...' : 'No mentors available'}
                                        </span>
                                    </div>
                                    <span className="request-time">{request.timestamp}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Search and Filter */}
            <div className="community-controls">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search community members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="filter-buttons">
                    {(['All', 'Pastor', 'Mentor', 'Counselor', 'Member'] as const).map(role => (
                        <button
                            key={role}
                            className={`filter-btn ${filterRole === role ? 'active' : ''}`}
                            onClick={() => setFilterRole(role)}
                        >
                            {role}
                        </button>
                    ))}
                </div>
            </div>

            {/* Users Grid */}
            <div className="users-grid">
                {filteredUsers.map(user => (
                    <div key={user.id} className="user-card">
                        <div className="user-card-header">
                            <div className="user-avatar-wrapper">
                                <div className={`user-avatar ${user.role.toLowerCase()}`}>
                                    {user.avatar}
                                </div>
                                {user.isOnline && (
                                    <span className="online-indicator">
                                        <FaCircle />
                                    </span>
                                )}
                            </div>
                            <div className="user-role-badge">{user.role}</div>
                        </div>

                        <div className="user-card-body">
                            <div className="user-name">
                                {user.name}
                                {user.isVerified && <MdVerified className="verified-icon" />}
                            </div>
                            <p className="user-bio">{user.bio}</p>

                            <div className="user-stats">
                                <div className="stat">
                                    <span className="stat-value">{user.followers}</span>
                                    <span className="stat-label">Followers</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">{user.posts}</span>
                                    <span className="stat-label">Posts</span>
                                </div>
                            </div>
                        </div>

                        <div className="user-card-footer">
                            <button
                                className={`follow-btn ${user.isFollowing ? 'following' : ''}`}
                                onClick={() => handleFollow(user.id)}
                            >
                                {user.isFollowing ? (
                                    <>
                                        <FaUserCheck /> Following
                                    </>
                                ) : (
                                    <>
                                        <FaUserPlus /> Follow
                                    </>
                                )}
                            </button>
                            <button className="message-btn">
                                <BiMessageRounded /> Message
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Request Modal */}
            {showChatModal && (
                <div className="modal-overlay" onClick={() => setShowChatModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Request Anonymous Chat</h2>
                        <p className="modal-description">
                            Select the type of spiritual guidance you need. We'll connect you with an available mentor anonymously.
                        </p>

                        <div className="mentor-type-selector">
                            {(['Pastor', 'Mentor', 'Counselor'] as const).map(type => {
                                const onlineCount = users.filter(u => u.role === type && u.isOnline).length;
                                return (
                                    <div
                                        key={type}
                                        className={`mentor-type-card ${selectedMentorType === type ? 'selected' : ''}`}
                                        onClick={() => setSelectedMentorType(type)}
                                    >
                                        <h3>{type}</h3>
                                        <p className="online-count">
                                            <FaCircle className="online-dot" /> {onlineCount} online
                                        </p>
                                        <p className="mentor-description">
                                            {type === 'Pastor' && 'Spiritual guidance and prayer support'}
                                            {type === 'Mentor' && 'Faith growth and discipleship'}
                                            {type === 'Counselor' && 'Professional Christian counseling'}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="modal-actions">
                            <button className="modal-cancel-btn" onClick={() => setShowChatModal(false)}>
                                Cancel
                            </button>
                            <button className="modal-confirm-btn" onClick={handleChatRequest}>
                                Request Chat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
