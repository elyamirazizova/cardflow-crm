const express = require('express');
const database = require('../db');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Get all projects
router.get('/', authenticate, async (req, res) => {
    try {
        const projects = await database.all(
            'SELECT p.*, u.email as creator_email FROM projects p LEFT JOIN users u ON p.created_by = u.id ORDER BY p.created_at DESC'
        );

        // Convert boolean fields
        const formattedProjects = projects.map(project => ({
            ...project,
            industry_solution: Boolean(project.industry_solution),
            forecast: Boolean(project.forecast)
        }));

        res.json(formattedProjects);
    } catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({ error: 'Server error while fetching projects' });
    }
});

// Get single project
router.get('/:id', authenticate, async (req, res) => {
    try {
        const project = await database.get(
            'SELECT p.*, u.email as creator_email FROM projects p LEFT JOIN users u ON p.created_by = u.id WHERE p.id = ?',
            [req.params.id]
        );

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Convert boolean fields
        const formattedProject = {
            ...project,
            industry_solution: Boolean(project.industry_solution),
            forecast: Boolean(project.forecast)
        };

        res.json(formattedProject);
    } catch (error) {
        console.error('Get project error:', error);
        res.status(500).json({ error: 'Server error while fetching project' });
    }
});

// Create new project
router.post('/', authenticate, async (req, res) => {
    try {
        const {
            project_name,
            organization,
            inn,
            service,
            payment_type,
            stage,
            manager,
            business_segment,
            year,
            probability,
            stage_duration,
            industry_solution,
            forecast,
            description,
            revenue,
            expenses,
            status
        } = req.body;

        // Insert project
        const result = await database.run(
            `INSERT INTO projects (
                project_name, organization, inn, service, payment_type,
                stage, manager, business_segment, year, probability,
                stage_duration, industry_solution, forecast, description,
                revenue, expenses, status, created_by
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                project_name, organization, inn, service, payment_type,
                stage, manager, business_segment, year, probability || 0,
                stage_duration || 0, industry_solution ? 1 : 0, forecast ? 1 : 0,
                description, revenue || 0, expenses || 0, status || 'new',
                req.user.id
            ]
        );

        const project = await database.get(
            'SELECT * FROM projects WHERE id = ?',
            [result.lastID]
        );

        // Log activity
        await database.run(
            'INSERT INTO activity_log (user_id, action, project_id, details) VALUES (?, ?, ?, ?)',
            [req.user.id, 'created', result.lastID, `Created project: ${project_name}`]
        );

        res.status(201).json(project);
    } catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({ error: 'Server error while creating project' });
    }
});

// Update project
router.put('/:id', authenticate, async (req, res) => {
    try {
        const {
            project_name,
            organization,
            inn,
            service,
            payment_type,
            stage,
            manager,
            business_segment,
            year,
            probability,
            stage_duration,
            industry_solution,
            forecast,
            description,
            revenue,
            expenses,
            status
        } = req.body;

        // Update project
        const result = await database.run(
            `UPDATE projects SET
                project_name = ?, organization = ?, inn = ?, service = ?,
                payment_type = ?, stage = ?, manager = ?, business_segment = ?,
                year = ?, probability = ?, stage_duration = ?, industry_solution = ?,
                forecast = ?, description = ?, revenue = ?, expenses = ?, status = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?`,
            [
                project_name, organization, inn, service, payment_type,
                stage, manager, business_segment, year, probability || 0,
                stage_duration || 0, industry_solution ? 1 : 0, forecast ? 1 : 0,
                description, revenue || 0, expenses || 0, status,
                req.params.id
            ]
        );

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const project = await database.get(
            'SELECT * FROM projects WHERE id = ?',
            [req.params.id]
        );

        // Log activity
        await database.run(
            'INSERT INTO activity_log (user_id, action, project_id, details) VALUES (?, ?, ?, ?)',
            [req.user.id, 'updated', req.params.id, `Updated project: ${project_name}`]
        );

        res.json(project);
    } catch (error) {
        console.error('Update project error:', error);
        res.status(500).json({ error: 'Server error while updating project' });
    }
});

// Delete project
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const project = await database.get(
            'SELECT * FROM projects WHERE id = ?',
            [req.params.id]
        );

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        await database.run('DELETE FROM projects WHERE id = ?', [req.params.id]);

        // Log activity
        await database.run(
            'INSERT INTO activity_log (user_id, action, project_id, details) VALUES (?, ?, ?, ?)',
            [req.user.id, 'deleted', req.params.id, `Deleted project: ${project.project_name}`]
        );

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Delete project error:', error);
        res.status(500).json({ error: 'Server error while deleting project' });
    }
});

module.exports = router;

