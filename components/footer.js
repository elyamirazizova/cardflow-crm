class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background-color: var(--white);
                    padding: 1.5rem;
                    text-align: center;
                    border-top: 1px solid rgba(0,0,0,0.1);
                    margin-top: auto;
                }
                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 2rem;
                    text-align: left;
                    padding: 0 1rem;
                }

                .footer-links {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    margin-bottom: 1.5rem;
                }
                .footer-links a {
                    color: var(--dark-gray);
                    text-decoration: none;
                    transition: color 0.2s;
                    font-size: 0.875rem;
                }
.footer-links a:hover {
                    color: #7400bc;
                }
                .copyright {
                    color: var(--dark-gray);
                    font-size: 0.875rem;
                    margin-top: 1.5rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid rgba(0,0,0,0.1);
                }

                .footer-heading {
                    font-size: 1rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    color: var(--black);
                }
</style>
            <footer>
                <div class="footer-links">
                    <a href="#">Помощь</a>
                    <a href="#">Конфиденциальность</a>
                    <a href="#">Условия</a>
                </div>
                <div class="copyright">
                    &copy; 2024 CardFlow. Все права защищены.
                </div>
            </footer>
        `;
    }
}
customElements.define('custom-footer', CustomFooter);