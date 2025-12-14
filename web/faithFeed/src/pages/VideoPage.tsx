import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { data, useLocation } from 'react-router-dom';
import YoutubeVid from '../components/ui/YoutubeVid/YoutubeVid';
import VideoData from '../components/interfaces/youtube';

const VideoPage = () => {
    const [videos, setVideos] = useState<VideoData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const location = useLocation();

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            try {
                // Get query from URL parameters
                const searchParams = new URLSearchParams(location.search);
                const query = searchParams.get('query');

                // Fetch from our local backend with query param
                const response = await axios.get('https://faithfeed.onrender.com/youtube-feed', {
                    params: { query }
                });

                setVideos(response.data.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching videos:", err);
                setError("Failed to load videos. Please try again later.");
                setLoading(false);
            }
        };

        fetchVideos();
    }, [location.search]);

    if (loading) return <div className="loading">Loading faith-filled content...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <>
            <div className="feed-container">
                {videos.map((item) => {
                    const videoId = item.id.videoId;
                    if (!videoId || !item.snippet.thumbnails) return null;
                    return (
                        <YoutubeVid vid={item} thumbnails={item.snippet.thumbnails} key={item.id.videoId} />
                    );
                })}
            </div>
        </>
    );
};

export default VideoPage;
