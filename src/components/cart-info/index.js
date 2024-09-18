import React from "react";
import './style.css';
import { plural } from "../../utils";

function CartInfo({ count, children }) {
  console.log('count: ', count);

  return (
    <div className="CartInfo">
      <p>В корзине:
        {
          count ?
          (<span className="CartInfo-text">
            {` ${count}`} {plural(count, {one: 'товар', few: 'товара', many: 'товаров'})} / 223&nbsp;₽</span>) :
          (<span className="CartInfo-text"> пусто</span>)
        }
      </p>
      {children}
    </div>
  )
}

export default CartInfo;
