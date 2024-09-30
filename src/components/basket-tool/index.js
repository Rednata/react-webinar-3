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
  textContentGoto = 'Перейти',
  textContentLinkMain = 'Главная',
}) {

  const cn = bem('BasketTool');

  const callbacks = {
    onClickLink: () => {onClickLink(1)}
  }
  return (
    <div className={cn()}>
      <div className={cn('link')}>
        <Link to='/catalog/page' onClick={callbacks.onClickLink}>{textContentLinkMain}</Link>
      </div>
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${numberFormat(sum)} ₽`
          : `пусто`}
      </span>
      <button className={cn('btn')} onClick={onOpen}>{textContentGoto}</button>
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
