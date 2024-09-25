import React, { useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import List from '../../components/list';
import Head from '../../components/head';
import Item from '../../components/item';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PaginationLayout from '../../components/pagination-layout';
import PaginationBtn from '../../components/pagination-btn';
import Pagination from '../pagination';

function Main() {

  const store = useStore()

  const select = useSelector(state => {

    return ({
      list: state.catalog.list,
      amount: state.basket.amount,
      sum: state.basket.sum,
      currentPage: state.catalog.pages.current
  })
}, 'Main');

console.log('select: ', select);

  useEffect(() => {
    store.actions.catalog.load(select.currentPage)
  }, [select.currentPage])

  useEffect(() => {
    store.actions.catalog.loadFirst()
  }, [])

  const callbacks = {
    addToBasket: useCallback((code) => {
      store.actions.basket.addToBasket(code)
    }, [store]),

    openModalBasket: useCallback(() => {
      console.log('basket');
      
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
          sum={select.sum}
          amount={select.amount}
        />
        <List
          list={select.list}
          renderItem={renders.item}
        />
        <Pagination />
      </PageLayout>
  );
}

export default React.memo(Main);
