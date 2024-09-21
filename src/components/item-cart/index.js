import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { separateDigits } from "../../utils";
import Controls from "../controls";

function ItemCart({ item, controlTitle = "", controlFunc = () => {} }) {

  const callbacks = {
    controlFunc: () => controlFunc(item.code)
  }

  return (
    <div
      className='ItemCart'
    >
      <div className="ItemCart-code">{item.code}</div>
      <div className="ItemCart-title">
        {item.title}
      </div>
      <div className="ItemCart-price">
        {separateDigits(item.price)}&nbsp;₽
      </div>
      <div className="ItemCart-count">{item.count}&nbsp;шт</div>
      <Controls controlTitle={controlTitle} controlFunc={callbacks.controlFunc}/>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  controlTitle: PropTypes.string,
  controlFunc: PropTypes.func
};

export default React.memo(ItemCart);
