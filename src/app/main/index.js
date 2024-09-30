import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PaginationLayout from '../../components/pagination-layout';
import PaginationBtn from '../../components/pagination-btn';
import ControlLang from '../../components/control-lang';
import {translate} from '../../utils';

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.pages.current,
    lastPage: state.catalog.pages.last,
    lang: state.catalog.lang
  }));

  useEffect(() => {
    store.actions.catalog.load(select.currentPage)
    window.history.pushState(select.currentPage, '', `/catalog/page=${select.currentPage}`)
  }, [select.currentPage])

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменение номера активной страницы
    changeActiveNum: useCallback(num => store.actions.catalog.changeActiveNumPage(num), [store])
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} textContent={translate('btnAdd', select.lang)}/>;
      },
      [callbacks.addToBasket, select.lang],
    ),
    pagination: {
      firstBlock: (num) => {
        const temp = [];
        for (let i = 2; i <= num; i++) {
          temp.push(<PaginationBtn num={i} isActive={i===select.currentPage} onclick={callbacks.changeActiveNum} key={i}/>)
        }
        return ( <>{[...temp]} ... </> )
      },
      middleBlock: (num) => {
        const temp = [];
        for (let i = num - 1; i <= num+1; i++) {
          temp.push(<PaginationBtn num={i} isActive={i===select.currentPage} onclick={callbacks.changeActiveNum} key={i}/>)
        }
        return ( <>... {[...temp]}... </> )
      },
      lastBlock: (num) => {
        const temp = [];
        for (let i = num+1; i <= num+3; i++) {
          temp.push(<PaginationBtn num={i} isActive={i===select.currentPage} onclick={callbacks.changeActiveNum} key={i}/>)
        }
        return ( <>... {[...temp]} </> )
      }
    }
  };

  return (
    <PageLayout>
      <ControlLang />
      <Head title={translate('titleShop', select.lang)} />
      <BasketTool onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        onClickLink={callbacks.changeActiveNum}
        textContentLinkMain={translate('linkMain', select.lang)}
        textContentGoto={translate('btnGoto', select.lang)} />
      <List list={select.list} renderItem={renders.item} />
      <PaginationLayout>
        <PaginationBtn num={1} isActive={select.currentPage===1} onclick={callbacks.changeActiveNum}/>
        {
          select.currentPage < 4
          ? (renders.pagination.firstBlock(select.currentPage < 3 ? 3 : 4))
          : select.currentPage > select.lastPage - 3
          ? renders.pagination.lastBlock(select.lastPage - select.currentPage < 3 ? select.lastPage - 4 : select.lastPage - 3)
          : (renders.pagination.middleBlock(select.currentPage))
        }
        <PaginationBtn num={select.lastPage} isActive={select.currentPage===select.lastPage} onclick={callbacks.changeActiveNum}/>
      </PaginationLayout>
    </PageLayout>
  );
}

export default memo(Main);
