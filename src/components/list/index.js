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
  renderItem: PropTypes.func,
};

export default React.memo(List);
