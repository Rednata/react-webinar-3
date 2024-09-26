import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from  '@bem-react/classname';
import './style.css'

function PaginationBtn({num = 1, isActive, onclick=() =>{}}) {
  const cn = bem('PaginationBtn');
  
  const callbacks = {
    onclick: () => {
      onclick(num)
    }
  }

  return (
    <button
      onClick={callbacks.onclick}
      className={`PaginationBtn ${isActive ? 'PaginationBtn-active' : ''}`}>{num}</button>
      // className={cn() }>{num}</button>
  )
}

PaginationBtn.propTypes = {
  num: PropTypes.number,
};

export default React.memo(PaginationBtn);
