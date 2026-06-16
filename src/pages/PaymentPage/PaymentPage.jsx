// PaymentPage.jsx
import { paymentMethods, deliveryInfo, paymentTerms } from '../../utils/paymentMethods';
import { formatPrice } from '../../utils/price';
import './InfoPages.css';

export const PaymentPage = () => (
    <div className="info-page">
        <h1 className="info-page__title">Оплата и доставка</h1>

        {/* Способы оплаты */}
        <h2 className="info-page__section">Способы оплаты</h2>
        <div className="payment-grid">
            {paymentMethods.map(m => (
                <div key={m.id} className="payment-card">
                    <span className="payment-card__icon">{m.icon}</span>
                    <div>
                        <p className="payment-card__title">
                            {m.title}
                            {m.badge && <span className="payment-card__badge">{m.badge}</span>}
                        </p>
                        <p className="payment-card__desc">{m.description}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* Доставка */}
        <h2 className="info-page__section">Условия доставки</h2>
        <div className="delivery-info">
            <div className="delivery-info__row">
                <span>Бесплатная доставка</span>
                <strong>от {formatPrice(deliveryInfo.freeFrom)}</strong>
            </div>
            <div className="delivery-info__row">
                <span>Стоимость доставки</span>
                <strong>{formatPrice(deliveryInfo.deliveryCost)}</strong>
            </div>
            <div className="delivery-info__row">
                <span>Минимальный заказ</span>
                <strong>{formatPrice(deliveryInfo.minOrder)}</strong>
            </div>
            <div className="delivery-info__row">
                <span>Время доставки</span>
                <strong>{deliveryInfo.estimatedTime}</strong>
            </div>
        </div>

        {/* Условия */}
        <h2 className="info-page__section">Условия оплаты</h2>
        <ul className="payment-terms">
            {paymentTerms.map((t, i) => <li key={i}>{t}</li>)}
        </ul>

        {/* Система скидок */}
        <h2 className="info-page__section">Система скидок</h2>
        <div className="discount-table">
            <table className="discount-table__table">
                <thead>
                    <tr>
                        <th>Условие</th>
                        <th>Скидка</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Заказ от 1.5 кг одного товара</td>
                        <td className="green">−5%</td>
                    </tr>

                    <tr>
                        <td>Заказ от 3 кг одного товара</td>
                        <td className="green">−10%</td>
                    </tr>

                    <tr>
                        <td>Акция на птицу</td>
                        <td className="green">−10%</td>
                    </tr>

                    <tr>
                        <td>Промокод FRESH10</td>
                        <td className="green">−10% на весь заказ</td>
                    </tr>

                    <tr>
                        <td>Промокод SAVE200</td>
                        <td className="green">−200 ₽ от 1 000 ₽</td>
                    </tr>

                    <tr>
                        <td>Промокод BEEF20</td>
                        <td className="green">−20% на говядину</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);