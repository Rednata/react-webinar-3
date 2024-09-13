/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния;
    this.lastCode = this.setLastCode();
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
   * Находит максимальное значение кода code в initialState и записывает в state.
   * Вызывается один раз при инициализации
   * @returns {Number}
   */
  setLastCode() {
    return Math.max(...this.state.list.map(item => item.code)) || 1
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
   * Установка кода code для новой записи
   * @returns {Number}
   */
  setCode() {
    this.lastCode = this.lastCode + 1;
    return this.lastCode
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.setCode(), title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(e, code) {
    e.stopPropagation();
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Установка значения, сколько раз выделяли запись
   * @param item
   */
  setCountSelect(item) {
    if (item.countSelect) {
      item.countSelect = item.selected ? item.countSelect + 1 : item.countSelect
    } else item.countSelect = 1
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
          item.selected = !item.selected;
          this.setCountSelect(item)
        } else {
          item.selected = false;
        }
        return item;
      }),
    });
  }

  /**
   * Склонение слова "раз" в завимости от числа count
   * @param count
   * @returns {String}
   */
  setSelectedItemTitle(count) {
    const reg = /[^2-4]$|(\d?1[2-4]$)/;
    const title = reg.test(count) ?
      ` Выделяли ${count} раз` : ` Выделяли ${count} раза`
    return title;
  }
}

export default Store;
