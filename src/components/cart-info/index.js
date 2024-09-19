import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural, separateDigits } from "../../utils";

function CartInfo({ count = 0, sum = 0, children = '' }) {

  return (
    <div className="CartInfo">
      <p>В корзине:
        {
          count ?
          (<span className="CartInfo-text">
            {` ${count}`} {plural(count, {one: 'товар', few: 'товара', many: 'товаров'})} / {separateDigits(sum)}&nbsp;₽</span>) :
          (<span className="CartInfo-text"> пусто</span>)
        }
      </p>
      {children}
    </div>
  )
}

CartInfo.propTypes = {
  count: PropTypes.number,
  sum: PropTypes.number,
  children: PropTypes.node,
};

export default React.memo(CartInfo);
