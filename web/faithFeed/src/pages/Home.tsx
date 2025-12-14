import { useState } from 'react';
import './Home.css';
import PostCard from '../components/ui/Post/PostCard';

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

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([
        {
            id: 1,
            author: {
                name: 'Sarah Johnson',
                avatar: 'SJ',
                role: 'Member'
            },
            content: 'The Lord is my shepherd; I shall not want. This verse has given me so much peace today. 🙏',
            type: 'text',
            timestamp: '2 hours ago',
            reactions: 24,
            comments: 5,
            shares: 2,
            isLiked: false,
            isSaved: false
        },
        {
            id: 2,
            author: {
                name: 'David Miller',
                avatar: 'DM',
                role: 'Pastor'
            },
            content: 'Sharing my testimony about God\'s faithfulness this week. Click to listen.',
            type: 'audio',
            audioNote: 'A powerful testimony of healing and restoration',
            timestamp: '5 hours ago',
            reactions: 42,
            comments: 12,
            shares: 8,
            isLiked: true,
            isSaved: false
        }
    ]);

    const verseOfTheDay = {
        verse: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
        reference: 'John 3:16'
    };
    
    return (
        <div className="home-container">
            <div className="home-feed">
                <div className="home-header-container">
                    <h1>FaithFeed</h1>
                    <p className="home-description">
                        A blessed community where faith meets fellowship. Share your testimonies, 
                        inspire others with God's word, and grow together in Christ. 
                    </p>
                </div>
                
                {/* Posts Feed */}
                <div className="posts-feed">
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} posts={posts} setPosts={setPosts} />
                    ))}
                </div>

                {/* Load More Button */}
                <div className="load-more-container">
                    <button className="load-more-btn">Load More Posts</button>
                </div>
            </div>

            {/* Verse of the Day - Bottom Left */}
            <div className="verse-of-the-day">
                <h3>Verse of the Day</h3>
                <p className="verse-text">"{verseOfTheDay.verse}"</p>
                <p className="verse-reference">- {verseOfTheDay.reference}</p>
            </div>
        </div>
    );
}