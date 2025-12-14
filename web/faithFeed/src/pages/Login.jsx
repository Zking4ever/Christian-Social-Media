import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../index.css'; // Ensure we have some styles
import bgImg from '../assets/bgImage.webp';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Where to redirect after login (default to home)
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) return;

        // Call login from context
        login({ email, name: email.split('@')[0] });

        // Navigate back to where they came from
        navigate(from, { replace: true });
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--primary-bg)',
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: '10000',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        padding: '2rem',
        borderRadius: '8px',
    };

    const inputStyle = {
        padding: '10px',
        marginBottom: '1rem',
        borderRadius: '4px',
        border: 'none',
    };

    const buttonStyle = {
        padding: '10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: 'var(--accent-color)',
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold',
    };

    return (
        <div style={containerStyle}>
            <h2>Login to FaithFeed</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                    required
                />
                <button type="submit" style={buttonStyle}>Login</button>
            </form>
            <p style={{ marginTop: '1rem' }}>
                Don't have an account? <Link to="/signup" style={{ color: '#3ea6ff' }}>Sign up</Link>
            </p>
        </div>
    );
};

export default Login;
