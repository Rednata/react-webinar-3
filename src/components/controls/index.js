import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ controlTitle= '', controlFunc = () => {} }) {

  return (
    <div className="Controls">
      <button className="Controls-btn" onClick={controlFunc}>{controlTitle}</button>
    </div>
  );
}

Controls.propTypes = {
  controlTitle: PropTypes.string.isRequired,
  onAdd: PropTypes.func,
};

export default React.memo(Controls);
