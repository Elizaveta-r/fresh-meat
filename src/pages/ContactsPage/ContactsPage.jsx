// ContactsPage.jsx
import './InfoPages.css';

export const ContactsPage = () => (
    <div className="info-page">
        <h1 className="info-page__title">Контакты</h1>

        <div className="contacts-grid">
            <div className="contact-card">
                <span className="contact-card__icon">📞</span>
                <p className="contact-card__label">Телефон</p>
                <a className="contact-card__value" href="tel:+78001234567">8 (800) 123-45-67</a>
                <p className="contact-card__note">Бесплатно, ежедневно 8:00–22:00</p>
            </div>
            <div className="contact-card">
                <span className="contact-card__icon">✉️</span>
                <p className="contact-card__label">Email</p>
                <a className="contact-card__value" href="mailto:info@freshmeat.ru">info@freshmeat.ru</a>
                <p className="contact-card__note">Ответим в течение 2 часов</p>
            </div>
            <div className="contact-card">
                <span className="contact-card__icon">📍</span>
                <p className="contact-card__label">Адрес</p>
                <p className="contact-card__value">г. Москва, ул. Мясницкая, 22</p>
                <p className="contact-card__note">Пн–Вс 9:00–21:00</p>
            </div>
            <div className="contact-card">
                <span className="contact-card__icon">💬</span>
                <p className="contact-card__label">Мессенджеры</p>
                <p className="contact-card__value">WhatsApp / Telegram</p>
                <p className="contact-card__note">@freshmeat_ru</p>
            </div>
        </div>

        <div className="contacts-map">
            <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor:..."
                title="Карта"
                loading="lazy"
            />
        </div>
    </div>
);