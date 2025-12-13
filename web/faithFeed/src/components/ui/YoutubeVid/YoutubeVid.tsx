import './YoutubeVid.css'
interface videoData {
    videoId: string;
    snippet: {
        title: string,
        description: string,
        channelTitle: string,
        thumbnails: object
    }
}
export default function YoutubeVid({ vid }: { vid: videoData }) {
    return (
        <div key={vid.videoId} className="video-card">
            {/* (vid.snippet &&<img alt="" />) */}
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