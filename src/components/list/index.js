<<<<<<< HEAD
import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({
  list = [{code: 0}],
  controlTitle = "",
  controlFunc = () => {},
  renderItem=()=>{}
}) {

  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          {renderItem(item, controlTitle, controlFunc)}
        </div>

=======
import { memo } from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, renderItem }) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item._id} className="List-item">
          {renderItem(item)}
        </div>
>>>>>>> upstream/lecture-3
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
<<<<<<< HEAD
      code: PropTypes.number,
    }),
  ).isRequired,
  controlTitle: PropTypes.string,
  controlFunc: PropTypes.func,
  renderItem: PropTypes.func,
};

export default React.memo(List);
=======
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  renderItem: PropTypes.func,
};

List.defaultProps = {
  renderItem: item => {},
};

export default memo(List);
>>>>>>> upstream/lecture-3
