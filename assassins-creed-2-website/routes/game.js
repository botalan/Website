const express = require('express');
const router = express.Router();
const db = require('../database/db');
const isAuthenticated = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/info', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM game_info LIMIT 1');
        res.json(rows[0] || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/info', isAuthenticated, upload.single('hero_image'), async (req, res) => {
    const { title, developer, publisher, genre, release_year, platforms, description } = req.body;
    let hero_image = req.body.existing_hero_image;

    if (req.file) {
        hero_image = '/images/' + req.file.filename;
    }

    try {
        await db.query(
            `UPDATE game_info SET title=?, developer=?, publisher=?, genre=?, release_year=?, platforms=?, description=?, hero_image=? WHERE id=1`,
            [title, developer, publisher, genre, release_year, platforms, description, hero_image]
        );
        res.json({ message: 'Game info updated successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
