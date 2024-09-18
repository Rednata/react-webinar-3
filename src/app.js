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

  const [showModal, setShowModal] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onSelectItem: useCallback(
      code => {
        store.selectItem(code);
      },
      [store],
    ),

    onShowModal: useCallback(() => {
      setShowModal(!showModal);
    }, [showModal]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <CartInfo>
          <Controls title="Перейти" onShowModal={callbacks.onShowModal} />
        </CartInfo>
        {/* <Controls title="Перейти" onAdd={callbacks.onAddItem} /> */}
        <List
          list={list}
          onDeleteItem={callbacks.onDeleteItem}
          onSelectItem={callbacks.onSelectItem}
        />
      </PageLayout>
      {
        showModal &&
        <Modal onShowModal={callbacks.onShowModal}>
          <Head title="Корзина" addClass='Modal-head'/>
          <Controls title="Закрыть" onShowModal={callbacks.onShowModal}/>
        </Modal>
      }
    </>
  );
}

export default App;
