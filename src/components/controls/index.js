import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ title, onShowModal = () => {} }) {

  return (
    <div className="Controls">
      <button onClick={onShowModal}>{title}</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

export default React.memo(Controls);
