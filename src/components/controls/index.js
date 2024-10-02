import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ title, onHandleClick }) {
  return (
    <div className="Controls">
      <button onClick={onHandleClick}>{title}</button>
    </div>
  );
}

Controls.propTypes = {
  title: PropTypes.string,
  onHandleClick: PropTypes.func,
};

// Controls.defaultProps = {
//   onAdd: () => {},
// };

export default memo(Controls);
