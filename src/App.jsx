import { useState } from 'react';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { CartDrawer } from './components/CartDrawer/CartDrawer';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { PromoPage } from './pages/PromoPage/PromoPage';
import { PaymentPage } from './pages/PaymentPage/PaymentPage';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { ContactsPage } from './pages/ContactsPage/ContactsPage';
import './App.css';

// App — это "главный" компонент. Внутри него хранятся данные, которые нужны
// сразу нескольким частям сайта: какая страница открыта и что лежит в корзине.
//
// Важная идея React: данные хранятся "наверху" (здесь, в App), а кнопки и
// карточки внизу просто получают их через props (как аргументы функции) и
// сообщают наверх о действиях пользователя через функции-колбэки (onAddToCart и т.п.).
export default function App() {
  // useState создаёт "состояние" — переменную, которую React запоминает между
  // перерисовками. Возвращает пару: [текущее значение, функция чтобы его изменить].
  // Когда мы вызываем функцию-изменятор, React перерисовывает экран.

  // Какая страница сейчас открыта ('catalog', 'promo', 'payment', 'about', 'contacts')
  const [page, setPage] = useState('catalog');

  // Какая категория выбрана в каталоге ('all' = показать все товары)
  const [activeCategory, setActiveCategory] = useState('all');

  // Что напечатано в поиске
  const [search, setSearch] = useState('');

  // Корзина — массив товаров. Каждый элемент: { product, grams }
  const [cart, setCart] = useState([]);

  // Открыта ли боковая панель корзины (true / false)
  const [cartOpen, setCartOpen] = useState(false);

  // ── Действия с корзиной ─────────────────────────────────────────────────
  // ВАЖНО: состояние нельзя менять напрямую (cart.push(...) — так нельзя).
  // Нужно создать НОВЫЙ массив и передать его в setCart. Поэтому везде ниже
  // мы используем prev => ... — это "предыдущее значение состояния".

  // Добавить товар в корзину
  const addToCart = (product, grams) => {
    setCart(prev => {
      // Этот товар уже есть в корзине?
      const exists = prev.find(item => item.product.id === product.id);

      // Если есть — просто прибавляем граммы к нему
      if (exists) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, grams: item.grams + grams }
            : item
        );
      }

      // Если нет — добавляем новый элемент в конец массива
      return [...prev, { product, grams }];
    });
    setCartOpen(true); // и сразу открываем корзину
  };

  // Поменять количество граммов у товара
  const updateGrams = (productId, grams) => {
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, grams } : item
      )
    );
  };

  // Удалить товар из корзины (оставляем все, КРОМЕ нужного id)
  const removeItem = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  // ── Какую страницу показать ──────────────────────────────────────────────
  // Простой способ "роутинга" без библиотек: объект, где ключ — имя страницы,
  // а значение — её компонент. Ниже мы достаём нужный по pages[page].
  const pages = {
    catalog: (
      <CatalogPage
        search={search}
        onAddToCart={addToCart}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
    ),
    promo: <PromoPage onAddToCart={addToCart} />,
    payment: <PaymentPage />,
    about: <AboutPage />,
    contacts: <ContactsPage />,
  };

  return (
    <div className="app">
      <Header
        cartCount={cart.length}
        search={search}
        onSearch={setSearch}
        onCartOpen={() => setCartOpen(true)}
      />

      <div className="app__body">
        <Sidebar
          currentPage={page}
          onNavigate={setPage}
          onCategorySelect={setActiveCategory}
        />

        <main className="app__main">
          {/* Достаём из объекта pages нужную страницу по её имени */}
          {pages[page]}
        </main>
      </div>

      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onUpdateGrams={updateGrams}
        onRemove={removeItem}
      />
    </div>
  );
}
