import { generateCode } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = generateCode(0)
  }

  initState() {
    return {
      list: [],
      pages: {
        current: 1,
        limit: 10,
        last:1,
      }
    }
  }

  async loadFirst() {
    const response = await fetch('/api/v1/articles?limit=10&skip=0&fields=items(_id, title, price),count');
    const json = await response.json();
    const last = Math.ceil(json.result.count / this.getState().pages.limit)

    this.setState({
      ...this.getState(),
      list: json.result.items,
      pages: {...this.getState().pages, last: last}
    })
  }

  async load(num, limit=10) {
    const skip = (num - 1) * limit;
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    const last = Math.ceil(json.result.count / this.getState().pages.limit)
    if (this.getState().pages.last === last) {
      this.setState({
        ...this.getState(),
        list: json.result.items,
      })
    } else {
      this.setState({
        ...this.getState(),
        list: json.result.items,
        pages: {...this.getState().pages, last: last}
      })
    }
  }

  changeActiveNumPage(num) {
    this.setState({
      ...this.getState(),
      pages: {...this.getState().pages, current: num}
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

export default Catalog;
