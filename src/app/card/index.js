import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

import Basket from "../../app/basket";
import CardLayout from "../../components/card-layout";

function Card() {

  const store = useStore();
  const id = useParams().id.substring(3)

  const select = useSelector(state => {

    return ({
      card: state.card.card,
      activeModal: state.modals.name,
      sum: state.basket.sum,
      amount: state.basket.amount

  })
}, 'Card');

  const getIsCard = (card) => Object.keys(card).length !== 0

  const isCard = getIsCard(select.card);

  const callbacks = {
    openModalBasket: useCallback(() => {
      store.actions.modals.open('basket')
    }, [store]),

    onAdd: useCallback(() => {
      store.actions.basket.addToBasket(id)
    }, [store])
  };

  useEffect(() => {
    store.actions.card.load(id)
  }, [id])

  return (
    <>
      {
        isCard &&
          <CardLayout
            card={select.card}
            sum={select.sum}
            amount={select.amount}
            onAdd={callbacks.onAdd}
            openModalBasket={callbacks.openModalBasket}
            />
      }
     { select.activeModal === "basket" && <Basket /> }
    </>
  )
}

export default React.memo(Card);