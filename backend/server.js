const express = require('express');
const cors = require('cors');
const database = require('./db');
const config = require('./config');

// Import routes
const authRoutes = require('./routes/auth');
const projectsRoutes = require('./routes/projects');
const usersRoutes = require('./routes/users');
const analyticsRoutes = require('./routes/analytics');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
database.connect().catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'CardFlow API is running' });
});

// Start server
app.listen(config.PORT, () => {
    console.log(`🚀 CardFlow API server is running on http://localhost:${config.PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${config.PORT}/api`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('\nShutting down gracefully...');
    await database.close();
    process.exit(0);
});

