import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function ModalLayout ({ onModalClick = () => {}, children = '' }) {

  const callbacks = {
    onModalClick: (e) => {
      if (e.target.classList.contains('ModalLayout')) {
        onModalClick()
      }
    }
  }

  return (
    <div className="ModalLayout" onClick={callbacks.onModalClick}>
      <div className="ModalLayout-wrap">
        <div className="ModalLayout-innerbox">
          { children }
        </div>
      </div>
    </div>
  )
}

ModalLayout.propTypes = {
  onModalClick: PropTypes.func,
  children: PropTypes.node,
};

export default React.memo(ModalLayout);
