import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import ItemCart from '../item-cart';

function List({ isCart=false, list = [{code: 0}], controlTitle = "", controlFunc = () => {}}) {

  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          {
            isCart ?
              <ItemCart item={item} controlTitle={controlTitle} controlFunc={controlFunc} /> :
              <Item item={item} controlTitle={controlTitle} controlFunc={controlFunc} />
          }
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  isCart: PropTypes.bool,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  controlTitle: PropTypes.string,
  controlFunc: PropTypes.func,
};

export default React.memo(List);
