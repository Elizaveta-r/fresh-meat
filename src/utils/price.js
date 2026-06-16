// Цена за указанное количество граммов
// Пример: calcPrice(890, 300) => 267 ₽
export function calcPrice(pricePerKg, grams) {
  return Math.round((pricePerKg / 1000) * grams);
}

// Граммы → читаемая строка: 300 → "300 г", 1500 → "1.5 кг"
export function formatWeight(grams) {
  if (grams < 1000) return `${grams} г`;
  const kg = grams / 1000;
  return `${Number.isInteger(kg) ? kg : kg.toFixed(1)} кг`;
}

// Число → "890 ₽"
export function formatPrice(price) {
  return `${price.toLocaleString('ru-RU')} ₽`;
}