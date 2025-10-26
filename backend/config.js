require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3001,
    JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
    NODE_ENV: process.env.NODE_ENV || 'development'
};

