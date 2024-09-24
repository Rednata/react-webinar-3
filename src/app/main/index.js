import React, { useCallback } from 'react';
import PageLayout from '../../components/page-layout';
import List from '../../components/list';
import Head from '../../components/head';
import Item from '../../components/item';
import BasketTool from '../../components/basket-tool';

function Main({ store }) {

  const state = store.getState();

  const callbacks = {
    addToBasket: useCallback((code) => {
      store.actions.basket.addToBasket(code)
    }, [store]),

    openModalBasket: useCallback(() => {
      store.actions.modals.open('basket')
    }, [store]),
  };

  const renders = {
    item: useCallback((item) => {
      return (<Item item={item} onAdd={callbacks.addToBasket} />)
    }, [callbacks.addToBasket]),
  }

  return (
      <PageLayout>
        <Head title="Приложение на чистом JS" />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          sum={state.basket.sum}
          amount={state.basket.amount}
        />
        <List
          list={state.catalog.list}
          renderItem={renders.item}
        />
      </PageLayout>
  );
}

export default Main;
