import React, { useState, useEffect, useRef } from 'react';
import './CommunitiesPage.css';
import { FaUserFriends, FaHandHoldingHeart, FaPaperPlane } from 'react-icons/fa';

interface User {
    id: number;
    name: string;
    avatar: string;
    role: 'Member' | 'Pastor' | 'Counselor' | 'Moderator' | 'Singer';
    isOnline: boolean;
}

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'counselor';
    timestamp: Date;
}

const MOCK_USERS: User[] = [
    { id: 1, name: 'Dr. Mamusha Fanta', avatar: 'https://avatar.iran.liara.run/username?username=M+F', role: 'Counselor', isOnline: true },
    { id: 2, name: 'Rev. Michael', avatar: 'https://avatar.iran.liara.run/username?username=R+M', role: 'Pastor', isOnline: true },
    { id: 3, name: 'Yosef Kassa', avatar: 'https://avatar.iran.liara.run/username?username=Y+K]', role: 'Member', isOnline: false },
    { id: 4, name: 'Tamirat Getachew', avatar: 'https://avatar.iran.liara.run/username?username=T+G', role: 'Counselor', isOnline: true },
    { id: 5, name: 'Aster Abebe', avatar: 'https://avatar.iran.liara.run/username?username=A+A', role: 'Singer', isOnline: true },
    { id: 6, name: 'Yohanis Belay', avatar: 'https://avatar.iran.liara.run/username?username=Y+B', role: 'Member', isOnline: false },
    { id: 7, name: 'Rebecca Smith', avatar: 'https://avatar.iran.liara.run/username?username=R+S', role: 'Counselor', isOnline: true },
    { id: 8, name: 'Paulos Geti', avatar: 'https://avatar.iran.liara.run/username?username=P+G', role: 'Member', isOnline: true },
];

export default function CommunitiesPage() {
    const [viewState, setViewState] = useState<'browsing' | 'searching' | 'connected'>('browsing');
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [connectedCounselor, setConnectedCounselor] = useState<User | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleConnect = () => {
        setViewState('searching');

        // Simulate finding a counselor
        setTimeout(() => {
            const counselors = MOCK_USERS.filter(u => u.role === 'Counselor' && u.isOnline);
            const randomCounselor = counselors[Math.floor(Math.random() * counselors.length)];

            setConnectedCounselor(randomCounselor);
            setViewState('connected');
            setMessages([{
                id: '1',
                text: `Peace be with you. I am ${randomCounselor.name}. How can I support you today? Your identity is kept anonymous.`,
                sender: 'counselor',
                timestamp: new Date()
            }]);
        }, 3000); // 3 seconds delay
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputMessage('');

        // Simulate counselor reply
        setTimeout(() => {
            const replies = [
                "I hear you. Let's bring this to God in prayer.",
                "That sounds difficult. Remember Psalm 34:18: 'The Lord is close to the brokenhearted'.",
                "Can you tell me more about how you're feeling?",
                "God's grace is sufficient for you. I am here to listen.",
                "Thank you for sharing that with me."
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];

            const counselorMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: randomReply,
                sender: 'counselor',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, counselorMsg]);
        }, 2000);
    };

    const handleEndChat = () => {
        if (window.confirm("Are you sure you want to end this session?")) {
            setViewState('browsing');
            setMessages([]);
            setConnectedCounselor(null);
        }
    };

    return (
        <div className="communities-container">
            {/* Header */}
            <div className="communities-header">
                <h1>Faith Communities</h1>
                <p>Connect with believers, share fellowship, and find spiritual support.</p>
            </div>

            {viewState === 'browsing' && (
                <>
                    {/* Active Members Grid */}
                    <div className="active-members-section">
                        <div className="section-title">
                            <FaUserFriends style={{ color: '#667eea' }} />
                            Active Members ({MOCK_USERS.filter(u => u.isOnline).length})
                            <span className="online-dot"></span>
                        </div>
                        <div className="members-grid">
                            {MOCK_USERS.map(user => (
                                <div key={user.id} className="member-card">
                                    <img src={user.avatar} alt={user.name} className="member-avatar" />
                                    <div className="member-name">{user.name}</div>
                                    <div className="member-role">{user.role}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Counselor Request Section */}
                    <div className="counselor-support-section">
                        <div className="support-content">
                            <div className="support-icon">
                                <FaHandHoldingHeart />
                            </div>
                            <h2>Need Someone to Talk To?</h2>
                            <p>
                                We have dedicated counselors and mentors online ready to listen, pray, and offer biblical guidance.
                                Your session is private and anonymous.
                            </p>
                            <button className="connect-btn" onClick={handleConnect}>
                                Connect with a Christian Counselor
                            </button>
                        </div>
                    </div>
                </>
            )}

            {viewState === 'searching' && (
                <div className="counselor-support-section" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="searching-status">
                        <div className="loader"></div>
                        <h2>Finding an open heart...</h2>
                        <p>Scanning active counselors...</p>
                    </div>
                </div>
            )}

            {viewState === 'connected' && connectedCounselor && (
                <div className="active-chat-session">
                    <div className="chat-header">
                        <div className="counselor-info">
                            <img src={connectedCounselor.avatar} alt="Counselor" className="member-avatar" style={{ width: '45px', height: '45px', marginBottom: 0 }} />
                            <div className="counselor-status">
                                <h3>{connectedCounselor.name}</h3>
                                <span><span className="online-dot"></span> Online • Private Session</span>
                            </div>
                        </div>
                        <button className="end-chat-btn" onClick={handleEndChat}>End Session</button>
                    </div>

                    <div className="messages-area">
                        {messages.map(msg => (
                            <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                                <div className={`message-bubble ${msg.sender}`}>
                                    {msg.text}
                                    <div className="message-time">
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="input-area" onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            className="chat-input"
                            placeholder="Type your message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                        />
                        <button type="submit" className="send-button">
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}