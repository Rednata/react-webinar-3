<<<<<<< HEAD
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
=======
import { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ModalLayout(props) {
  const cn = bem('ModalLayout');

  // Корректировка центра, если модалка больше окна браузера.
  const layout = useRef();
  const frame = useRef();
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      // Центрирование frame или его прижатие к краю, если размеры больше чем у layout
      layout.current.style.alignItems =
        layout.current.clientHeight < frame.current.clientHeight ? 'flex-start' : 'center';
      layout.current.style.justifyContent =
        layout.current.clientWidth < frame.current.clientWidth ? 'flex-start' : 'center';
    });
    // Следим за изменениями размеров layout
    resizeObserver.observe(layout.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={cn()} ref={layout}>
      <div className={cn('frame')} ref={frame}>
        <div className={cn('head')}>
          <h1 className={cn('title')}>{props.title}</h1>
          <button className={cn('close')} onClick={props.onClose}>
            Закрыть
          </button>
        </div>
        <div className={cn('content')}>{props.children}</div>
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

ModalLayout.defaultProps = {
  title: 'Модалка',
  onClose: () => {},
};

export default memo(ModalLayout);
>>>>>>> upstream/lecture-3
