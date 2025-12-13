import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VideoFeed.css';

const VideoFeed = () => {
    const [videos, setVideos] = useState([
        {
            id: { videoId: 'M5tZpM5Vq0Q' }, // Example: Hillsong Worship
            snippet: {
                title: 'What A Beautiful Name - Hillsong Worship',
                description: 'Official Lyrics Video for What A Beautiful Name by Hillsong Worship.',
                channelTitle: 'Hillsong Worship',
            }
        },
        {
            id: { videoId: 'Vn8phH0k5HI' }, // Example: Tasha Cobbs
            snippet: {
                title: 'Break Every Chain - Tasha Cobbs Leonard',
                description: 'Tasha Cobbs Leonard performing Break Every Chain live.',
                channelTitle: 'Tasha Cobbs Leonard',
            }
        },
        {
            id: { videoId: 'eF9h5W7v2wI' }, // Example: Chris Tomlin
            snippet: {
                title: 'Good Good Father - Chris Tomlin',
                description: 'Music video by Chris Tomlin performing Good Good Father.',
                channelTitle: 'Chris Tomlin',
            }
        },
        {
            id: { videoId: 'nQWFzMvCfLE' },
            snippet: {
                title: 'Way Maker - Sinach',
                description: 'Official live video of Way Maker by Sinach.',
                channelTitle: 'Sinach',
            }
        },
        {
            id: { videoId: '1s58rW0_NtA' },
            snippet: {
                title: 'Oceans (Where Feet May Fail) - Hillsong UNITED',
                description: 'Live at the Sea of Galilee.',
                channelTitle: 'Hillsong UNITED',
            }
        },
        {
            id: { videoId: 'S-796qBqK8E' },
            snippet: {
                title: 'Jireh | Elevation Worship & Maverick City',
                description: 'Jireh performed by Elevation Worship and Maverick City Music.',
                channelTitle: 'Elevation Worship',
            }
        }
    ]);
    const [loading, setLoading] = useState(false); // Set to false since we have data
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchVideos = async () => {
    //         try {
    //             // Fetch from our local backend
    //             const response = await axios.get('http://localhost:3000/youtube-feed');
    //             setVideos(response.data.data);
    //             setLoading(false);
    //         } catch (err) {
    //             console.error("Error fetching videos:", err);
    //             setError("Failed to load videos. Please try again later.");
    //             setLoading(false);
    //         }
    //     };
    //
    //     fetchVideos();
    // }, []);

    if (loading) return <div className="loading">Loading faith-filled content...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="youtube-clone">
            <header className="header">
                <div className="logo">
                    <span className="logo-icon">✝️</span> <span>FaithFeed</span>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search" />
                    <button>🔍</button>
                </div>
                <div className="user-menu">
                    <div className="avatar">👤</div>
                </div>
            </header>

            <div className="main-content">
                <aside className="sidebar">
                    <div className="nav-item active">🏠 Home</div>
                    <div className="nav-item">🔥 Trending</div>
                    <div className="nav-item">🎞️ Shorts</div>
                    <div className="nav-item">📁 Library</div>
                </aside>

                <div className="feed-container">
                    <div className="video-grid">
                        {videos.map((item) => {
                            const videoId = item.id.videoId;
                            if (!videoId) return null;

                            return (
                                <div key={videoId} className="video-card">
                                    <div className="thumbnail-container">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                                            title={item.snippet.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    <div className="video-info">
                                        <div className="channel-avatar">✝️</div>
                                        <div className="video-text">
                                            <h3 className="video-title">{item.snippet.title}</h3>
                                            <p className="channel-name">{item.snippet.channelTitle}</p>
                                            <p className="video-meta">10K views • 2 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoFeed;
