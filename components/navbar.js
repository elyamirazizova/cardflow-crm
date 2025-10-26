// components/navbar.js
class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.checkAuthStatus();
    }

    checkAuthStatus() {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
            const user = JSON.parse(userData);
            this.render(user);
        } else {
            this.showAuthModal();
        }
    }

    showAuthModal() {
        // Показываем модалку авторизации
        const authModal = document.querySelector('auth-modal');
        if (authModal) {
            authModal.style.display = 'flex';
        } else {
            // Если модалки нет, редирект на главную
            if (window.location.pathname !== '/index.html' && !window.location.pathname.endsWith('/')) {
                window.location.href = 'index.html';
            }
        }
    }

    render(user) {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    background-color: white;
                    padding: 0.75rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }
                .logo {
                    color: #7400bc;
                    font-weight: bold;
                    font-size: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .nav-links {
                    display: flex;
                    gap: 1.5rem;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    align-items: center;
                }
                a {
                    color: #4b5563;
                    text-decoration: none;
                    font-weight: 500;
                    padding: 0.5rem 1rem;
                    border-radius: 0.375rem;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.95rem;
                    white-space: nowrap;
                }
                a:hover, a.active {
                    color: white;
                    background-color: #7400bc;
                }
                .user-menu {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: #e5e7eb;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                .user-avatar:hover {
                    background-color: #7400bc;
                    color: white;
                }
                .logout-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #6b7280;
                    padding: 0.5rem;
                    border-radius: 0.375rem;
                }
                .logout-btn:hover {
                    background-color: #f3f4f6;
                }
                .user-name {
                    font-size: 0.875rem;
                    color: #4b5563;
                }
                .admin-divider {
                    border-top: 1px solid #e5e7eb;
                    margin-top: 0.5rem;
                    padding-top: 0.5rem;
                }
                .admin-danger {
                    color: #dc2626 !important;
                }
                .admin-danger:hover {
                    background-color: #fef2f2 !important;
                    color: #dc2626 !important;
                }
            </style>
            <nav>
                <div class="logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="#7400bc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4 7L12 12L20 7" stroke="#7400bc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 12V22" stroke="#7400bc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>CardFlow</span>
                </div>
                
                <ul class="nav-links">
                    ${this.generateMenuItems(user)}
                </ul>

                <div class="user-menu">
                    <span class="user-name">${user.full_name} (${this.getRoleName(user.role)})</span>
                    <div class="user-avatar" id="userAvatar">
                        <i data-feather="user"></i>
                    </div>
                    <button class="logout-btn" id="logoutBtn" title="Выйти">
                        <i data-feather="log-out"></i>
                    </button>
                </div>
            </nav>
        `;

        this.setupEventListeners();
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    generateMenuItems(user) {
        const menuItems = [
            { href: 'projects.html', icon: 'briefcase', text: 'Проекты', roles: ['admin', 'analyst', 'user'] },
            { href: 'analytics.html', icon: 'bar-chart-2', text: 'Аналитика', roles: ['admin', 'analyst'] },
            { href: 'dashboard.html', icon: 'layout', text: 'Дашборды', roles: ['admin', 'analyst'] },
            { href: 'reports.html', icon: 'file-text', text: 'Отчёты', roles: ['admin', 'analyst', 'user'] },
        ];

        let html = '';

        // Основные пункты меню
        menuItems
            .filter(item => item.roles.includes(user.role))
            .forEach(item => {
                html += `
                    <li>
                        <a href="${item.href}" class="${this.isActive(item.href)}">
                            <i data-feather="${item.icon}"></i>
                            <span>${item.text}</span>
                        </a>
                    </li>
                `;
            });

        // Админские пункты
        if (user.role === 'admin') {
            html += `
                <li>
                    <a href="users.html" class="${this.isActive('users.html')}">
                        <i data-feather="users"></i>
                        <span>Пользователи</span>
                    </a>
                </li>
                <li class="admin-divider">
                    <a href="#" class="admin-danger" id="resetDataBtn">
                        <i data-feather="trash-2"></i>
                        <span>Сбросить все данные</span>
                    </a>
                </li>
            `;
        }

        return html;
    }

    setupEventListeners() {
        this.shadowRoot.getElementById('logoutBtn').addEventListener('click', () => this.handleLogout());
        
        const userAvatar = this.shadowRoot.getElementById('userAvatar');
        if (userAvatar) {
            userAvatar.addEventListener('click', () => {
                window.location.href = 'profile.html';
            });
        }

        // Обработчик для кнопки сброса данных (только для админа)
        const resetDataBtn = this.shadowRoot.getElementById('resetDataBtn');
        if (resetDataBtn) {
            resetDataBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.resetAllData();
            });
        }
    }

    async handleLogout() {
        try {
            await api.logout();
        } catch (error) {
            console.log('Logout error:', error);
        }
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }

    resetAllData() {
        if (confirm('ВНИМАНИЕ! Это удалит ВСЕ проекты, настройки и демо-данные. Действие нельзя отменить. Продолжить?')) {
            // Очищаем все данные
            localStorage.removeItem('projects');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // Показываем уведомление
            alert('Все данные очищены. Система будет перезагружена.');
            
            // Перезагружаем страницу
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    }

    getRoleName(role) {
        const roles = {
            'admin': 'Админ',
            'analyst': 'Аналитик', 
            'user': 'Менеджер'
        };
        return roles[role] || role;
    }

    isActive(page) {
        const currentPage = window.location.pathname.split('/').pop();
        return currentPage === page ? 'active' : '';
    }

    setUser(user) {
        this.render(user);
    }
}

// Глобальная функция для сброса данных (на случай если нужно вызвать извне)
window.resetAllData = function() {
    if (confirm('ВНИМАНИЕ! Это удалит ВСЕ проекты, настройки и демо-данные. Действие нельзя отменить. Продолжить?')) {
        localStorage.removeItem('projects');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        alert('Все данные очищены. Система будет перезагружена.');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
};

customElements.define('custom-navbar', CustomNavbar);