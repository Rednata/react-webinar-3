import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Head from "../head";
import BasketTool from "../basket-tool";
import { formatDate, numberFormat } from "../../utils";
import ControlLang from "../control-lang";

function CardLayout({
  card={}, price = 0, sum=0, amount=0,
  onAdd=()=>{}, openModalBasket=()=>{},
  textContentAdd = 'Добавить',
  basketTranslate = {
    textContentGoto: 'Перейти',
    textInBasket: 'В корзине',
    textInBasketEmpty: 'Пусто',
    textContentLinkMain: 'Главная',
    pluralLocale: 'ru-RU',
    pluralValue: {
      one: 'товар',
      few: 'товара',
      many: 'товаров',
    }
  }
  }) {

  const {
    title ='',
    category = '',
    description = '',
    dateCreate = '',
    madeIn = '',
    code = ''
  } = card;

  const cn = bem('CardLayout');

  return (
    <div className={cn()}>
      <ControlLang />
      <Head title={title}/>
      <BasketTool
        onOpen={openModalBasket}
        sum={sum}
        amount={amount}
        basketTranslate={basketTranslate}
      />
      <div className={cn('content')}>
        <p className={cn('description')}>{description}</p>
        <p className={cn('country')}>
          Страна производитель: <span>{madeIn} ({code})</span>
        </p>
        <p className={cn('category')}>Категория: <span>{category}</span></p>
        <p className={cn('year')}>
          Год выпуска: <span>{formatDate(dateCreate)}</span>
        </p>
        <p className={cn('price')}>Цена: <span> {price} ₽</span></p>
      </div>

      <div className={cn('footer')}>
        <button onClick={onAdd}>{textContentAdd}</button>
      </div>
    </div>
  )
}

CardLayout.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    dateCreate: PropTypes.string,
    price: PropTypes.number,
    madeIn: PropTypes.string,
    currency: PropTypes.string,
  }).isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  onAdd: PropTypes.func,
  openModalBasket: PropTypes.func
};

export default React.memo(CardLayout);
