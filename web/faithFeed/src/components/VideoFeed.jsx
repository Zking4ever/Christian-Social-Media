import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VideoFeed.css';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import YoutubeVid from './ui/YoutubeVid/YoutubeVid';

const VideoFeed = () => {
    const [videos, setVideos] = useState([
        {
            id: { videoId: 'M5tZpM5Vq0Q' }, // Example: Hillsong Worship
            snippet: {
                title: 'What A Beautiful Name - Hillsong Worship',
                description: 'Official Lyrics Video for What A Beautiful Name by Hillsong Worship.',
                thumbnails: {
                    default: { url: 'https://i.ytimg.com/vi/M5tZpM5Vq0Q/default.jpg' },
                    medium: { url: 'https://i.ytimg.com/vi/M5tZpM5Vq0Q/default.jpg' },
                    high: { url: 'https://i.ytimg.com/vi/M5tZpM5Vq0Q/default.jpg' },
                },
                channelTitle: 'Hillsong Worship',
            }
        },
        {
            id: { videoId: 'Vn8phH0k5HI' }, // Example: Tasha Cobbs
            snippet: {
                title: 'Break Every Chain - Tasha Cobbs Leonard',
                description: 'Tasha Cobbs Leonard performing Break Every Chain live.',
                thumbnails: {
                    default: { url: 'https://i.ytimg.com/vi/Vn8phH0k5HI/default.jpg' },
                    medium: { url: 'https://i.ytimg.com/vi/Vn8phH0k5HI/default.jpg' },
                    high: { url: 'https://i.ytimg.com/vi/Vn8phH0k5HI/default.jpg' },
                },
                channelTitle: 'Tasha Cobbs Leonard',
            }
        },
        {
            id: { videoId: 'eF9h5W7v2wI' }, // Example: Chris Tomlin
            snippet: {
                title: 'Good Good Father - Chris Tomlin',
                description: 'Music video by Chris Tomlin performing Good Good Father.',
                thumbnails: {
                    default: { url: 'https://i.ytimg.com/vi/eF9h5W7v2wI/default.jpg' },
                    medium: { url: 'https://i.ytimg.com/vi/eF9h5W7v2wI/default.jpg' },
                    high: { url: 'https://i.ytimg.com/vi/eF9h5W7v2wI/default.jpg' },
                },
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
            <Header />
            <SideBar />
            <div className="main-content">
                <div className="feed-container">
                    <div className="video-grid">
                        {videos.map((item) => {
                            const videoId = item.id.videoId;
                            if (!videoId) return null;
                            return (
                                <YoutubeVid vid={item} key={item.id.videoId} />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoFeed;
