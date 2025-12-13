import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import YoutubeVid from '../components/ui/YoutubeVid/YoutubeVid';
import VideoData from '../components/interfaces/youtube';
import './WatchPage.css';

const WatchPage = () => {
    const { videoId } = useParams();
    const [relatedVideos, setRelatedVideos] = useState<VideoData[]>([]);

    useEffect(() => {
        // Fetch related videos (using same feed logic for MVP)
        const fetchRelated = async () => {
            try {
                const response = await axios.get('http://localhost:3000/youtube-feed');
                // Filter out current video from related list
                const filtered = response.data.data.filter((v: VideoData) => v.id.videoId !== videoId);
                setRelatedVideos(filtered);
            } catch (err) {
                console.error("Error fetching related videos:", err);
            }
        };
        fetchRelated();
    }, [videoId]);

    if (!videoId) return <div>Invalid Video ID</div>;

    return (
        <div className="watch-page">
            <div className="player-section">
                <div className="video-player-wrapper">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                {/* Video Title and Description could go here if we fetched video details */}
            </div>
            <div className="related-videos-section">
                <h3>Related Faith Content</h3>
                <div className="related-grid">
                    {relatedVideos.map((item) => (
                        <YoutubeVid vid={item} thumbnails={(item.snippet.thumbnails)} key={item.id.videoId} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WatchPage;
