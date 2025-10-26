// components/authModal.js
class AuthModal extends HTMLElement {
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
                    background-color: rgba(0,0,0,0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1050;
                    backdrop-filter: blur(4px);
                }
                .modal-content {
                    background-color: white;
                    padding: 2rem;
                    border-radius: 0.5rem;
                    width: 90%;
                    max-width: 400px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                }
                .modal-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #7400bc;
                    margin-bottom: 0.5rem;
                    text-align: center;
                }
                .form-group {
                    margin-bottom: 1rem;
                }
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                }
                input {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #d1d5db;
                    border-radius: 0.375rem;
                    box-sizing: border-box;
                }
                .btn {
                    display: block;
                    width: 100%;
                    padding: 0.75rem;
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
                .logo {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 1rem;
                }
                .demo-accounts {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: #f3f4f6;
                    border-radius: 0.375rem;
                    font-size: 0.875rem;
                }
                .demo-account {
                    cursor: pointer;
                    padding: 0.5rem;
                    margin: 0.25rem 0;
                    border-radius: 0.25rem;
                    transition: background 0.2s;
                }
                .demo-account:hover {
                    background: #e5e7eb;
                }
            </style>
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="logo">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" fill="#7400bc"/>
                            <path d="M4 7L12 12L20 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 12V22" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="modal-header">
                        <div class="modal-title">Вход в CardFlow</div>
                    </div>
                    <form id="loginForm">
                        <div class="form-group">
                            <label for="username">Email</label>
                            <input type="email" id="username" required value="admin@rostelecom.ru">
                        </div>
                        <div class="form-group">
                            <label for="password">Пароль</label>
                            <input type="password" id="password" required value="Admin123!">
                        </div>
                        <button type="submit" class="btn btn-primary">Войти</button>
                    </form>

                    <div class="demo-accounts">
                        <strong>Аккаунты РОСТЕЛЕКОМ:</strong>
                        <div class="demo-account" onclick="this.useDemoAccount('admin@rostelecom.ru', 'Admin123!')">
                            👑 Администратор: admin@rostelecom.ru
                        </div>
                        <div class="demo-account" onclick="this.useDemoAccount('analyst@rostelecom.ru', 'Analyst123!')">
                            📊 Аналитик: analyst@rostelecom.ru
                        </div>
                        <div class="demo-account" onclick="this.useDemoAccount('user@rostelecom.ru', 'User123!')">
                            👤 Пользователь: user@rostelecom.ru
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        const loginForm = this.shadowRoot.getElementById('loginForm');
        loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }

    useDemoAccount(email, password) {
        this.shadowRoot.getElementById('username').value = email;
        this.shadowRoot.getElementById('password').value = password;
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const email = this.shadowRoot.getElementById('username').value;
        const password = this.shadowRoot.getElementById('password').value;

        try {
            // Login via API
            const data = await api.login(email, password);
            
            // Скрываем модалку
            this.style.display = 'none';
            
            // Обновляем интерфейс
            this.updateUIAfterLogin(data.user);
            
            // Перенаправляем на проекты
            window.location.href = 'projects.html';
        } catch (error) {
            alert('Неверный email или пароль! Попробуйте демо аккаунты.');
        }
    }

    updateUIAfterLogin(user) {
        const navbar = document.querySelector('custom-navbar');
        if (navbar) {
            navbar.setUser(user);
        }
    }
}

customElements.define('auth-modal', AuthModal);