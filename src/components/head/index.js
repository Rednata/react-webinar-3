import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, addClass }) {
  console.log('addClass: ', addClass);
  return (
    <div className={addClass ? `Head ${addClass}` : `Head`}>
      <h1>{title}</h1>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
