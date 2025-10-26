
// Shared functionality
document.addEventListener('DOMContentLoaded', function() {
    // Highlight current page in navbar
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('custom-navbar a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

// Handle user avatar click
    const userAvatar = document.getElementById('userAvatar');
    if (userAvatar) {
        userAvatar.addEventListener('click', function() {
            window.location.href = 'profile.html';
        });
        userAvatar.style.cursor = 'pointer';
    }

// Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Validate credentials here
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (username && password) {
                // Hide auth modal and show cards page
                document.querySelector('auth-modal').style.display = 'none';
                window.location.href = 'cards.html';
            }
        });
    }
});

// Function to toggle card flip
function flipCard(cardId) {
    const card = document.getElementById(cardId);
    card.classList.toggle('is-flipped');
}
// Function to initialize charts
let projectChart, managerChart, stageChart, expenseChart;

function initCharts() {
    // Project chart
    const projectCtx = document.getElementById('projectChart');
    projectChart = new Chart(projectCtx, {
        type: 'bar',
        data: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
            datasets: [{
                label: 'Новые проекты',
                data: [5, 8, 6, 9, 7, 10],
                backgroundColor: '#7400bc'
            }, {
                label: 'Завершенные проекты',
                data: [2, 3, 4, 3, 5, 4],
                backgroundColor: '#ff4800'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1.5,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end'
                }
            }
}
    });

    // Manager chart
    const managerCtx = document.getElementById('managerChart');
    managerChart = new Chart(managerCtx, {
        type: 'bar',
        data: {
            labels: ['Иванов И.', 'Петров П.', 'Сидоров С.'],
            datasets: [{
                label: 'Выручка',
                data: [1200000, 1800000, 900000],
                backgroundColor: '#7400bc'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Stage chart
    const stageCtx = document.getElementById('stageChart');
    stageChart = new Chart(stageCtx, {
        type: 'pie',
        data: {
            labels: ['Новые', 'В работе', 'Завершённые'],
            datasets: [{
                data: [15, 25, 10],
                backgroundColor: ['#7400bc', '#ff4800', '#4b5563'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Expense chart
    const expenseCtx = document.getElementById('expenseChart');
    expenseChart = new Chart(expenseCtx, {
        type: 'bar',
        data: {
            labels: ['Оборудование', 'Услуги', 'Персонал', 'Прочее'],
            datasets: [{
                label: 'Затраты',
                data: [500000, 300000, 700000, 200000],
                backgroundColor: ['#7400bc', '#ff4800', '#4b5563', '#9ca3af']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart type change handlers
    document.getElementById('chartType1').addEventListener('change', function() {
        projectChart.config.type = this.value;
        projectChart.update();
    });

    document.getElementById('chartType2').addEventListener('change', function() {
        managerChart.config.type = this.value;
        managerChart.update();
    });

    document.getElementById('chartType3').addEventListener('change', function() {
        stageChart.config.type = this.value;
        stageChart.update();
    });

    document.getElementById('chartType4').addEventListener('change', function() {
        expenseChart.config.type = this.value;
        expenseChart.update();
    });
}
// Export functions
function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('Отчёт по карточкам', 10, 10);
    doc.save('report.pdf');
}

function exportToExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.book_append_sheet(wb, ws, "Отчёт");
    XLSX.writeFile(wb, "report.xlsx");
}

// Initialize charts when page loads
if (document.getElementById('stageChart')) {
    initCharts();
}

// В конец script.js добавляем:
function loadProjectsFromLocalStorage() {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    projects.forEach(project => {
        const projectCard = document.createElement('project-card');
        projectCard.setAttribute('project-name', project.projectName);
        projectCard.setAttribute('organization', project.organization);
        projectCard.setAttribute('inn', project.inn);
        projectCard.setAttribute('manager', project.manager);
        projectCard.setAttribute('service', project.service);
        projectCard.setAttribute('payment-type', project.paymentType);
        projectCard.setAttribute('business-segment', project.businessSegment);
        projectCard.setAttribute('year', project.year);
        projectCard.setAttribute('stage', project.stage);
        projectCard.setAttribute('status', project.status);
        projectCard.setAttribute('revenue', project.revenue);
        projectCard.setAttribute('expenses', project.expenses);
        projectCard.setAttribute('description', project.description);
        projectCard.setAttribute('industry-solution', project.industrySolution.toString());
        projectCard.setAttribute('forecast', project.forecast.toString());
        projectCard.setAttribute('probability', project.probability || '0');
        projectCard.setAttribute('stage-duration', project.stageDuration ? `${project.stageDuration} дней` : 'Не указан');
        projectCard.setAttribute('last-update', `Создано: ${new Date(project.createdAt).toLocaleString('ru-RU')}`);

        const container = document.querySelector('.grid') || document.querySelector('.dashboard-grid');
        if (container) {
            container.appendChild(projectCard);
        }
    });
}

// Загружаем проекты при загрузке страницы
if (document.querySelector('project-card')) {
    document.addEventListener('DOMContentLoaded', loadProjectsFromLocalStorage);
}

// В конец script.js добавляем:
function initDemoProjects() {
    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // Если проектов нет - создаем демо-проекты
    if (existingProjects.length === 0) {
        const demoProjects = [
            {
                id: 1,
                projectName: "Цифровизация банковской инфраструктуры",
                organization: "АО «Альфа-Банк»",
                inn: "7728168971",
                service: "cloud",
                paymentType: "installment",
                stage: "implementation",
                manager: "1",
                businessSegment: "corporate",
                year: "2024",
                probability: "90",
                stageDuration: "45",
                industrySolution: true,
                forecast: true,
                description: "Завершена миграция основных систем в облако. Клиенты отмечают повышение скорости работы приложений.",
                revenue: "4500000",
                expenses: "2800000",
                status: "active",
                createdAt: new Date('2024-01-15').toISOString(),
                createdBy: 1
            },
            {
                id: 2,
                projectName: "Внедрение CRM для сети магазинов", 
                organization: "ООО «ТехноМаркет»",
                inn: "7734567890",
                service: "consulting",
                paymentType: "prepayment",
                stage: "contract",
                manager: "2",
                businessSegment: "sme", 
                year: "2024",
                probability: "65",
                stageDuration: "22",
                industrySolution: false,
                forecast: true,
                description: "Согласование технического задания. Клиент рассматривает два варианта реализации.",
                revenue: "1200000",
                expenses: "450000",
                status: "in_progress",
                createdAt: new Date('2024-02-01').toISOString(),
                createdBy: 2
            },
            {
                id: 3,
                projectName: "Система видеонаблюдения для ЖК",
                organization: "УК «Комфорт Сити»",
                inn: "7745678901",
                service: "security",
                paymentType: "postpayment", 
                stage: "negotiation",
                manager: "3",
                businessSegment: "government",
                year: "2024",
                probability: "40",
                stageDuration: "18",
                industrySolution: true,
                forecast: false,
                description: "Проведена демонстрация системы. Ожидаем ответ по бюджету от заказчика.",
                revenue: "2800000", 
                expenses: "1500000",
                status: "in_progress",
                createdAt: new Date('2024-02-10').toISOString(),
                createdBy: 3
            }
        ];

        localStorage.setItem('projects', JSON.stringify(demoProjects));
        console.log('Демо-проекты созданы!');
    }
}

// Запускаем при загрузке страницы проектов
if (window.location.pathname.includes('projects.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        initDemoProjects();
        loadProjectsFromLocalStorage();
    });
}


// Добавляем в script.js
function resetDemoData() {
    if (confirm('Удалить все текущие проекты и загрузить свежие демо-данные?')) {
        localStorage.removeItem('projects');
        initDemoData();
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }
}

function loadProjectsFromLocalStorage() {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const container = document.querySelector('.grid') || document.querySelector('.dashboard-grid') || document.querySelector('.container');
    
    console.log('Загружаем проекты:', projects.length);
    
    // Очищаем контейнер
    if (container) {
        container.innerHTML = '';
        
        // Создаем grid контейнер если его нет
        if (!container.classList.contains('grid')) {
            container.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-6');
        }
    }
    
    projects.forEach(project => {
        const projectCard = document.createElement('project-card');
        
        // Заполняем все атрибуты
        projectCard.setAttribute('project-name', project.projectName || 'Без названия');
        projectCard.setAttribute('organization', project.organization || 'Не указана');
        projectCard.setAttribute('inn', project.inn || 'Не указан');
        projectCard.setAttribute('manager', project.manager || 'Не назначен');
        projectCard.setAttribute('service', this.getServiceName(project.service) || 'Не указана');
        projectCard.setAttribute('payment-type', project.paymentType || 'Не указан');
        projectCard.setAttribute('business-segment', this.getBusinessSegmentText(project.businessSegment) || 'Не указан');
        projectCard.setAttribute('year', project.year || '2024');
        projectCard.setAttribute('stage', project.stage || 'new');
        projectCard.setAttribute('status', project.status || 'new');
        projectCard.setAttribute('revenue', project.revenue || '0');
        projectCard.setAttribute('expenses', project.expenses || '0');
        projectCard.setAttribute('description', project.description || 'Описание не добавлено');
        projectCard.setAttribute('industry-solution', (project.industrySolution || false).toString());
        projectCard.setAttribute('forecast', (project.forecast || false).toString());
        projectCard.setAttribute('probability', project.probability || '0');
        projectCard.setAttribute('stage-duration', project.stageDuration ? `${project.stageDuration} дней` : 'Не указан');
        projectCard.setAttribute('last-update', project.createdAt ? `Создано: ${new Date(project.createdAt).toLocaleString('ru-RU')}` : 'Нет данных');

        if (container) {
            container.appendChild(projectCard);
        }
    });
    
    // Инициализируем иконки
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// Вспомогательные функции
function getServiceName(serviceId) {
    const services = {
        'cloud': 'Облачные решения',
        'network': 'Сетевые решения',
        'security': 'Безопасность', 
        'consulting': 'Консалтинг',
        'support': 'Техническая поддержка'
    };
    return services[serviceId] || serviceId;
}

function getBusinessSegmentText(segment) {
    const segments = {
        'sme': 'Малый и средний бизнес',
        'corporate': 'Корпоративный сегмент',
        'government': 'Госсектор'
    };
    return segments[segment] || segment;
}