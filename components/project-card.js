class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .card-container {
          perspective: 1000px;
          width: 100%;
          height: 100%;
          min-height: 280px;
        }
        
        .card {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
          cursor: pointer;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .card.is-flipped {
          transform: rotateY(180deg);
        }
        
        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          padding: 16px;
          box-sizing: border-box;
          background: white;
          border-radius: 8px;
          overflow: hidden; /* Убрали скролл */
        }
        
        .card-front {
          display: flex;
          flex-direction: column;
        }
        
        .card-back {
          transform: rotateY(180deg);
        }
        
        .card-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 12px;
          color: #7400bc;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 8px;
        }
        
        .card-section {
          margin-bottom: 12px;
        }
        
        .section-title {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          font-size: 13px;
        }
        
        .info-item {
          display: flex;
          flex-direction: column;
        }
        
        .info-label {
          font-size: 11px;
          color: #6b7280;
          margin-bottom: 2px;
        }
        
        .info-value {
          font-size: 13px;
          font-weight: 500;
        }
        
        .card-status {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          margin-top: 8px;
        }
        
        .status-active {
          background-color: #dcfce7;
          color: #166534;
        }
        
        .status-in-progress {
          background-color: #fef08a;
          color: #854d0e;
        }
        
        .status-completed {
          background-color: #e0f2fe;
          color: #075985;
        }
        
        .status-new {
          background-color: #f3e8ff;
          color: #7e22ce;
        }
        
        .finance-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin: 12px 0;
        }
        
        .finance-metric {
          padding: 8px;
          background: #f8fafc;
          border-radius: 4px;
          text-align: center;
        }
        
        .metric-value {
          font-weight: bold;
          font-size: 14px;
        }
        
        .metric-label {
          font-size: 11px;
          color: #64748b;
        }
        
        .comments-section {
          margin-top: 12px;
          padding-top: 8px;
          border-top: 1px dashed #e5e7eb;
        }
        
        .comment {
          font-size: 12px;
          color: #6b7280;
          font-style: italic;
          margin-top: 4px;
        }
        
        .badge {
          display: inline-block;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 10px;
          margin-left: 4px;
        }
        
        .badge-industry {
          background-color: #dbeafe;
          color: #1e40af;
        }
        
        .badge-forecast {
          background-color: #f0fdf4;
          color: #166534;
        }
      </style>
      
      <div class="card-container">
        <div class="card">
          <div class="card-face card-front">
            <div class="card-title" id="projectName">Название проекта</div>
            
            <div class="card-section">
              <div class="section-title">
                <i data-feather="briefcase"></i>
                Общая информация
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Организация</div>
                  <div class="info-value" id="organization">-</div>
                </div>
                <div class="info-item">
                  <div class="info-label">ИНН</div>
                  <div class="info-value" id="inn">-</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Менеджер</div>
                  <div class="info-value" id="manager">-</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Услуга</div>
                  <div class="info-value" id="service">-</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Тип платежа</div>
                  <div class="info-value" id="paymentType">-</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Сегмент бизнеса</div>
                  <div class="info-value" id="businessSegment">-</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Год реализации</div>
                  <div class="info-value" id="year">-</div>
                </div>
              </div>
            </div>
            
            <div class="card-section">
              <div class="section-title">
                <i data-feather="trending-up"></i>
                Статус проекта
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Этап</div>
                  <div class="info-value" id="stage">-</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Статус</div>
                  <div class="card-status" id="status">-</div>
                </div>
              </div>
            </div>
            
            <div class="comments-section">
              <div class="section-title">
                <i data-feather="message-square"></i>
                Текущий статус
              </div>
              <div class="comment" id="description">Описание не добавлено</div>
            </div>
          </div>
          
          <div class="card-face card-back">
            <div class="card-title">Финансовые показатели и аналитика</div>
            
            <div class="finance-grid">
              <div class="finance-metric">
                <div class="metric-value" id="revenue">0 ₽</div>
                <div class="metric-label">Выручка</div>
              </div>
              <div class="finance-metric">
                <div class="metric-value" id="expenses">0 ₽</div>
                <div class="metric-label">Затраты</div>
              </div>
              <div class="finance-metric">
                <div class="metric-value" id="profit">0 ₽</div>
                <div class="metric-label">Прибыль</div>
              </div>
            </div>
            
            <div class="card-section">
              <div class="section-title">
                <i data-feather="bar-chart-2"></i>
                Дополнительные параметры
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Отраслевое решение</div>
                  <div class="info-value">
                    <span id="industrySolution">Нет</span>
                    <span class="badge badge-industry" id="industryBadge" style="display: none;">Отраслевое</span>
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-label">В прогнозе</div>
                  <div class="info-value">
                    <span id="forecast">Нет</span>
                    <span class="badge badge-forecast" id="forecastBadge" style="display: none;">Прогноз</span>
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-label">Вероятность</div>
                  <div class="info-value" id="probability">-</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Срок на этапе</div>
                  <div class="info-value" id="stageDuration">-</div>
                </div>
              </div>
            </div>
            
            <div class="comments-section">
              <div class="section-title">
                <i data-feather="clock"></i>
                История изменений
              </div>
              <div class="comment" id="lastUpdate">Нет данных об изменениях</div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.cardElement = this.shadowRoot.querySelector('.card');
  }

  connectedCallback() {
    this.cardElement.addEventListener('click', () => {
      this.cardElement.classList.toggle('is-flipped');
    });

    // Set initial data if attributes exist
    this.updateCardData();
    
    // Initialize feather icons after a short delay to ensure DOM is ready
    setTimeout(() => {
      if (typeof feather !== 'undefined') {
        feather.replace();
      }
    }, 100);
  }

  static get observedAttributes() {
    return [
      'project-name', 'organization', 'inn', 'manager', 'service', 
      'payment-type', 'business-segment', 'year', 'stage', 'status',
      'revenue', 'expenses', 'description', 'industry-solution',
      'forecast', 'probability', 'stage-duration', 'last-update'
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.updateCardData();
  }

  updateCardData() {
    // Основная информация
    const projectName = this.getAttribute('project-name') || 'Название проекта';
    const organization = this.getAttribute('organization') || 'Не указана';
    const inn = this.getAttribute('inn') || 'Не указан';
    const manager = this.getAttribute('manager') || 'Не назначен';
    const service = this.getAttribute('service') || 'Не указана';
    const paymentType = this.getAttribute('payment-type') || 'Не указан';
    const businessSegment = this.getAttribute('business-segment') || 'Не указан';
    const year = this.getAttribute('year') || 'Не указан';
    
    // Статус проекта
    const stage = this.getAttribute('stage') || 'Не указан';
    const status = this.getAttribute('status') || 'new';
    
    // Финансы
    const revenue = this.getAttribute('revenue') || '0';
    const expenses = this.getAttribute('expenses') || '0';
    
    // Дополнительные параметры
    const description = this.getAttribute('description') || 'Описание не добавлено';
    const industrySolution = this.getAttribute('industry-solution') === 'true';
    const forecast = this.getAttribute('forecast') === 'true';
    const probability = this.getAttribute('probability') || '0';
    const stageDuration = this.getAttribute('stage-duration') || 'Не указан';
    const lastUpdate = this.getAttribute('last-update') || 'Нет данных об изменениях';

    // Установка основных данных
    this.shadowRoot.getElementById('projectName').textContent = projectName;
    this.shadowRoot.getElementById('organization').textContent = organization;
    this.shadowRoot.getElementById('inn').textContent = inn;
    this.shadowRoot.getElementById('manager').textContent = manager;
    this.shadowRoot.getElementById('service').textContent = service;
    this.shadowRoot.getElementById('paymentType').textContent = this.getPaymentTypeText(paymentType);
    this.shadowRoot.getElementById('businessSegment').textContent = this.getBusinessSegmentText(businessSegment);
    this.shadowRoot.getElementById('year').textContent = year;
    this.shadowRoot.getElementById('stage').textContent = this.getStageText(stage);
    this.shadowRoot.getElementById('description').textContent = description;
    this.shadowRoot.getElementById('lastUpdate').textContent = lastUpdate;

    // Форматирование финансовых данных
    const formattedRevenue = Number(revenue).toLocaleString('ru-RU');
    const formattedExpenses = Number(expenses).toLocaleString('ru-RU');
    const profit = Number(revenue) - Number(expenses);
    const formattedProfit = profit.toLocaleString('ru-RU');

    this.shadowRoot.getElementById('revenue').textContent = `${formattedRevenue} ₽`;
    this.shadowRoot.getElementById('expenses').textContent = `${formattedExpenses} ₽`;
    this.shadowRoot.getElementById('profit').textContent = `${formattedProfit} ₽`;

    // Установка статуса
    const statusElement = this.shadowRoot.getElementById('status');
    statusElement.textContent = this.getStatusText(status);
    statusElement.className = 'card-status ' + this.getStatusClass(status);

    // Дополнительные параметры
    this.shadowRoot.getElementById('industrySolution').textContent = industrySolution ? 'Да' : 'Нет';
    this.shadowRoot.getElementById('forecast').textContent = forecast ? 'Да' : 'Нет';
    this.shadowRoot.getElementById('probability').textContent = `${probability}%`;
    this.shadowRoot.getElementById('stageDuration').textContent = stageDuration;
    
    // Показ/скрытие бейджей
    this.shadowRoot.getElementById('industryBadge').style.display = industrySolution ? 'inline-block' : 'none';
    this.shadowRoot.getElementById('forecastBadge').style.display = forecast ? 'inline-block' : 'none';
  }

  getStatusText(status) {
    switch(status) {
      case 'active': return 'Активен';
      case 'in_progress': return 'В работе';
      case 'completed': return 'Завершён';
      case 'new': return 'Новый';
      default: return 'Новый';
    }
  }

  getStatusClass(status) {
    switch(status) {
      case 'active': return 'status-active';
      case 'in_progress': return 'status-in-progress';
      case 'completed': return 'status-completed';
      case 'new': return 'status-new';
      default: return 'status-new';
    }
  }

  getStageText(stage) {
    const stages = {
      'new': 'Новый',
      'analysis': 'Анализ',
      'negotiation': 'Переговоры',
      'contract': 'Договор',
      'implementation': 'Реализация',
      'completion': 'Завершение'
    };
    return stages[stage] || stage;
  }

  getPaymentTypeText(type) {
    const types = {
      'prepayment': 'Предоплата',
      'postpayment': 'Постоплата',
      'installment': 'Рассрочка'
    };
    return types[type] || type;
  }

  getBusinessSegmentText(segment) {
    const segments = {
      'sme': 'Малый и средний бизнес',
      'corporate': 'Корпоративный сегмент',
      'government': 'Госсектор'
    };
    return segments[segment] || segment;
  }
}

customElements.define('project-card', ProjectCard);