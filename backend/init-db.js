const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, 'cardflow.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
        return;
    }
    console.log('Connected to SQLite database.');
});

// Create tables
db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        full_name TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        phone TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Projects table
    db.run(`CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_name TEXT NOT NULL,
        organization TEXT NOT NULL,
        inn TEXT NOT NULL,
        service TEXT NOT NULL,
        payment_type TEXT NOT NULL,
        stage TEXT NOT NULL,
        manager TEXT NOT NULL,
        business_segment TEXT NOT NULL,
        year TEXT NOT NULL,
        probability INTEGER DEFAULT 0,
        stage_duration INTEGER DEFAULT 0,
        industry_solution INTEGER DEFAULT 0,
        forecast INTEGER DEFAULT 0,
        description TEXT,
        revenue REAL DEFAULT 0,
        expenses REAL DEFAULT 0,
        status TEXT DEFAULT 'new',
        created_by INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
    )`);

    // Activity log table
    db.run(`CREATE TABLE IF NOT EXISTS activity_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        action TEXT NOT NULL,
        project_id INTEGER,
        details TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (project_id) REFERENCES projects(id)
    )`);

    console.log('Tables created successfully.');

    // Insert default users РОСТЕЛЕКОМ
    const defaultUsers = [
        {
            email: 'admin@rostelecom.ru',
            password: 'Admin123!',
            full_name: 'Главный администратор РОСТЕЛЕКОМ',
            role: 'admin',
            phone: '+7 (495) 123-45-67'
        },
        {
            email: 'analyst@rostelecom.ru',
            password: 'Analyst123!',
            full_name: 'Ведущий аналитик Петров',
            role: 'analyst',
            phone: '+7 (495) 123-45-68'
        },
        {
            email: 'user@rostelecom.ru',
            password: 'User123!',
            full_name: 'Менеджер проектов Иванов',
            role: 'user',
            phone: '+7 (495) 123-45-69'
        }
    ];

    // Хэшируем пароли для каждого пользователя
    const passwordHashes = {};
    defaultUsers.forEach(user => {
        passwordHashes[user.email] = bcrypt.hashSync(user.password, 10);
    });

    defaultUsers.forEach((user, index) => {
        db.run(
            `INSERT OR IGNORE INTO users (email, password, full_name, role, phone) 
             VALUES (?, ?, ?, ?, ?)`,
            [user.email, passwordHashes[user.email], user.full_name, user.role, user.phone],
            function(err) {
                if (err) {
                    console.error('Error inserting user:', err.message);
                } else if (this.lastID) {
                    console.log(`User ${user.email} created with ID ${this.lastID}`);
                }
            }
        );
    });

    // Insert demo projects
    const demoProjects = [
        {
            project_name: "Цифровизация банковской инфраструктуры",
            organization: "АО «Альфа-Банк»",
            inn: "7728168971",
            service: "cloud",
            payment_type: "installment",
            stage: "implementation",
            manager: "Иванов И.",
            business_segment: "corporate",
            year: "2024",
            probability: 90,
            stage_duration: 45,
            industry_solution: 1,
            forecast: 1,
            description: "Завершена миграция основных систем в облако. Клиенты отмечают повышение скорости работы приложений на 40%.",
            revenue: 4500000,
            expenses: 2800000,
            status: "active",
            created_by: 1
        },
        {
            project_name: "Внедрение CRM для сети магазинов",
            organization: "ООО «ТехноМаркет»",
            inn: "7734567890",
            service: "consulting",
            payment_type: "prepayment",
            stage: "contract",
            manager: "Петров П.",
            business_segment: "sme",
            year: "2024",
            probability: 65,
            stage_duration: 22,
            industry_solution: 0,
            forecast: 1,
            description: "Согласование технического задания с заказчиком. Рассматриваем два варианта реализации системы.",
            revenue: 1200000,
            expenses: 450000,
            status: "in_progress",
            created_by: 2
        },
        {
            project_name: "Система видеонаблюдения для ЖК",
            organization: "УК «Комфорт Сити»",
            inn: "7745678901",
            service: "security",
            payment_type: "postpayment",
            stage: "negotiation",
            manager: "Сидоров С.",
            business_segment: "government",
            year: "2024",
            probability: 40,
            stage_duration: 18,
            industry_solution: 1,
            forecast: 0,
            description: "Проведена демонстрация системы заказчику. Ожидаем ответ по бюджету до конца недели.",
            revenue: 2800000,
            expenses: 1500000,
            status: "in_progress",
            created_by: 3
        }
    ];

    demoProjects.forEach((project) => {
        db.run(
            `INSERT INTO projects (
                project_name, organization, inn, service, payment_type, 
                stage, manager, business_segment, year, probability, 
                stage_duration, industry_solution, forecast, description, 
                revenue, expenses, status, created_by
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                project.project_name, project.organization, project.inn,
                project.service, project.payment_type, project.stage,
                project.manager, project.business_segment, project.year,
                project.probability, project.stage_duration, project.industry_solution,
                project.forecast, project.description, project.revenue,
                project.expenses, project.status, project.created_by
            ],
            function(err) {
                if (err) {
                    console.error('Error inserting project:', err.message);
                } else {
                    console.log(`Project "${project.project_name}" created with ID ${this.lastID}`);
                }
            }
        );
    });
});

db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Database initialized successfully!');
    }
});

