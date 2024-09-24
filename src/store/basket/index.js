import { store } from "../instance";

export function addToBasket(code) {
  let sum = 0;
  let exist = false;
  const list = store.getState().basket.list.map(item => {
    let result = item;
    if (item.code === code) {
      exist = true;
      result = {...item, amount: item.amount + 1 }
    }
    sum += result.price * result.amount;
    return result
  })

  if (!exist) {
    const item = store.getState().list.find(item => item.code === code);
    list.push({...item, amount: 1})
    console.log('item: ', item);
    sum += item.price
  }
  console.log('list: ', store.getState());

  store.setState({
    ...store.state,
    basket: {...store.state.basket, list, sum, amount: list.length}
  })
}

export function removeFromBasket(code) {
  let sum = 0;
  const list = store.getState().basket.list.filter(item => {
    if (item.code === code) return false;
    sum += item.price * item.amount
    return true
  })

  store.setState({
    ...store.state, 
    basket: {...store.state.basket, list, sum, amount: list.length}
  })
}