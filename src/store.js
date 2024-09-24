import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
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

  addToBasket(code) {
    let sum = 0;
    let exist = false;
    const list = this.getState().basket.list.map(item => {
      let result = item;
      if (item.code === code) {
        exist = true;
        result = {...item, amount: item.amount + 1 }
      }
      sum += result.price * result.amount;
      return result
    })

    if (!exist) {
      const item = this.getState().list.find(item => item.code === code);
      list.push({...item, amount: 1})
      console.log('item: ', item);
      sum += item.price
    }
    console.log('list: ', this.getState());

    this.setState({
      ...this.state,
      basket: {...this.state.basket, list, sum, amount: list.length}
    })
  }

  removeFromBasket(code) {
    let sum = 0;
    const list = this.getState().basket.list.filter(item => {
      if (item.code === code) return false;
      sum += item.price * item.amount
      return true
    })

    this.setState({
      ...this.state, 
      basket: {...this.state.basket, list, sum, amount: list.length}
    })
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
}

export default Store;
