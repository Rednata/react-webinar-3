<<<<<<< HEAD
import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title = '',  children = '' }) {

  return (
    <div className="Head">
      <h1>{title}</h1>
      {children}
=======
import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
>>>>>>> upstream/lecture-3
    </div>
  );
}

Head.propTypes = {
<<<<<<< HEAD
  title: PropTypes.string,
  addClass: PropTypes.string,
  children: PropTypes.node,
};

export default React.memo(Head);
=======
  title: PropTypes.node,
};

export default memo(Head);
>>>>>>> upstream/lecture-3
