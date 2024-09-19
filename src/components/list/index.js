import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list = {code: 0}, controlTitle = "", controlFunc = () => {}}) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          <Item item={item} controlTitle={controlTitle} controlFunc={controlFunc} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  controlTitle: PropTypes.string,
  controlFunc: PropTypes.func,
};

export default React.memo(List);
