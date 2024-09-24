import { generateCode } from "../../utils";

class Catalog {
  constructor(store) {
    this.store = store;
  }

  initState() {
    return {
      list: [
        { code: generateCode(), title: 'Название товара', price: 100.0 },
        { code: generateCode(), title: 'Книга про React', price: 770 },
        { code: generateCode(), title: 'Конфета', price: 33 },
        { code: generateCode(), title: 'Трактор', price: 7955320 },
        { code: generateCode(), title: 'Телефон iPhone XIXV', price: 120000 },
        { code: generateCode(), title: 'Карандаши цветные', price: 111 },
        { code: generateCode(), title: 'Товар сюрприз', price: 0 },
      ],
    }
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

export default Catalog;
