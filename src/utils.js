/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}


export const formatDate = (date) =>
  new Date(date).getFullYear();

/**
 * Добавление ссылки для переданного объекта
 * @param item {Object}
 * @returns {Object}
 */
export const addLinkToItem = (item) => {
  return ({...item, link: `/item/id:${item._id}`})
}

const dictionary = {
    titleShop: {RU: 'Магазин', EN: 'Shop'},
    titleBasket: {RU: 'Корзина', EN: 'Basket'},
    btnAdd: {RU: 'Добавить', EN: 'Add'},
    btnRemove: {RU: 'Удалить', EN: 'Remove'},
    btnClose: {RU: 'Закрыть', EN: 'Close'},

    btnGoto: {RU: 'Перейти', EN: 'Go to'},
    linkMain: {RU: 'Главная', EN: 'Main'},
    textInBasket: {RU: 'В корзине', EN: 'In Basket'},
    textInBasketEmpty: {RU: 'пусто', EN: 'empty'},
    pluralLocale: {RU: 'ru-RU', EN: 'en-US'},
    pluralValue: {
      RU: {
        one: 'товар',
        few: 'товара',
        many: 'товаров',
      },
      EN: {
        one: 'good',
        other: 'goods',
      }
    }
}

export const translate = (name, lang) => {
  console.log('name: ', name);
  console.log('name: ', dictionary[name]);
  return dictionary[name][lang]
}

export const getPageNumberFromURL = () => {
  return Number(window.location.pathname.substring(14))
}