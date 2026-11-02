const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/characters', async (req, res) => {
    try {
        const [chars] = await db.query('SELECT * FROM characters');
        res.json(chars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/characters/:id', async (req, res) => {
    try {
        const [char] = await db.query('SELECT * FROM characters WHERE id = ?', [req.params.id]);
        if (char.length === 0) return res.status(404).json({ error: 'Character not found' });
        res.json(char[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
