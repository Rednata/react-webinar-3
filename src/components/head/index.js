import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title = '', addClass = '', children = '' }) {

  return (
    <div className={addClass ? `Head ${addClass}` : `Head`}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.string,
  addClass: PropTypes.string,
  children: PropTypes.node,
};

export default React.memo(Head);
