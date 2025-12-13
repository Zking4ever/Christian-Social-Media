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
                    default: { url: 'https://i.ytimg.com/vi/jUTfJuubgkE/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCI_baOsTiDRzHKZIy9aDmmcZMBXA' },
                    medium: { url: 'https://i.ytimg.com/vi/jUTfJuubgkE/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCI_baOsTiDRzHKZIy9aDmmcZMBXA' },
                    high: { url: 'https://i.ytimg.com/vi/jUTfJuubgkE/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCI_baOsTiDRzHKZIy9aDmmcZMBXA' },
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
                    default: { url: 'https://i.ytimg.com/vi/Viiw6tGimHo/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAN60KZJWjp5yIlDNnAwlpMoXZ7yA' },
                    medium: { url: 'https://i.ytimg.com/vi/Viiw6tGimHo/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAN60KZJWjp5yIlDNnAwlpMoXZ7yA' },
                    high: { url: 'https://i.ytimg.com/vi/Viiw6tGimHo/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAN60KZJWjp5yIlDNnAwlpMoXZ7yA' },
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
                    default: { url: 'https://i.ytimg.com/vi/1iV6nfSntt0/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCI2JkSLw2JB80To-y9iEx2hM98RQ' },
                    medium: { url: 'https://i.ytimg.com/vi/1iV6nfSntt0/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCI2JkSLw2JB80To-y9iEx2hM98RQ' },
                    high: { url: 'https://i.ytimg.com/vi/1iV6nfSntt0/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCI2JkSLw2JB80To-y9iEx2hM98RQ' },
                },
                channelTitle: 'Chris Tomlin',
            }
        },
        {
            id: { videoId: 'nQWFzMvCfLE' },
            snippet: {
                title: 'Way Maker - Sinach',
                description: 'Official live video of Way Maker by Sinach.',
                thumbnails: {
                    default: { url: 'https://i.ytimg.com/vi/4-Oyh794JjA/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGHIgRCg1MA8=&rs=AOn4CLDyXjOFGRkSUvaJsEGzWREi1tw9sQ' },
                    medium: { url: 'https://i.ytimg.com/vi/4-Oyh794JjA/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGHIgRCg1MA8=&rs=AOn4CLDyXjOFGRkSUvaJsEGzWREi1tw9sQ' },
                    high: { url: 'https://i.ytimg.com/vi/4-Oyh794JjA/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGHIgRCg1MA8=&rs=AOn4CLDyXjOFGRkSUvaJsEGzWREi1tw9sQ' },
                },
                channelTitle: 'Sinach',
            }
        },
        {
            id: { videoId: '1s58rW0_NtA' },
            snippet: {
                title: 'Oceans (Where Feet May Fail) - Hillsong UNITED',
                description: 'Live at the Sea of Galilee.',
                thumbnails: {
                    default: { url: 'https://i.ytimg.com/vi/4hpm7nz8IZc/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC0wVjfp74_XQvqzJZ45c1ohie2uA' },
                    medium: { url: 'https://i.ytimg.com/vi/4hpm7nz8IZc/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC0wVjfp74_XQvqzJZ45c1ohie2uA' },
                    high: { url: 'https://i.ytimg.com/vi/4hpm7nz8IZc/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC0wVjfp74_XQvqzJZ45c1ohie2uA' },
                },
                channelTitle: 'Hillsong UNITED',
            }
        },
        {
            id: { videoId: 'S-796qBqK8E' },
            snippet: {
                title: 'Jireh | Elevation Worship & Maverick City',
                description: 'Jireh performed by Elevation Worship and Maverick City Music.',
                channelTitle: 'Elevation Worship',
                thumbnails: {
                    default: { url: 'https://i.ytimg.com/vi/1iV6nfSntt0/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCI2JkSLw2JB80To-y9iEx2hM98RQ' },
                    medium: { url: 'https://i.ytimg.com/vi/1iV6nfSntt0/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCI2JkSLw2JB80To-y9iEx2hM98RQ' },
                    high: { url: 'https://i.ytimg.com/vi/1iV6nfSntt0/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCI2JkSLw2JB80To-y9iEx2hM98RQ' },
                },
            }
        }
    ]);
    const [loading, setLoading] = useState(false); // Set to false since we have data
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                // Fetch from our local backend
                const response = await axios.get('http://localhost:3000/youtube-feed');
                setVideos(response.data.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching videos:", err);
                setError("Failed to load videos. Please try again later.");
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) return <div className="loading">Loading faith-filled content...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <>
            <Header />
            <SideBar />
            <div className="feed-container">
                {videos.map((item) => {
                    const videoId = item.id.videoId;
                    if (!videoId) return null;
                    return (
                        <YoutubeVid vid={item} thumbnails={item.snippet.thumbnails} key={item.id.videoId} />
                    );
                })}
            </div>
        </>
    );
};

export default VideoFeed;
