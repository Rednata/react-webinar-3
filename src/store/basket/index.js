import { store } from "../instance";
import StoreModule from "../module";

class Basket extends StoreModule {

  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0
    }
  }

  addToBasket(code) {
    console.log(this.store.getState());
    
    let sum = 0;
    let exist = false;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item.code === code) {
        exist = true;
        result = {...item, amount: item.amount + 1 }
      }
      sum += result.price * result.amount;
      return result
    })

    if (!exist) {
      const item = this.store.getState().catalog.list.find(item => item.code === code);
      list.push({...item, amount: 1})
      sum += item.price
    }

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length
    }, 'Добавление в корзину');

  }

  removeFromBasket(code) {
    let sum = 0;
    const list = this.store.getState().basket.list.filter(item => {
      if (item.code === code) return false;
      sum += item.price * item.amount
      return true
    })

    this.store.setState({
      ...this.store.getState(),
      basket: {...this.store.getState().basket, list, sum, amount: list.length}
    }, 'Удаление из корзины')
  }
}

export default Basket;
