const express = require('express');
const cors = require('cors');
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
