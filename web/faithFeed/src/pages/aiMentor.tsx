import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header/Header';
import SideBar from '../components/SideBar/SideBar';
import './aiMentor.css';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

const AiMentorPage = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Blessings! I am your AI Mentor. How can I support your spiritual journey today? Whether you have questions about scripture, need prayer, or seeking guidance, I'm here to listen.",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newUserMessage: Message = {
            id: Date.now(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputText('');
        setIsTyping(true);

        // Simulate AI response (Mock for now)
        setTimeout(() => {
            const aiResponse: Message = {
                id: Date.now() + 1,
                text: "I hear you. Let me reflect on that through a biblical lens... (AI integration coming soon!)",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            <div className="chat-container">
                <div className="messages-area">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                            <div className={`message-bubble ${msg.sender}`}>
                                <div className="message-text">{msg.text}</div>
                                <div className="message-time">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="message-wrapper ai">
                            <div className="typing-indicator">
                                <span>•</span><span>•</span><span>•</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <form className="input-area" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type your message..."
                        className="chat-input"
                    />
                    <button type="submit" className="send-button">
                        Send ➤
                    </button>
                </form>
            </div>
        </>
    );
};

export default AiMentorPage;