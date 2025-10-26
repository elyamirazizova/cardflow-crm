class CardModal extends HTMLElement {
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
                .modal-footer {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    margin-top: 2rem;
                    padding-top: 1rem;
                    border-top: 1px solid #e5e7eb;
                }
            </style>
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title">Добавить новую карточку</h2>
                        <button class="close-btn" id="closeModalBtn">
                            <i data-feather="x"></i>
                        </button>
                    </div>
                    <form id="cardForm">
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="cardName">Название карточки</label>
                                <input type="text" id="cardName" required>
                            </div>
                            <div class="form-group">
                                <label for="manager">Менеджер</label>
                                <select id="manager" required>
                                    <option value="">Выберите менеджера</option>
                                    <option value="1">Иванов И.</option>
                                    <option value="2">Петров П.</option>
                                    <option value="3">Сидоров С.</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="client">Клиент</label>
                                <input type="text" id="client" required>
                            </div>
                            <div class="form-group">
                                <label for="status">Статус</label>
                                <select id="status" required>
                                    <option value="">Выберите статус</option>
                                    <option value="new">Новый</option>
                                    <option value="in_progress">В работе</option>
                                    <option value="completed">Завершён</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="startDate">Дата начала</label>
                                <input type="date" id="startDate" required>
                            </div>
                            <div class="form-group">
                                <label for="endDate">Дата окончания</label>
                                <input type="date" id="endDate">
                            </div>
                            <div class="form-group col-span-2">
                                <label for="description">Описание</label>
                                <textarea id="description" rows="3"></textarea>
                            </div>
                            <div class="form-group col-span-2">
                                <label>Финансовые показатели</label>
                                <div class="grid grid-cols-2 gap-4 mt-2">
                                    <div>
                                        <label for="revenue">Выручка</label>
                                        <input type="number" id="revenue">
                                    </div>
                                    <div>
                                        <label for="expenses">Затраты</label>
                                        <input type="number" id="expenses">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-span-2">
                                <label>Этапы проекта</label>
                                <div class="space-y-2 mt-2">
                                    <div class="flex items-center gap-2">
                                        <input type="checkbox" id="stage1">
                                        <label for="stage1">Этап 1</label>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <input type="checkbox" id="stage2">
                                        <label for="stage2">Этап 2</label>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <input type="checkbox" id="stage3">
                                        <label for="stage3">Этап 3</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" id="cancelBtn">Отмена</button>
                            <button type="submit" class="btn btn-primary">Сохранить</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        this.shadowRoot.getElementById('closeModalBtn').addEventListener('click', () => {
            this.style.display = 'none';
        });

        this.shadowRoot.getElementById('cancelBtn').addEventListener('click', () => {
            this.style.display = 'none';
        });

        this.shadowRoot.getElementById('cardForm').addEventListener('submit', (e) => {
            e.preventDefault();
            // Handle form submission
            this.style.display = 'none';
        });

        // Initialize feather icons
        feather.replace();
    }
}
customElements.define('card-modal', CardModal);