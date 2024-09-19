import React from "react";
import './style.css';
import { plural, separateDigits } from "../../utils";

function CartInfo({ count, sum, children }) {

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

export default CartInfo;
