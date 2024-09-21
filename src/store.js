import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {...initState, cart: []};
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }

  /**
   * Добавление состояния корзины в общий state
   * @param {newCart} {Object}
   */
  setCart(newCart) {
    this.setState({...this.state, cart: [...newCart]})
  }

  /**
   * Добавление уникального товара в корзину
   * @param item {Object}
   */
  addItemToCart(item) {
    const repeatItem = this.state.cart.find(elem => elem.code === item.code);
    if (repeatItem) {
      const newCart = [
        ...this.state.cart.filter(elem => elem.code !== item.code),
          {...repeatItem, count: repeatItem.count + 1}];
      this.setCart(newCart);
    } else {
      this.setCart([...this.getState().cart, {...item, count: item.count || 1}]);
    }
  }

  /**
   * Удаление товара из корзины
   * @param item {Object}
   */
  deleteItemFromCart(code) {
    this.setCart(
      [...this.state.cart.filter(elem => elem.code !== code)])
  }

  /**
   * Подсчет количества уникальных товаров в корзине
   * @returns Number
   */
  getCountItemsInCart() {
    return (this.state.cart).length;
  }

  /**
   * Подсчет суммы всех товаров в корзине
   * @returns Number
   */
  getSumOfCart() {
    return this.state.cart
      .reduce((acc, elem) => (acc + elem.count  * (elem.price || 0)), 0)
  }
}

export default Store;
