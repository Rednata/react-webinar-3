<<<<<<< HEAD
import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ controlTitle= '', controlFunc = () => {} }) {

  return (
    <div className="Controls">
      <button className="Controls-btn" onClick={controlFunc}>{controlTitle}</button>
=======
import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onAdd }) {
  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>Добавить</button>
>>>>>>> upstream/lecture-3
    </div>
  );
}

Controls.propTypes = {
<<<<<<< HEAD
  controlTitle: PropTypes.string.isRequired,
  onAdd: PropTypes.func,
};

export default React.memo(Controls);
=======
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default memo(Controls);
>>>>>>> upstream/lecture-3
