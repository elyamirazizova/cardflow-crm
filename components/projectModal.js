// components/projectModal.js
class ProjectModal extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0,0,0,0.7);
                    display: none;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .modal-content {
                    background-color: white;
                    padding: 2rem;
                    border-radius: 0.5rem;
                    width: 100%;
                    max-width: 800px;
                    max-height: 90vh;
                    overflow-y: auto;
                }
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #e5e7eb;
                }
                .modal-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #7400bc;
                }
                .close-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #6b7280;
                }
                .form-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                }
                .form-group {
                    margin-bottom: 1rem;
                }
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                }
                input, select, textarea {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #d1d5db;
                    border-radius: 0.375rem;
                    box-sizing: border-box;
                }
                .btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 0.375rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                .btn-primary {
                    background-color: #7400bc;
                    color: white;
                }
                .btn-primary:hover {
                    background-color: #5b0099;
                }
                .btn-secondary {
                    background-color: #e5e7eb;
                    color: #4b5563;
                }
                .btn-secondary:hover {
                    background-color: #d1d5db;
                }
                .btn-demo {
                    background-color: #ff4800;
                    color: white;
                    margin-left: 10px;
                }
                .btn-demo:hover {
                    background-color: #e03e00;
                }
                .modal-footer {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    margin-top: 2rem;
                    padding-top: 1rem;
                    border-top: 1px solid #e5e7eb;
                }
                .col-span-2 {
                    grid-column: span 2;
                }
                .checkbox-group {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .checkbox-group input {
                    width: auto;
                }
                .form-actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            </style>
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title">Добавить новый проект</h2>
                        <button class="close-btn" id="closeModalBtn">
                            <i data-feather="x"></i>
                        </button>
                    </div>
                    
                    <div class="form-actions">
                        <div></div>
                        <button class="btn btn-demo" id="fillDemoData">
                            <i data-feather="zap"></i>
                            Заполнить демо-данные
                        </button>
                    </div>

                    <form id="projectForm">
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="projectName">Название проекта *</label>
                                <input type="text" id="projectName" required>
                            </div>
                            <div class="form-group">
                                <label for="organization">Организация *</label>
                                <input type="text" id="organization" required>
                            </div>
                            <div class="form-group">
                                <label for="inn">ИНН организации *</label>
                                <input type="text" id="inn" required>
                            </div>
                            <div class="form-group">
                                <label for="service">Услуга *</label>
                                <select id="service" required>
                                    <option value="">Выберите услугу</option>
                                    <option value="cloud">Облачные решения</option>
                                    <option value="network">Сетевые решения</option>
                                    <option value="security">Безопасность</option>
                                    <option value="consulting">Консалтинг</option>
                                    <option value="support">Техническая поддержка</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="paymentType">Тип платежа *</label>
                                <select id="paymentType" required>
                                    <option value="">Выберите тип</option>
                                    <option value="prepayment">Предоплата</option>
                                    <option value="postpayment">Постоплата</option>
                                    <option value="installment">Рассрочка</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="stage">Этап проекта *</label>
                                <select id="stage" required>
                                    <option value="">Выберите этап</option>
                                    <option value="new">Новый</option>
                                    <option value="analysis">Анализ</option>
                                    <option value="negotiation">Переговоры</option>
                                    <option value="contract">Договор</option>
                                    <option value="implementation">Реализация</option>
                                    <option value="completion">Завершение</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="manager">Менеджер *</label>
                                <select id="manager" required>
                                    <option value="">Выберите менеджера</option>
                                    <option value="1">Иванов И.</option>
                                    <option value="2">Петров П.</option>
                                    <option value="3">Сидоров С.</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="businessSegment">Сегмент бизнеса *</label>
                                <select id="businessSegment" required>
                                    <option value="">Выберите сегмент</option>
                                    <option value="sme">Малый и средний бизнес</option>
                                    <option value="corporate">Корпоративный сегмент</option>
                                    <option value="government">Госсектор</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="year">Год реализации *</label>
                                <input type="number" id="year" min="2020" max="2030" required value="2024">
                            </div>
                            <div class="form-group">
                                <label for="probability">Вероятность (%)</label>
                                <input type="number" id="probability" min="0" max="100" value="75">
                            </div>
                            <div class="form-group">
                                <label for="stageDuration">Срок на этапе (дни)</label>
                                <input type="number" id="stageDuration" min="0" value="15">
                            </div>
                            <div class="form-group">
                                <div class="checkbox-group">
                                    <input type="checkbox" id="industrySolution">
                                    <label for="industrySolution">Отраслевое решение</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="checkbox-group">
                                    <input type="checkbox" id="forecast">
                                    <label for="forecast">Принимаемый к прогнозу</label>
                                </div>
                            </div>
                            <div class="form-group col-span-2">
                                <label for="description">Текущий статус по проекту</label>
                                <textarea id="description" rows="3" placeholder="Опишите текущее состояние проекта..."></textarea>
                            </div>
                            <div class="form-group col-span-2">
                                <label for="revenue">Выручка (₽)</label>
                                <input type="number" id="revenue" min="0" value="1500000">
                            </div>
                            <div class="form-group col-span-2">
                                <label for="expenses">Затраты (₽)</label>
                                <input type="number" id="expenses" min="0" value="850000">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" id="cancelBtn">Отмена</button>
                            <button type="submit" class="btn btn-primary">Сохранить проект</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        this.setupEventListeners();
        feather.replace();
    }

    setupEventListeners() {
        this.shadowRoot.getElementById('closeModalBtn').addEventListener('click', () => {
            this.style.display = 'none';
        });

        this.shadowRoot.getElementById('cancelBtn').addEventListener('click', () => {
            this.style.display = 'none';
        });

        this.shadowRoot.getElementById('projectForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        this.shadowRoot.getElementById('fillDemoData').addEventListener('click', () => {
            this.fillDemoData();
        });
    }

    fillDemoData() {
        const demoProjects = [
            {
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
                expenses: "2800000"
            },
            {
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
                expenses: "450000"
            },
            {
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
                expenses: "1500000"
            },
            {
                projectName: "Обновление сетевой инфраструктуры офиса",
                organization: "ООО «Деловые решения»", 
                inn: "7756789012",
                service: "network",
                paymentType: "prepayment",
                stage: "analysis",
                manager: "1",
                businessSegment: "sme",
                year: "2024",
                probability: "25",
                stageDuration: "8",
                industrySolution: false,
                forecast: false,
                description: "Проводим аудит текущей инфраструктуры. Составляем техническое задание.",
                revenue: "850000",
                expenses: "350000"
            },
            {
                projectName: "Техподдержка ERP-системы",
                organization: "ПАО «Машиностроительный завод»",
                inn: "7767890123",
                service: "support",
                paymentType: "postpayment", 
                stage: "completion",
                manager: "2",
                businessSegment: "corporate",
                year: "2024",
                probability: "95",
                stageDuration: "120",
                industrySolution: true,
                forecast: true,
                description: "Проект успешно завершен. Все системы работают стабильно. Готовим отчет о проделанной работе.",
                revenue: "3200000",
                expenses: "1800000"
            }
        ];

        const randomProject = demoProjects[Math.floor(Math.random() * demoProjects.length)];
        
        // Заполняем форму
        this.shadowRoot.getElementById('projectName').value = randomProject.projectName;
        this.shadowRoot.getElementById('organization').value = randomProject.organization;
        this.shadowRoot.getElementById('inn').value = randomProject.inn;
        this.shadowRoot.getElementById('service').value = randomProject.service;
        this.shadowRoot.getElementById('paymentType').value = randomProject.paymentType;
        this.shadowRoot.getElementById('stage').value = randomProject.stage;
        this.shadowRoot.getElementById('manager').value = randomProject.manager;
        this.shadowRoot.getElementById('businessSegment').value = randomProject.businessSegment;
        this.shadowRoot.getElementById('year').value = randomProject.year;
        this.shadowRoot.getElementById('probability').value = randomProject.probability;
        this.shadowRoot.getElementById('stageDuration').value = randomProject.stageDuration;
        this.shadowRoot.getElementById('industrySolution').checked = randomProject.industrySolution;
        this.shadowRoot.getElementById('forecast').checked = randomProject.forecast;
        this.shadowRoot.getElementById('description').value = randomProject.description;
        this.shadowRoot.getElementById('revenue').value = randomProject.revenue;
        this.shadowRoot.getElementById('expenses').value = randomProject.expenses;

        // Показываем уведомление
        alert('Демо-данные заполнены! Проверьте форму и нажмите "Сохранить проект"');
    }

    async handleFormSubmit() {
        const formData = {
            project_name: this.shadowRoot.getElementById('projectName').value,
            organization: this.shadowRoot.getElementById('organization').value,
            inn: this.shadowRoot.getElementById('inn').value,
            service: this.shadowRoot.getElementById('service').value,
            payment_type: this.shadowRoot.getElementById('paymentType').value,
            stage: this.shadowRoot.getElementById('stage').value,
            manager: this.getManagerName(this.shadowRoot.getElementById('manager').value),
            business_segment: this.shadowRoot.getElementById('businessSegment').value,
            year: this.shadowRoot.getElementById('year').value,
            probability: this.shadowRoot.getElementById('probability').value,
            stage_duration: this.shadowRoot.getElementById('stageDuration').value,
            industry_solution: this.shadowRoot.getElementById('industrySolution').checked,
            forecast: this.shadowRoot.getElementById('forecast').checked,
            description: this.shadowRoot.getElementById('description').value,
            revenue: this.shadowRoot.getElementById('revenue').value || '0',
            expenses: this.shadowRoot.getElementById('expenses').value || '0',
            status: 'new'
        };

        try {
            const project = await api.createProject(formData);
            alert('Проект успешно создан!');
            this.style.display = 'none';
            this.shadowRoot.getElementById('projectForm').reset();
            // Reload the page to show the new project
            window.location.reload();
        } catch (error) {
            alert('Ошибка при создании проекта: ' + error.message);
            // Fallback to localStorage
            this.saveProjectToLocalStorage({
                ...formData,
                id: Date.now(),
                projectName: formData.project_name,
                paymentType: formData.payment_type,
                businessSegment: formData.business_segment,
                stageDuration: formData.stage_duration,
                industrySolution: formData.industry_solution,
                createdAt: new Date().toISOString(),
                createdBy: JSON.parse(localStorage.getItem('user')).id
            });
        }
    }

    saveProjectToLocalStorage(project) {
        let projects = JSON.parse(localStorage.getItem('projects') || '[]');
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    createProjectCard(data) {
        const projectCard = document.createElement('project-card');
        
        projectCard.setAttribute('project-name', data.projectName);
        projectCard.setAttribute('organization', data.organization);
        projectCard.setAttribute('inn', data.inn);
        projectCard.setAttribute('manager', this.getManagerName(data.manager));
        projectCard.setAttribute('service', this.getServiceName(data.service));
        projectCard.setAttribute('payment-type', data.paymentType);
        projectCard.setAttribute('business-segment', data.businessSegment);
        projectCard.setAttribute('year', data.year);
        projectCard.setAttribute('stage', data.stage);
        projectCard.setAttribute('status', this.getStatusFromStage(data.stage));
        projectCard.setAttribute('revenue', data.revenue);
        projectCard.setAttribute('expenses', data.expenses);
        projectCard.setAttribute('description', data.description);
        projectCard.setAttribute('industry-solution', data.industrySolution.toString());
        projectCard.setAttribute('forecast', data.forecast.toString());
        projectCard.setAttribute('probability', data.probability || '0');
        projectCard.setAttribute('stage-duration', data.stageDuration ? `${data.stageDuration} дней` : 'Не указан');
        projectCard.setAttribute('last-update', `Создано: ${new Date().toLocaleString('ru-RU')}`);

        const projectsContainer = document.querySelector('.grid') || document.querySelector('.dashboard-grid') || document.body;
        projectsContainer.appendChild(projectCard);
    }

    getManagerName(managerId) {
        const managers = {
            '1': 'Иванов И.',
            '2': 'Петров П.', 
            '3': 'Сидоров С.'
        };
        return managers[managerId] || 'Не назначен';
    }

    getServiceName(serviceId) {
        const services = {
            'cloud': 'Облачные решения',
            'network': 'Сетевые решения',
            'security': 'Безопасность',
            'consulting': 'Консалтинг',
            'support': 'Техническая поддержка'
        };
        return services[serviceId] || serviceId;
    }

    getStatusFromStage(stage) {
        const statusMap = {
            'new': 'new',
            'analysis': 'in_progress', 
            'negotiation': 'in_progress',
            'contract': 'in_progress',
            'implementation': 'active',
            'completion': 'completed'
        };
        return statusMap[stage] || 'new';
    }
}

customElements.define('project-modal', ProjectModal);