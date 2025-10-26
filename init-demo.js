// init-demo.js
function initDemoData() {
    console.log('Инициализируем демо-данные...');
    
    // Очищаем старые данные
    localStorage.removeItem('projects');
    
    // Создаем нормализованные демо-проекты без дубликатов
    const demoProjects = [
        {
            id: 1,
            project_name: "Цифровизация банковской инфраструктуры",
            organization: "АО «Альфа-Банк»",
            inn: "7728168971",
            service: "cloud",
            payment_type: "installment",
            stage: "implementation",
            manager: "Иванов И.",
            business_segment: "corporate",
            year: "2024",
            probability: "90",
            stage_duration: "45",
            industry_solution: true,
            forecast: true,
            description: "Завершена миграция основных систем в облако. Клиенты отмечают повышение скорости работы приложений на 40%.",
            revenue: "4500000",
            expenses: "2800000",
            status: "active",
            created_at: new Date('2024-01-15').toISOString()
        },
        {
            id: 2,
            project_name: "Внедрение CRM для сети магазинов",
            organization: "ООО «ТехноМаркет»", 
            inn: "7734567890",
            service: "consulting",
            payment_type: "prepayment",
            stage: "contract",
            manager: "Петров П.",
            business_segment: "sme",
            year: "2024",
            probability: "65",
            stage_duration: "22",
            industry_solution: false,
            forecast: true,
            description: "Согласование технического задания с заказчиком. Рассматриваем два варианта реализации системы.",
            revenue: "1200000",
            expenses: "450000",
            status: "in_progress", 
            created_at: new Date('2024-02-01').toISOString()
        },
        {
            id: 3,
            project_name: "Система видеонаблюдения для ЖК",
            organization: "УК «Комфорт Сити»",
            inn: "7745678901",
            service: "security",
            payment_type: "postpayment",
            stage: "negotiation", 
            manager: "Сидоров С.",
            business_segment: "government",
            year: "2024",
            probability: "40",
            stage_duration: "18",
            industry_solution: true,
            forecast: false,
            description: "Проведена демонстрация системы заказчику. Ожидаем ответ по бюджету до конца недели.",
            revenue: "2800000",
            expenses: "1500000",
            status: "in_progress",
            created_at: new Date('2024-02-10').toISOString()
        },
        {
            id: 4,
            project_name: "Обновление ИТ-инфраструктуры офиса",
            organization: "ООО «Деловые решения»",
            inn: "7756789012",
            service: "network",
            payment_type: "prepayment",
            stage: "analysis",
            manager: "Иванов И.",
            business_segment: "sme",
            year: "2024",
            probability: "25", 
            stage_duration: "8",
            industry_solution: false,
            forecast: false,
            description: "Начали аудит текущей инфраструктуры. Составляем техническое задание для заказчика.",
            revenue: "850000",
            expenses: "350000",
            status: "new",
            created_at: new Date('2024-02-15').toISOString()
        },
        {
            id: 5,
            project_name: "Техническая поддержка ERP-системы",
            organization: "ПАО «Машиностроительный завод»",
            inn: "7767890123", 
            service: "support",
            payment_type: "postpayment",
            stage: "completion",
            manager: "Петров П.",
            business_segment: "corporate",
            year: "2024",
            probability: "95",
            stage_duration: "120",
            industry_solution: true,
            forecast: true,
            description: "Проект успешно завершен. Все системы работают стабильно. Готовим итоговый отчет для заказчика.",
            revenue: "3200000", 
            expenses: "1800000",
            status: "completed",
            created_at: new Date('2024-01-20').toISOString()
        }
    ];

    localStorage.setItem('projects', JSON.stringify(demoProjects));
    console.log('Демо-проекты созданы!', demoProjects.length, 'проектов');
    
    // Показываем уведомление
    alert('🎉 Демо-проекты созданы! ' + demoProjects.length + ' готовых карточек загружены в систему.');
    
    // Перезагружаем страницу проектов если мы на ней
    if (window.location.pathname.includes('projects.html') || 
        window.location.pathname.includes('analytics.html')) {
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }
}

// Функция для преобразования старых данных в новые
function migrateOldData() {
    const oldProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    if (oldProjects.length > 0 && oldProjects[0].projectName) {
        // Конвертируем старые названия полей в новые
        const migratedProjects = oldProjects.map(project => ({
            id: project.id,
            project_name: project.projectName || project.project_name,
            organization: project.organization,
            inn: project.inn,
            service: project.service,
            payment_type: project.paymentType || project.payment_type,
            stage: project.stage,
            manager: project.manager,
            business_segment: project.businessSegment || project.business_segment,
            year: project.year,
            probability: project.probability,
            stage_duration: project.stageDuration || project.stage_duration,
            industry_solution: project.industrySolution || project.industry_solution,
            forecast: project.forecast,
            description: project.description,
            revenue: project.revenue,
            expenses: project.expenses,
            status: project.status,
            created_at: project.createdAt || project.created_at
        }));
        
        localStorage.setItem('projects', JSON.stringify(migratedProjects));
        console.log('Данные мигрированы в новый формат');
    }
}

// Автоматически создаем демо-данные при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Сначала мигрируем старые данные
    migrateOldData();
    
    // Ждем секунду чтобы все загрузилось
    setTimeout(() => {
        const currentProjects = JSON.parse(localStorage.getItem('projects') || '[]');
        if (currentProjects.length === 0) {
            initDemoData();
        } else {
            console.log('Проекты уже существуют:', currentProjects.length);
        }
    }, 1000);
});