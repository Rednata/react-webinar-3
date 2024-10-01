import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural, separateDigits } from "../../utils";

function CartInfo({ count = 0, sum = 0}) {

  return (
    <div className="CartInfo">
      <p className="CartInfo-text">В корзине:
        {
          count ?
          (<span >
            {` ${count}`} {plural(count, {one: 'товар', few: 'товара', many: 'товаров'})} / {separateDigits(sum)}&nbsp;₽</span>) :
          (<span> пусто</span>)
        }
      </p>
    </div>
  )
}

CartInfo.propTypes = {
  count: PropTypes.number,
  sum: PropTypes.number,
  children: PropTypes.node,
};

export default React.memo(CartInfo);