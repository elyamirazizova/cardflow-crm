class ProfileComponent extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          .profile-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }
          .profile-header {
            margin-bottom: 2rem;
          }
          .profile-grid {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 2rem;
          }
          .profile-card {
            background: white;
            border-radius: 0.5rem;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: #f3f4f6;
            margin: 0 auto 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .profile-name {
            font-size: 1.25rem;
            font-weight: 600;
            text-align: center;
            margin-bottom: 0.5rem;
          }
          .profile-title {
            color: #6b7280;
            text-align: center;
            font-size: 0.875rem;
            margin-bottom: 1.5rem;
          }
          .profile-detail {
            margin-bottom: 1rem;
          }
          .detail-label {
            font-size: 0.75rem;
            color: #6b7280;
            margin-bottom: 0.25rem;
          }
          .detail-value {
            font-size: 0.875rem;
          }
          .edit-btn {
            width: 100%;
            background: #7400bc;
            color: white;
            border: none;
            padding: 0.5rem;
            border-radius: 0.25rem;
            cursor: pointer;
            margin-top: 1rem;
          }
          .stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin-top: 2rem;
          }
          .stat-card {
            background: white;
            border-radius: 0.5rem;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .stat-value {
            font-size: 1.5rem;
            font-weight: 600;
            color: #7400bc;
          }
          .stat-label {
            font-size: 0.875rem;
            color: #6b7280;
          }
        </style>
        <div class="profile-container">
          <div class="profile-header">
            <h1 class="text-2xl font-bold">Мой профиль</h1>
          </div>
          <div class="profile-grid">
            <div class="profile-card">
              <div class="avatar">
                <i data-feather="user"></i>
              </div>
              <h2 class="profile-name">Иван Иванов</h2>
              <p class="profile-title">Менеджер проектов</p>
              
              <div class="profile-detail">
                <div class="detail-label">Email</div>
                <div class="detail-value">ivanov@example.com</div>
              </div>
              
              <div class="profile-detail">
                <div class="detail-label">Телефон</div>
                <div class="detail-value">+7 (123) 456-78-90</div>
              </div>
              
              <div class="profile-detail">
                <div class="detail-label">Дата регистрации</div>
                <div class="detail-value">15.01.2024</div>
              </div>
              
              <button class="edit-btn">Редактировать профиль</button>
            </div>
            
            <div>
              <div class="profile-card">
                <h2 class="text-xl font-semibold mb-4">Статистика</h2>
                <div class="stats">
                  <div class="stat-card">
                    <div class="stat-value">24</div>
                    <div class="stat-label">Проектов</div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-value">18</div>
                    <div class="stat-label">Активных</div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-value">6</div>
                    <div class="stat-label">Завершено</div>
                  </div>
                </div>
              </div>
              
              <div class="profile-card mt-4">
                <h2 class="text-xl font-semibold mb-4">Последние проекты</h2>
                <div class="last-projects">
                  <!-- Projects list will be populated here -->
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Initialize feather icons
      feather.replace();
      
      // Load projects data
      this.loadProjects();
    }
    
    loadProjects() {
      // In a real app, this would fetch from an API
      const projects = [
        { name: "Проект Альфа", status: "active", date: "15.02.2024" },
        { name: "Проект Бета", status: "active", date: "10.02.2024" },
        { name: "Проект Гамма", status: "completed", date: "05.02.2024" }
      ];
      
      const container = this.shadowRoot.querySelector('.last-projects');
      container.innerHTML = projects.map(project => `
        <div class="project-item mb-3 p-3 border-b border-gray-100 last:border-0">
          <div class="flex justify-between items-center">
            <div>
              <div class="font-medium">${project.name}</div>
              <div class="text-sm text-gray-500">${project.date}</div>
            </div>
            <span class="px-2 py-1 text-xs rounded-full ${
              project.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-purple-100 text-purple-800'
            }">
              ${project.status === 'active' ? 'Активен' : 'Завершен'}
            </span>
          </div>
        </div>
      `).join('');
    }
  }
  
  customElements.define('profile-component', ProfileComponent);