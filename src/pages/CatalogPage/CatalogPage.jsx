import { products } from '../../utils/productsData';
import { promoBlocks } from '../../utils/promoBlocksData';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import './CatalogPage.css';


const CATEGORIES = [
    { id: 'all', label: 'Все' },
    { id: 'beef', label: '🐄 Говядина' },
    { id: 'pork', label: '🐖 Свинина' },
    { id: 'chicken', label: '🐔 Птица' },
    { id: 'sausage', label: '🌭 Колбасы' },
];

export const CatalogPage = ({ search, onAddToCart, activeCategory, setActiveCategory }) => {

    // Фильтрация товаров.
    // .filter() оставляет только те товары, для которых функция вернёт true.
    const filtered = products.filter(p => {
        // Подходит по категории? ('all' = показываем всё)
        const matchCat = activeCategory === 'all' || p.category === activeCategory;
        // Подходит по поиску? Сравниваем в нижнем регистре, чтобы регистр букв не мешал.
        const text = search.toLowerCase();
        const matchSearch =
            p.name.toLowerCase().includes(text) ||
            p.description.toLowerCase().includes(text);
        // Товар попадёт в список, только если подходит И по категории, И по поиску.
        return matchCat && matchSearch;
    });

    // Промо-блок для текущей категории
    const promoBlock = activeCategory !== 'all'
        ? promoBlocks.find(b => b.category === activeCategory)
        : null;

    return (
        <div className="catalog-page">
            <h1 className="catalog-page__title">Каталог</h1>

            {/* Фильтры по категориям */}
            <div className="catalog-page__filters">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        className={`catalog-page__filter ${activeCategory === cat.id ? 'catalog-page__filter--active' : ''}`}
                        onClick={() => setActiveCategory(cat.id)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Промо-блок категории */}
            {promoBlock && (
                <div className="promo-block" style={{ backgroundImage: `url(${promoBlock.image})` }}>
                    <div className="promo-block__overlay" />
                    <div className="promo-block__content">
                        <span className="promo-block__badge">{promoBlock.badge}</span>
                        <h2 className="promo-block__title">{promoBlock.title}</h2>
                        <p className="promo-block__subtitle">{promoBlock.subtitle}</p>
                        <p className="promo-block__offer">🎁 {promoBlock.offer}</p>
                    </div>
                </div>
            )}

            {/* Сетка товаров */}
            {filtered.length === 0 ? (
                <p className="catalog-page__empty">Ничего не найдено</p>
            ) : (
                <div className="catalog-page__grid">
                    {filtered.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={onAddToCart}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};