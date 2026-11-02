const express = require('express');
const router = express.Router();
const db = require('../database/db');
const isAuthenticated = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
    try {
        const [news] = await db.query('SELECT * FROM news ORDER BY created_at DESC');
        res.json(news);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [news] = await db.query('SELECT * FROM news WHERE id = ?', [req.params.id]);
        if (news.length === 0) return res.status(404).json({ error: 'News not found' });
        res.json(news[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', isAuthenticated, upload.single('image'), async (req, res) => {
    const { category, title, short_description, content } = req.body;
    const image_url = req.file ? '/images/' + req.file.filename : '/images/placeholder.svg';

    try {
        const [result] = await db.query(
            'INSERT INTO news (category, title, short_description, content, image_url) VALUES (?, ?, ?, ?, ?)',
            [category, title, short_description, content, image_url]
        );
        res.json({ id: result.insertId, message: 'News added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', isAuthenticated, upload.single('image'), async (req, res) => {
    const { category, title, short_description, content } = req.body;
    let image_url = req.body.existing_image;

    if (req.file) {
        image_url = '/images/' + req.file.filename;
    }

    try {
        await db.query(
            'UPDATE news SET category=?, title=?, short_description=?, content=?, image_url=? WHERE id=?',
            [category, title, short_description, content, image_url, req.params.id]
        );
        res.json({ message: 'News updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        await db.query('DELETE FROM news WHERE id = ?', [req.params.id]);
        res.json({ message: 'News deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
