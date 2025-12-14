import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { IoMdPhotos, IoMdVolumeHigh } from 'react-icons/io';
import { FaRegComment, FaShare, FaBookmark, FaRegBookmark } from 'react-icons/fa';

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

export default function PostCard({ post, posts, setPosts }: { post: Post; posts: Post[]; setPosts: React.Dispatch<React.SetStateAction<Post[]>> }) {

    const handleReaction = (postId: number) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    isLiked: !post.isLiked,
                    reactions: post.isLiked ? post.reactions - 1 : post.reactions + 1
                };
            }
            return post;
        }));
    };

    const handleSave = (postId: number) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return { ...post, isSaved: !post.isSaved };
            }
            return post;
        }));
    };

        return  <div key={post.id} className="post-card">
                            <div className="post-header">
                                <div className="author-info">
                                    <div className="author-avatar">{post.author.avatar}</div>
                                    <div className="author-details">
                                        <div className="author-name">{post.author.name}</div>
                                        <div className="post-meta">
                                            {post.author.role} · {post.timestamp}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="post-content">
                                <p>{post.content}</p>
                                {post.type === 'audio' && post.audioNote && (
                                    <div className="audio-note">
                                        <IoMdVolumeHigh /> {post.audioNote}
                                    </div>
                                )}
                                {post.type === 'photo' && (
                                    <div className="post-media">
                                        <div className="media-placeholder">📷 Photo content</div>
                                    </div>
                                )}
                            </div>

                            {/* Engagement Stats */}
                            <div className="engagement-stats">
                                <div className="stats-left">
                                    {post.reactions > 0 && (
                                        <span className="stat-item">
                                            <AiFillHeart className="stat-icon" /> {post.reactions}
                                        </span>
                                    )}
                                </div>
                                <div className="stats-right">
                                    {post.comments > 0 && (
                                        <span className="stat-item">{post.comments} comments</span>
                                    )}
                                    {post.shares > 0 && (
                                        <span className="stat-item">{post.shares} shares</span>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="post-actions-bar">
                                <button
                                    className={`action-btn ${post.isLiked ? 'liked' : ''}`}
                                    onClick={() => handleReaction(post.id)}
                                >
                                    {post.isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                                    React
                                </button>
                                <button className="action-btn">
                                    <FaRegComment /> Comment
                                </button>
                                <button className="action-btn">
                                    <FaShare /> Share
                                </button>
                                <button
                                    className={`action-btn ${post.isSaved ? 'saved' : ''}`}
                                    onClick={() => handleSave(post.id)}
                                >
                                    {post.isSaved ? <FaBookmark /> : <FaRegBookmark />}
                                    Save
                                </button>
                            </div>
                        </div>
}
