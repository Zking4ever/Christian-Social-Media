import { useState } from "react";
import { IoMdPhotos, IoMdVolumeHigh } from 'react-icons/io';
import { MdTextFields } from 'react-icons/md';

interface Post {
    id: number;
    author: {
        name: string;
        avatar: string;
        role: string;
    };
    content: string;
    type: 'text' | 'photo' | 'audio';
    audioNote?: string;
    timestamp: string;
    reactions: number;
    comments: number;
    shares: number;
    isLiked: boolean;
    isSaved: boolean;
}

export default function createPost({ posts, setPosts }: { posts: Post[]; setPosts: React.Dispatch<React.SetStateAction<Post[]>> }) {
    
    const [postContent, setPostContent] = useState('');
    const [audioNote, setAudioNote] = useState('');
    const [postType, setPostType] = useState<'text' | 'photo' | 'audio'>('text');

    const handlePost = () => {
        if (!postContent.trim()) return;

        const newPost: Post = {
            id: posts.length + 1,
            author: {
                name: 'You',
                avatar: 'Y',
                role: 'Member'
            },
            content: postContent,
            type: postType,
            audioNote: postType === 'audio' ? audioNote : undefined,
            timestamp: 'Just now',
            reactions: 0,
            comments: 0,
            shares: 0,
            isLiked: false,
            isSaved: false
        };
        setPosts([newPost, ...posts]);
        setPostContent('');
        setAudioNote('');
        setPostType('text');
    };

    
    return <div className="create-post-card">
                    <textarea
                        className="post-input"
                        placeholder="Share your thoughts, scripture, or testimony..."
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        rows={3}
                    />

                    {postType === 'audio' && (
                        <input
                            type="text"
                            className="audio-note-input"
                            placeholder="Add a note with your audio..."
                            value={audioNote}
                            onChange={(e) => setAudioNote(e.target.value)}
                        />
                    )}

                    <div className="post-actions">
                        <div className="post-type-selector">
                            <button
                                className={`type-btn ${postType === 'photo' ? 'active' : ''}`}
                                onClick={() => setPostType('photo')}
                                title="Photo"
                            >
                                <IoMdPhotos /> Photo
                            </button>
                            <button
                                className={`type-btn ${postType === 'text' ? 'active' : ''}`}
                                onClick={() => setPostType('text')}
                                title="Text"
                            >
                                <MdTextFields /> Text
                            </button>
                            <button
                                className={`type-btn ${postType === 'audio' ? 'active' : ''}`}
                                onClick={() => setPostType('audio')}
                                title="Audio"
                            >
                                <IoMdVolumeHigh /> Audio
                            </button>
                        </div>
                        <button className="post-btn" onClick={handlePost}>
                            Post
                        </button>
                    </div>
                </div>
}