const express = require('express');
const database = require('../db');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Get analytics data
router.get('/', authenticate, async (req, res) => {
    try {
        // Get projects by stage
        const projectsByStage = await database.all(
            `SELECT stage, COUNT(*) as count FROM projects GROUP BY stage`
        );

        // Get projects by status
        const projectsByStatus = await database.all(
            `SELECT status, COUNT(*) as count FROM projects GROUP BY status`
        );

        // Get total revenue and expenses
        const financialStats = await database.get(
            `SELECT 
                SUM(revenue) as total_revenue, 
                SUM(expenses) as total_expenses,
                COUNT(*) as total_projects
            FROM projects`
        );

        // Get projects by manager
        const projectsByManager = await database.all(
            `SELECT manager, 
                    COUNT(*) as count, 
                    SUM(revenue) as revenue,
                    SUM(expenses) as expenses
            FROM projects 
            GROUP BY manager`
        );

        // Get recent activity
        const recentActivity = await database.all(
            `SELECT 
                a.id, 
                a.action, 
                a.details, 
                a.created_at,
                u.full_name as user_name,
                p.project_name
            FROM activity_log a
            LEFT JOIN users u ON a.user_id = u.id
            LEFT JOIN projects p ON a.project_id = p.id
            ORDER BY a.created_at DESC
            LIMIT 10`
        );

        res.json({
            projectsByStage,
            projectsByStatus,
            financialStats,
            projectsByManager,
            recentActivity
        });
    } catch (error) {
        console.error('Get analytics error:', error);
        res.status(500).json({ error: 'Server error while fetching analytics' });
    }
});

module.exports = router;

