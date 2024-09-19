import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { separateDigits } from '../../utils';
import './style.css';
import Controls from '../controls';

function Item({item, controlTitle = "", controlFunc = () => {}}) {

  const callbacks = {
    controlFunc: () => {
      controlFunc(item);
    },
  };

  return (
    <div
      className='Item'
    >
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">
        {item.title}
      </div>
      <div className="Item-price">
        {separateDigits(item.price)}&nbsp;₽
      </div>
      {
        item.count &&
        <div className="Item-count">{item.count}&nbsp;шт</div>
      }
      <Controls controlTitle={controlTitle} controlFunc={callbacks.controlFunc}/>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  controlTitle: PropTypes.string,
  controlFunc: PropTypes.func
};

export default React.memo(Item);
