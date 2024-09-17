import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { separateDigits } from '../../utils';
import './style.css';

function Item({item, onDelete = () => {}}) {

  const callbacks = {
    onDelete: e => {
      e.stopPropagation();
      onDelete(item.code);
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
      <div className="Item-actions">
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
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
  onDelete: PropTypes.func
};

export default React.memo(Item);
