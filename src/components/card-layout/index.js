import React, { useCallback, useEffect } from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Head from "../head";
import BasketTool from "../basket-tool";
import { Link, useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { formatDate } from "../../utils";
import Basket from "../../app/basket";

function CardLayout() {
  const cn = bem('CardLayout');

  const store = useStore();

  const id = useParams().id.substring(3)

  const select = useSelector(state => {

    return ({
      card: state.card.card,
      title: state.card.card.title,
      category: state.card.card.category,
      description: state.card.card.description,
      dateCreate: state.card.card.dateCreate,
      price: state.card.card.price,
      madeIn: state.card.card.madeIn,
      currency: state.card.card.currency,
      amount: state.basket.amount,
      sum: state.basket.sum,
      activeModal: state.modals.name

  })
}, 'Card');

  console.log('select: ', select);

  const isCard = Object.keys(select.card).length !== 0

  const callbacks = {
    openModalBasket: useCallback(() => {
      store.actions.modals.open('basket')
    }, [store]),

    onAdd: useCallback(() => {
      store.actions.basket.addToBasket(id)
    }, [store])
  };

  useEffect(() => {
    console.log('id: ', id);
    store.actions.card.load(id)
  }, [id])

  return (
    <>
      {isCard &&
        (<div className={cn()}>
          <Head title={select.title}/>
          <div className={cn('wraptool')}>
            <Link to="/" className={cn('link')}>Главная</Link>
            <BasketTool
            onOpen={callbacks.openModalBasket}
            sum={select.sum}
            amount={select.amount}
          />
          </div>
          <div className={cn('content')}>
            <p className={cn('description')}>{select.description}</p>
            <p className={cn('country')}>
              Страна производитель: <span>{select.madeIn} ({select.currency})</span>
            </p>
            <p className={cn('category')}>Категория: <span>{select.category}</span></p>
            <p className={cn('year')}>
              Год выпуска: <span>{formatDate(select.dateCreate)}</span>
            </p>
            <p className={cn('price')}>Цена: <span> {select.price} ₽</span></p>

            <button onClick={callbacks.onAdd}>Добавить</button>
          </div>

        </div>
      )}
      {select.activeModal === "basket" && <Basket />}
    </>
    
  )
}

export default React.memo(CardLayout);
