<<<<<<< HEAD
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { separateDigits } from '../../utils';
import './style.css';
import Controls from '../controls';

function Item({item, controlTitle, controlFunc}) {

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
      <Controls controlTitle={controlTitle} controlFunc={callbacks.controlFunc}/>
=======
import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: e => props.onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
>>>>>>> upstream/lecture-3
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
<<<<<<< HEAD
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  controlTitle: PropTypes.string,
  controlFunc: PropTypes.func
};

export default React.memo(Item);
=======
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default memo(Item);
>>>>>>> upstream/lecture-3
