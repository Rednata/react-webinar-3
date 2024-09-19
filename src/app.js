import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import CartInfo from './components/cart-info';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  console.log('cart: ', cart);

  const getCountItemsInCart = () => store.getCountItemsInCart();

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
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <CartInfo count={getCountItemsInCart()}>
          <Controls controlTitle="Перейти" controlFunc={callbacks.onShowModal} />
        </CartInfo>
        <List
          list={list}
          controlTitle="Добавить"
          controlFunc={callbacks.addItemToCart}
          onDeleteItem={callbacks.onDeleteItem}
        />
      </PageLayout>
      {
        showModal &&
        <Modal onShowModal={callbacks.onShowModal}>
          <Head title="Корзина" addClass='Modal-head'/>
          <Controls controlTitle="Закрыть" controlFunc={callbacks.onShowModal}/>
          <List list={cart} controlTitle="Удалить"/>
        </Modal>
      }
    </>
  );
}

export default App;
