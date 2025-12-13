const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Get feed (approved videos)
app.get('/feed', (req, res) => {
    const sql = 'SELECT * FROM posts WHERE approved = 1 ORDER BY created_at DESC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

// Submit post
app.post('/posts', (req, res) => {
    const { title, videoUrl, thumbnailUrl } = req.body;
    if (!title || !videoUrl) {
        return res.status(400).json({ error: 'Title and Video URL are required' });
    }

    // NOTE: Defaulting to approved for MVP demonstration.
    // In a real app, set approved = 0 and use an admin panel.
    const approved = 1;

    const sql = 'INSERT INTO posts (title, videoUrl, thumbnailUrl, approved) VALUES (?, ?, ?, ?)';
    const params = [title, videoUrl, thumbnailUrl || '', approved];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Post submitted successfully',
            data: { id: this.lastID, ...req.body }
        });
    });
});

app.get('/youtube-feed', async (req, res) => {
    try {
        const { query } = req.query;
        // Basic keywords or user query. Default to "Christian faith" if no query.
        const searchQuery = query || 'Christian faith messages';

        // You need a YouTube API Key in your .env file
        const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

        if (!YOUTUBE_API_KEY) {
            return res.status(500).json({ error: 'Server configuration error: Missing YouTube API Key' });
        }

        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: searchQuery,
                type: 'video',
                maxResults: 50,
                key: YOUTUBE_API_KEY,
                safeSearch: 'strict'
            }
        });

        const items = response.data.items;

        // Backend Filtering Logic
        const filteredItems = items.filter(item => {
            const title = item.snippet.title.toLowerCase();
            const description = item.snippet.description.toLowerCase();

            // 1. Negative Filtering (Blocklist)
            const blockList = ['hate', 'violence', 'explicit', 'badword', 'gambling'];
            const hasBlockedWord = blockList.some(word =>
                title.includes(word) || description.includes(word)
            );

            if (hasBlockedWord) return false;

            // 2. Positive Filtering (Christian Alignment)
            const christianKeywords = [
                'god', 'jesus', 'christ', 'bible', 'faith', 'prayer', 'worship',
                'church', 'gospel', 'holy', 'spirit', 'pastor', 'sermon',
                'devotional', 'testimony', 'christian'
            ];

            // Allow if it matches at least one Christian keyword
            const isAligned = christianKeywords.some(word =>
                title.includes(word) || description.includes(word)
            );

            return isAligned;
        });

        res.json({ data: filteredItems });

    } catch (error) {
        console.error('YouTube API Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch videos from YouTube' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
