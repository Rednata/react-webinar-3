import { addLinkToItem, codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      pages: {
        current: 1,
        limit: 10,
        last:1,
      },
      lang: 'RU'
    };
  }

  setItemLinks(json) {
    return json.map(addLinkToItem)
  }

  async load(num, limit=10) {
    const skip = (num - 1) * limit;
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    const last = Math.ceil(json.result.count / this.getState().pages.limit)
    const arrWithItemsLink = this.setItemLinks(json.result.items);
    if (this.getState().pages.last === last) {
      this.setState({
        ...this.getState(),
        list: arrWithItemsLink,
      }, 'Загружены товары из АПИ')
    } else {
      this.setState({
        ...this.getState(),
        list: arrWithItemsLink,
        pages: {...this.getState().pages, last: last}
      }, 'Загружены товары из АПИ')
    }
  }

  changeActiveNumPage(num) {
    this.setState({
      ...this.getState(),
      pages: {...this.getState().pages, current: num}
    })
  }

  changeLang(lang) {
    this.setState({
      ...this.getState(),
      lang
    })
  }
}

export default Catalog;
