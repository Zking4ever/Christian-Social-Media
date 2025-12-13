import './YoutubeVid.css'
import VideoData, { Thumbnail } from "../../interfaces/youtube";

import { Link } from 'react-router-dom';

export default function YoutubeVid({ vid, thumbnails }: { vid: VideoData, thumbnails: Thumbnail }) {
    console.log(vid)
    return (
        <Link to={`/watch/${vid.id.videoId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="video-card">
                <div className="video-thumbnail">
                    <img src={thumbnails.medium.url} alt={vid.snippet.title} />
                </div>
                <div className="video-info">
                    <div className="channel-avatar">✝️</div>
                    <div className="video-text">
                        <h3 className="video-title">{vid.snippet.title}</h3>
                        <p className="channel-name">{vid.snippet.channelTitle}</p>
                        <p className="video-meta">10K views • 2 hours ago</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}