import './YoutubeVid.css'

interface VideoSnippet {
    title: string;
    description: string;
    channelTitle: string;
    thumbnails?: Thumbnail;
}

interface VideoData {
    id: { videoId: string };
    snippet: VideoSnippet;
}
interface Thumbnail {
    default: { url: string; width?: number; height?: number; }
    medium: { url: string; width?: number; height?: number; }
    high: { url: string; width?: number; height?: number; }
}

export default function YoutubeVid({ vid, thumbnails }: { vid: VideoData, thumbnails: Thumbnail }) {
    return (
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
    );
}