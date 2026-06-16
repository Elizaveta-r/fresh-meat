// AboutPage.jsx
import './InfoPages.css';

export const AboutPage = () => (
  <div className="info-page">
    <h1 className="info-page__title">О нас</h1>

    <div className="about-hero">
      <img
        className="about-hero__img"
        src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=900&q=80"
        alt="Мясная лавка"
      />
      <div className="about-hero__text">
        <h2>FreshMeat — ваш мясной магазин</h2>
        <p>
          Мы работаем с 2015 года и поставляем свежее мясо напрямую с ферм
          Воронежской и Белгородской областей. Никакой заморозки,
          никаких посредников — только охлаждённый продукт от проверенных
          фермерских хозяйств.
        </p>
        <p>
          Собственный мясокомбинат позволяет нам производить колбасные изделия
          по классическим рецептурам без сои, красителей и усилителей вкуса.
        </p>
      </div>
    </div>

    <div className="about-stats">
      {[
        { value: '9 лет', label: 'на рынке' },
        { value: '12 ферм', label: 'поставщиков' },
        { value: '4 000+', label: 'клиентов' },
        { value: '16 видов', label: 'продукции' },
      ].map(s => (
        <div key={s.label} className="about-stat">
          <span className="about-stat__value">{s.value}</span>
          <span className="about-stat__label">{s.label}</span>
        </div>
      ))}
    </div>
  </div>
);