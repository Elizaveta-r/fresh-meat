import './Sidebar.css';

// Пункты меню вынесены в массивы. Удобно: чтобы добавить новый пункт,
// не нужно копировать вёрстку — достаточно дописать строчку сюда.
const NAV_ITEMS = [
    { id: 'catalog', icon: '🥩', label: 'Каталог' },
    { id: 'promo', icon: '🔥', label: 'Акции' },
    { id: 'payment', icon: '💳', label: 'Оплата' },
    { id: 'about', icon: '🏪', label: 'О нас' },
    { id: 'contacts', icon: '📞', label: 'Контакты' },
];

const CATEGORIES = [
    { id: 'beef', icon: '🐄', label: 'Говядина' },
    { id: 'pork', icon: '🐖', label: 'Свинина' },
    { id: 'chicken', icon: '🐔', label: 'Птица' },
    { id: 'sausage', icon: '🌭', label: 'Колбасы' },
];

export const Sidebar = ({ currentPage, onNavigate, onCategorySelect }) => {
    return (
        <aside className="sidebar">

            {/* Основная навигация.
                .map() превращает каждый объект из массива в кнопку <button>.
                key={item.id} обязателен — по нему React отличает элементы списка. */}
            <nav className="sidebar__nav">
                <p className="sidebar__section-title">Навигация</p>
                {NAV_ITEMS.map(item => (
                    <button
                        key={item.id}
                        className={`sidebar__link ${currentPage === item.id ? 'sidebar__link--active' : ''}`}
                        onClick={() => onNavigate(item.id)}
                    >
                        <span className="sidebar__link-icon">{item.icon}</span>
                        <span className="sidebar__link-label">{item.label}</span>
                        {item.id === 'promo' && (
                            <span className="sidebar__badge">4</span>
                        )}
                    </button>
                ))}
            </nav>

            {/* Категории (шорткат к каталогу) */}
            <nav className="sidebar__nav">
                <p className="sidebar__section-title">Категории</p>
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        className="sidebar__link sidebar__link--cat"
                        onClick={() => {
                            onCategorySelect(cat.id);
                            onNavigate('catalog');
                        }}
                    >
                        <span className="sidebar__link-icon">{cat.icon}</span>
                        <span className="sidebar__link-label">{cat.label}</span>
                    </button>
                ))}
            </nav>

            {/* Промо-плашка */}
            <div className="sidebar__promo">
                <p className="sidebar__promo-title">Промокод дня</p>
                <code className="sidebar__promo-code">FRESH10</code>
                <p className="sidebar__promo-desc">Скидка 10% на любой заказ</p>
            </div>

        </aside>
    );
};