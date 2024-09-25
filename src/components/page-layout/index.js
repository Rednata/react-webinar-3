<<<<<<< HEAD
import React from 'react';
=======
import { memo } from 'react';
>>>>>>> upstream/lecture-3
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

<<<<<<< HEAD
function PageLayout({ head="", cartInfo="", controls="", children="" }) {
=======
function PageLayout({ head, footer, children }) {
>>>>>>> upstream/lecture-3
  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
<<<<<<< HEAD
      {head}
      <div className={cn('info')}>
        {cartInfo}
        {controls}
      </div>
      <div className={cn('center')}>{children}</div>
=======
      <div className={cn('head')}>{head}</div>
      <div className={cn('center')}>{children}</div>
      <div className={cn('footer')}>{footer}</div>
>>>>>>> upstream/lecture-3
    </div>
  );
}

PageLayout.propTypes = {
<<<<<<< HEAD
  head: PropTypes.node,
  cartInfo: PropTypes.node,
  controls: PropTypes.node,
  children: PropTypes.node,
};

export default React.memo(PageLayout);
=======
  children: PropTypes.node,
};

export default memo(PageLayout);
>>>>>>> upstream/lecture-3
