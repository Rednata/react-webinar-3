import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from  '@bem-react/classname';
import './style.css'

function PaginationLayout({children}) {

  const cn = bem('PaginationLayout');

  return (
    <div className={cn()}>
      {children}
    </div>
  )
}

export default React.memo(PaginationLayout);
