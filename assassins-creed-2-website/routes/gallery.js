const express = require('express');
const router = express.Router();
const db = require('../database/db');
const isAuthenticated = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
    try {
        const [gallery] = await db.query('SELECT * FROM gallery ORDER BY created_at DESC');
        res.json(gallery);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', isAuthenticated, upload.single('image'), async (req, res) => {
    const { title, description } = req.body;
    const image_url = req.file ? '/images/' + req.file.filename : '/images/placeholder.svg';

    try {
        const [result] = await db.query(
            'INSERT INTO gallery (title, description, image_url) VALUES (?, ?, ?)',
            [title, description, image_url]
        );
        res.json({ id: result.insertId, message: 'Image added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        await db.query('DELETE FROM gallery WHERE id = ?', [req.params.id]);
        res.json({ message: 'Image deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
