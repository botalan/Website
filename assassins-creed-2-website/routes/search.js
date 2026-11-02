const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', async (req, res) => {
    const query = `%${req.query.q || ''}%`;
    try {
        const [news] = await db.query('SELECT id, title, short_description AS snippet, "news" AS type FROM news WHERE title LIKE ? OR content LIKE ?', [query, query]);
        const [chars] = await db.query('SELECT id, name AS title, description AS snippet, "content" AS type FROM characters WHERE name LIKE ? OR description LIKE ?', [query, query]);
        
        res.json([...news, ...chars]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
