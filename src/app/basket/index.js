import React, { useCallback } from 'react';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import ItemBasket from '../../components/item-basket';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Basket() {
  const store = useStore()

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }), 'Basket');

  const callbacks = {
    removeFromBasket: useCallback((code) => {
      store.actions.basket.removeFromBasket(code)
    }, [store]),

    closeModal: useCallback(() => {
      store.actions.modals.close()
    }, [store]),
  };

  const renders = {
    itemBasket: useCallback((item) => {
      return (<ItemBasket item={item} onRemove={callbacks.removeFromBasket} />)
    }, [callbacks.removeFromBasket])
  }

  return (
    <ModalLayout title='Корзина' onClose={callbacks.closeModal}>
      <List
        list={select.list}
        renderItem={renders.itemBasket}
      />
      <BasketTotal sum={select.sum}/>
    </ModalLayout>
  )
}

export default React.memo(Basket);
