import { useState } from 'react';
import { calcPrice, formatWeight, formatPrice } from '../../utils/price';
import './CartDrawer.css';

// Список доступных промокодов. Объект, где ключ — сам код, а значение — что он даёт.
const PROMO_CODES = {
  FRESH10: { type: 'percent',  value: 10,  label: 'Скидка 10%' },
  SAVE200: { type: 'fixed',    value: 200, label: '−200 ₽', minOrder: 1000 },
  BEEF20:  { type: 'category', value: 20,  category: 'beef', label: 'Говядина −20%' },
};

// Скидка за объём: чем больше граммов одного товара — тем больше процент.
function getVolumeDiscount(grams) {
  if (grams >= 3000) return 10;
  if (grams >= 1500) return 5;
  return 0;
}

// Боковая панель корзины. Открывается, когда open === true.
export const CartDrawer = ({ open, cart, onClose, onUpdateGrams, onRemove }) => {
  // Локальное состояние именно для корзины:
  const [promoInput, setPromoInput] = useState(''); // что напечатано в поле промокода
  const [promo, setPromo]           = useState(null); // применённый промокод (или null)
  const [promoError, setPromoError] = useState('');   // текст ошибки промокода

  // ── Считаем цену каждой строки корзины ────────────────────────────────────
  // map превращает массив товаров в массив строк с уже посчитанными ценами.
  // Здесь нет побочных эффектов — просто из одного массива делаем другой.
  const rows = cart.map(({ product, grams }) => {
    const base = calcPrice(product.pricePerKg, grams); // цена без скидки

    // Берём САМУЮ ВЫГОДНУЮ из двух скидок: за объём или по промокоду на категорию.
    const volumeDiscount = getVolumeDiscount(grams);
    const categoryDiscount =
      promo?.type === 'category' && promo.category === product.category ? promo.value : 0;
    const discPct = Math.max(volumeDiscount, categoryDiscount);

    const disc = Math.round(base * discPct / 100); // сумма скидки в рублях
    return { product, grams, base, discPct, disc, rowTotal: base - disc };
  });

  // ── Суммируем по всей корзине ──────────────────────────────────────────────
  // reduce пробегает по массиву и накапливает одно итоговое число.
  // (sum, r) => sum + r.base  — "к накопленному прибавь поле base текущей строки".
  // Последний 0 — это стартовое значение суммы.
  const subtotal      = rows.reduce((sum, r) => sum + r.base, 0); // всё без скидок
  const discountTotal = rows.reduce((sum, r) => sum + r.disc, 0); // скидки за объём/категорию
  const afterVolume   = subtotal - discountTotal;                 // цена после этих скидок

  // Скидка по промокоду на ВЕСЬ заказ (проценты или фиксированная сумма).
  let promoDiscount = 0;
  if (promo?.type === 'percent') promoDiscount = Math.round(afterVolume * promo.value / 100);
  if (promo?.type === 'fixed')   promoDiscount = promo.value;

  // Math.max(..., 0) — чтобы итог не ушёл в минус.
  const total = Math.max(afterVolume - promoDiscount, 0);

  // ── Применение промокода (по кнопке или Enter) ─────────────────────────────
  const handlePromo = () => {
    // Приводим ввод к верхнему регистру и ищем в списке кодов.
    const found = PROMO_CODES[promoInput.trim().toUpperCase()];

    if (!found) {
      setPromo(null);
      setPromoError('Промокод не найден');
      return;
    }
    // У некоторых кодов есть минимальная сумма заказа.
    if (found.minOrder && afterVolume < found.minOrder) {
      setPromo(null);
      setPromoError(`Действует от ${formatPrice(found.minOrder)}`);
      return;
    }
    setPromo(found);
    setPromoError('');
  };

  return (
    // <>...</> — это "фрагмент": позволяет вернуть несколько элементов без лишнего div.
    <>
      {/* Затемнение фона. Клик по нему закрывает корзину. */}
      {open && <div className="overlay" onClick={onClose} />}

      {/* Сама панель. CSS-класс --open добавляется только когда open === true (это её выдвигает). */}
      <div className={`cart-drawer ${open ? 'cart-drawer--open' : ''}`}>

        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">Корзина</h2>
          <button className="cart-drawer__close" onClick={onClose}>✕</button>
        </div>

        <div className="cart-drawer__body">
          {/* Если корзина пуста — одно, иначе — другое. Это тернарный оператор: условие ? а : б */}
          {cart.length === 0 ? (
            <div className="cart-drawer__empty">
              <span style={{ fontSize: 48 }}>🛒</span>
              <p>Корзина пуста</p>
              <p style={{ fontSize: 13, color: '#aaa' }}>Добавьте товары из каталога</p>
            </div>
          ) : (
            <>
              {/* Рисуем каждую строку корзины. key нужен React, чтобы отличать элементы списка. */}
              {rows.map(({ product, grams, base, discPct, disc, rowTotal }) => (
                <div className="cart-item" key={product.id}>
                  <img className="cart-item__img" src={product.image} alt={product.name} />

                  <div className="cart-item__info">
                    <p className="cart-item__name">{product.name}</p>
                    <p className="cart-item__per">{formatPrice(product.pricePerKg)} / кг</p>

                    {/* Изменение количества. Кнопки сообщают наверх (в App) новое число граммов. */}
                    <div className="cart-item__qty">
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => onUpdateGrams(product.id, Math.max(grams - product.stepGrams, product.minGrams))}
                      >−</button>
                      <span className="cart-item__qty-val">{formatWeight(grams)}</span>
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => onUpdateGrams(product.id, grams + product.stepGrams)}
                      >+</button>
                    </div>
                  </div>

                  <div className="cart-item__right">
                    {/* Старую (зачёркнутую) цену и бейдж скидки показываем, только если скидка есть. */}
                    {discPct > 0 && <span className="cart-item__old">{formatPrice(base)}</span>}
                    <span className="cart-item__total">{formatPrice(rowTotal)}</span>
                    {discPct > 0 && <span className="cart-item__disc-badge">−{discPct}%</span>}
                    <button className="cart-item__remove" onClick={() => onRemove(product.id)}>🗑</button>
                  </div>
                </div>
              ))}

              {/* Поле промокода */}
              <div className="cart-promo">
                <div className="cart-promo__row">
                  <input
                    className="cart-promo__input"
                    placeholder="Промокод"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handlePromo()}
                  />
                  <button className="cart-promo__btn" onClick={handlePromo}>Применить</button>
                </div>
                {promo      && <p className="cart-promo__ok">✓ {promo.label} применён</p>}
                {promoError && <p className="cart-promo__err">{promoError}</p>}
                <p className="cart-promo__hint">FRESH10 · SAVE200 · BEEF20</p>
              </div>
            </>
          )}
        </div>

        {/* Итоговый блок снизу — показываем, только если в корзине что-то есть. */}
        {cart.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-summary">
              <div className="cart-summary__row">
                <span>Товары ({cart.length})</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discountTotal > 0 && (
                <div className="cart-summary__row cart-summary__row--green">
                  <span>Скидка за объём</span>
                  <span>−{formatPrice(discountTotal)}</span>
                </div>
              )}
              {promoDiscount > 0 && (
                <div className="cart-summary__row cart-summary__row--green">
                  <span>Промокод</span>
                  <span>−{formatPrice(promoDiscount)}</span>
                </div>
              )}
              <div className="cart-summary__row cart-summary__row--total">
                <span>Итого</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <button className="cart-checkout">Оформить заказ</button>
          </div>
        )}

      </div>
    </>
  );
};
