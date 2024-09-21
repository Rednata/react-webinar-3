import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalLayout from './components/modal-layout';
import CartInfo from './components/cart-info';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;

  const countCart = store.getCountItemsInCart();
  const sumCart = store.getSumOfCart();

  const [showModal, setShowModal] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onShowModal: useCallback(() => {
      setShowModal(!showModal);
    }, [showModal]),

    addItemToCart: useCallback((item) => {
      store.addItemToCart(item);
    }, [store]),

    deleteItemFromCart: useCallback((code) => {
      store.deleteItemFromCart(code);
    }, [store]),
  };

  return (
    <>
      <PageLayout
        head={<Head title="Магазин" />}
        cartInfo={<CartInfo count={countCart} sum={sumCart} />}
        controls={  <Controls controlTitle="Перейти" controlFunc={callbacks.onShowModal} />}
      >
        <List
          list={list}
          controlTitle="Добавить"
          controlFunc={callbacks.addItemToCart}
          onDeleteItem={callbacks.onDeleteItem}
        />
      </PageLayout>
      {
        showModal &&
        <ModalLayout onModalClick={callbacks.onShowModal}>
          <Cart
            title="Корзина"
            sum={sumCart}
            countCart={countCart}
            controlTitle="Закрыть"
            controlFunc={callbacks.onShowModal}
          >
            <List isCart={true} list={cart} controlTitle="Удалить" controlFunc={callbacks.deleteItemFromCart}/>
          </Cart>
        </ModalLayout>
      }
    </>
  );
}

export default App;
