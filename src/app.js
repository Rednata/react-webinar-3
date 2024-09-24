import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalLayout from './components/modal-layout';
import Item from './components/item';
import ItemBasket from './components/item-basket';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const [modal, setModal] = useState(null);

  const list = store.getState().list;

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

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    openModalBasketn: useCallback(() => {
      setModal('basket')
    }, [setModal]),

    closeModal: useCallback(() => {
      setModal(null)
    }, [setModal]),
  };

  const renders = {
    item: useCallback((item) => {
      return (<Item item={item} onAdd={callbacks.onDeleteItem} />)
    }, [callbacks.onDeleteItem]),

    itemBasket: useCallback((item) => {
      return (<ItemBasket item={item} onRemove={callbacks.onDeleteItem} />)
    }, [callbacks.onDeleteItem])
  }

  return (
    <>
      <PageLayout>
        <Head title="Приложение на чистом JS" />
        <Controls onAdd={callbacks.openModalBasketn} />
        <List
          list={list}
          renderItem={renders.item}
        />
      </PageLayout>
      {
        modal === 'basket' && (
          <ModalLayout title='Корзина' onClose={callbacks.closeModal}>
            <List
              list={list}
              renderItem={renders.itemBasket}
            />
          </ModalLayout>
        )
      }
    </>
  );
}

export default App;
