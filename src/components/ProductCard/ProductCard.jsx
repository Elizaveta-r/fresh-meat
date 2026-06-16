import { useState } from 'react';
import { calcPrice, formatWeight, formatPrice } from '../../utils/price';
import './ProductCard.css';

// Карточка одного товара.
// product — данные товара (приходят через props), onAddToCart — функция из App,
// которую мы вызовем, когда нажмут "В корзину".
export const ProductCard = ({ product, onAddToCart }) => {
  // У каждой карточки своё локальное состояние — сколько граммов выбрано.
  // Оно живёт только внутри этой карточки и не мешает другим.
  // Начальное значение — минимально возможный вес товара.
  const [grams, setGrams] = useState(product.minGrams);

  // Цена пересчитывается автоматически при каждой перерисовке.
  // Не нужно хранить её в state — это "производное" значение от grams.
  const price = calcPrice(product.pricePerKg, grams);

  // Уменьшить вес, но не ниже минимума. g => ... берёт предыдущее значение.
  const decrease = () => setGrams(g => Math.max(g - product.stepGrams, product.minGrams));
  // Увеличить вес на шаг
  const increase = () => setGrams(g => g + product.stepGrams);

  return (
    // Шаблонная строка `...${...}`: если товара нет в наличии — добавляем
    // CSS-класс product-card--out (он делает карточку "серой").
    <div className={`product-card ${!product.inStock ? 'product-card--out' : ''}`}>
      {/* Бейдж акции. && значит: "если слева правда — показать то, что справа". */}
      {product.promoBadge && (
        <span className="product-card__badge">{product.promoBadge}</span>
      )}
      {!product.inStock && (
        <span className="product-card__badge product-card__badge--out">Нет в наличии</span>
      )}

      <img
        className="product-card__img"
        src={product.image}
        alt={product.name}
        loading="lazy"
      />

      <div className="product-card__body">
        <p className="product-card__category">{product.categoryLabel}</p>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>
        <p className="product-card__per-kg">{formatPrice(product.pricePerKg)} / кг</p>

        {/* Выбор количества граммов */}
        <div className="product-card__qty">
          <button className="product-card__qty-btn" onClick={decrease}>−</button>
          <span className="product-card__qty-val">{formatWeight(grams)}</span>
          <button className="product-card__qty-btn" onClick={increase}>+</button>
        </div>

        {/* Итоговая цена + кнопка добавления */}
        <div className="product-card__footer">
          <span className="product-card__price">{formatPrice(price)}</span>
          <button
            className="product-card__add"
            disabled={!product.inStock}
            onClick={() => onAddToCart(product, grams)}
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};
