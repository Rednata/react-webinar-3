import { memo } from 'react';
import PropTypes from 'prop-types';
// import './style.css';

function Categories(props) {
  console.log('props: ', props);

  return (
    <div className="Categories">

    </div>
  );
}

Categories.propTypes = {

};

// Controls.defaultProps = {
//   onAdd: () => {},
// };

export default memo(Categories);