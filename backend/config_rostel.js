require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'rostel_secure_jwt_key_2024',
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    // РОСТЕЛЕКОМ роли с конкретными паролями
    ROLES: {
        ADMIN: {
            email: 'admin@rostelecom.ru',
            password: 'Admin123!',
            role: 'admin',
            full_name: 'Главный администратор системы'
        },
        ANALYST: {
            email: 'analyst@rostelecom.ru',
            password: 'Analyst123!',
            role: 'analyst',
            full_name: 'Ведущий аналитик'
        },
        USER: {
            email: 'user@rostelecom.ru',
            password: 'User123!',
            role: 'user',
            full_name: 'Менеджер проектов'
        }
    }
};

