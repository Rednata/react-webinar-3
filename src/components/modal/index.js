import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { separateDigits } from "../../utils";

function Modal ({
  count = 0, sum = 0, list = {}, onShowModal = () => {}, children = ''
}) {

  const callbacks = {
    onModalClick: (e) => {
      if (e.target.classList.contains('Modal')) {
        onShowModal()
      }
    }
  }

  return (
    <div className="Modal" onClick={callbacks.onModalClick}>
      <div className="Modal-content">
        {children}
        {count ? (
          <>
            {list}
            <div className="Modal-footer">
              <span>Итого </span>
              <span>{separateDigits(sum)}&nbsp;₽</span>
            </div>
          </>
        ) : (
          <p className="Modal-empty">В корзине пусто :(</p>
        )}
      </div>
    </div>
  )
}

Modal.propTypes = {
  count: PropTypes.number,
  sum: PropTypes.number,
  list: PropTypes.arrayOf(PropTypes.object),
  onShowModal: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
