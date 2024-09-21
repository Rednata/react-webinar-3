import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PageLayout({ head="", cartInfo="", controls="", children="" }) {
  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      {head}
      <div className={cn('info')}>
        {cartInfo}
        {controls}
      </div>
      <div className={cn('center')}>{children}</div>
    </div>
  );
}

PageLayout.propTypes = {
  head: PropTypes.node,
  cartInfo: PropTypes.node,
  controls: PropTypes.node,
  children: PropTypes.node,
};

export default React.memo(PageLayout);
