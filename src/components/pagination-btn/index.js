import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from  '@bem-react/classname';
import './style.css'

function PaginationBtn({num = 1}) {
  const cn = bem('PaginationBtn');

  return (
    <button className={cn()}>{num}</button>
  )
}

PaginationBtn.propTypes = {
  num: PropTypes.number,
};

export default React.memo(PaginationBtn);
