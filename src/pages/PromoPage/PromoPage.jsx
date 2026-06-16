// PromoPage.jsx
import { promoBlocks } from '../../utils/promoBlocksData';
import {products} from '../../utils/productsData';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import '../InfoPage.css';

export const PromoPage = ({ onAddToCart }) => {
  const promoProducts = products.filter(p => p.isPromo);

  return (
    <div className="info-page">
      <h1 className="info-page__title">Акции и спецпредложения</h1>

      {/* Промо-блоки по категориям */}
      <div className="promo-list">
        {promoBlocks.map(block => (
          <div key={block.id} className="promo-card">
            <img className="promo-card__img" src={block.image} alt={block.title} />
            <div className="promo-card__body">
              <span className="promo-card__badge" style={{ background: block.badgeColor }}>
                {block.badge}
              </span>
              <h3 className="promo-card__title">{block.title}</h3>
              <p className="promo-card__desc">{block.description}</p>
              <p className="promo-card__offer">🎁 {block.offer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Акционные товары */}
      <h2 style={{ marginBottom: 16, marginTop: 8 }}>Товары со скидкой</h2>
      <div className="promo-products">
        {promoProducts.map(p => (
          <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};