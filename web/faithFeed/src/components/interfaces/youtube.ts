
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

export type { Thumbnail };
export default VideoData;