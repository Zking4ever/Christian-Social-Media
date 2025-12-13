import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YoutubeVid from '../components/ui/YoutubeVid/YoutubeVid';
import VideoData from '../components/interfaces/youtube';

const VideoPage = () => {
    const [videos, setVideos] = useState<VideoData[]>([]);
    const [loading, setLoading] = useState(false); // Set to false since we have data
    const [error, setError] = useState('');

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
        <div className="feed-container">
            {videos.map((item) => {
                const videoId = item.id.videoId;
                if (!videoId) return null;
                return (
                    <YoutubeVid vid={item} thumbnails={item.snippet.thumbnails} key={item.id.videoId} />
                );
            })}
        </div>
    );
};

export default VideoPage;
