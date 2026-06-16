import './Header.css';

// Верхняя шапка сайта. Все данные приходят сверху (из App) через props:
//   cartCount — число товаров в корзине (для значка),
//   search    — текущий текст поиска,
//   onSearch  — функция "сообщить наверх новый текст поиска",
//   onCartOpen — функция "открыть корзину".
export const Header = ({ cartCount, search, onSearch, onCartOpen }) => {
  return (
    <header className="header">
      <div className="header__inner">

        {/* Логотип */}
        <div className="header__logo">
          <span className="header__logo-icon">🥩</span>
          <span className="header__logo-text">FreshMeat</span>
        </div>

        {/* Поиск.
            Это "управляемый инпут": его текст хранится не в самом <input>, а в state
            (наверху, в App). value берём оттуда, а onChange сообщает наверх каждую
            новую букву. Так React всегда знает, что написано в поле. */}
        <div className="header__search">
          <span className="header__search-icon">🔍</span>
          <input
            className="header__search-input"
            type="text"
            placeholder="Найти продукт..."
            value={search}
            onChange={e => onSearch(e.target.value)}
          />
          {search && (
            <button className="header__search-clear" onClick={() => onSearch('')}>✕</button>
          )}
        </div>

        {/* Корзина */}
        <button className="header__cart" onClick={onCartOpen} aria-label="Корзина">
          <span className="header__cart-icon">🛒</span>
          {cartCount > 0 && (
            <span className="header__cart-badge">{cartCount}</span>
          )}
        </button>

      </div>
    </header>
  );
};