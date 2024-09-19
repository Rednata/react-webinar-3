import React from "react";
import './style.css';
import { separateDigits } from "../../utils";

function Modal ({count, sum, list, onShowModal, children}) {

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

export default Modal;
