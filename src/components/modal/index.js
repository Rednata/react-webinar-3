import React from "react";
import './style.css';

function Modal ({onShowModal, children}) {

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
      </div>
    </div>
  )
}

export default Modal;
