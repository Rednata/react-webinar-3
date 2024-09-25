import { generateCode } from '../utils';
import Basket from './basket';
import Catalog from './catalog';
import * as modules from './exports';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    /**
     * @type {{
     * basket: Basket,
     * catalog: Catalog
     * }}
     */
    this.actions = {};
    for (const name of Object.keys(modules)) {
      this.actions[name] = new modules[name](this, name)
      this.state[name] = this.actions[name].initState();
    }
    // this.actions = {
    //   basket: new Basket(this),
    //   catalog: new Catalog(this),
    // }
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
  setState(newState, description='setState') {
    console.group(
      `%c${'store.setState'} %c${description}`,
      `color: ${'#777'}; font-weight: normal`,
      `color: ${'tomato'}; font-weight: bold`,
    );
    console.log(`%c${'prev:'}`, `color: ${'#d77332'}`, this.state);
    console.log(`%c${'next:'}`, `color: ${'#2fa827'}`, newState);
    console.groupEnd();
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

}

export default Store;
