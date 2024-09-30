import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import { Link } from 'react-router-dom';


function BasketTool({
  sum = 0, amount = 0,
  onOpen =() => {},
  onClickLink = () => {},
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

  const cn = bem('BasketTool');

  const callbacks = {
    onClickLink: () => {onClickLink(1)}
  }
  return (
    <div className={cn()}>
      <div className={cn('link')}>
        <Link to='/catalog/page' onClick={callbacks.onClickLink}>{basketTranslate.textContentLinkMain}</Link>
      </div>
      <span className={cn('label')}>{basketTranslate.textInBasket}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, basketTranslate.pluralValue, basketTranslate.pluralLocale)} / ${numberFormat(sum)} ₽`
          : `${basketTranslate.textInBasketEmpty}`}
      </span>
      <button className={cn('btn')} onClick={onOpen}>{basketTranslate.textContentGoto}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  onClickLink: PropTypes.func,
};

export default memo(BasketTool);
