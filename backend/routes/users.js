const express = require('express');
const database = require('../db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all users (admin only)
router.get('/', authenticate, authorize('admin'), async (req, res) => {
    try {
        const users = await database.all(
            'SELECT id, email, full_name, role, phone, created_at FROM users ORDER BY created_at DESC'
        );
        res.json(users);
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ error: 'Server error while fetching users' });
    }
});

// Get single user
router.get('/:id', authenticate, async (req, res) => {
    try {
        const user = await database.get(
            'SELECT id, email, full_name, role, phone, created_at FROM users WHERE id = ?',
            [req.params.id]
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Server error while fetching user' });
    }
});

// Get current user
router.get('/me/profile', authenticate, async (req, res) => {
    try {
        const user = await database.get(
            'SELECT id, email, full_name, role, phone, created_at FROM users WHERE id = ?',
            [req.user.id]
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({ error: 'Server error while fetching user' });
    }
});

module.exports = router;

