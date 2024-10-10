import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CommentItem from '../../components/comment-item';

function CommentsList({ items = [], children, onClick }) {

  const cn = bem('CommentsList');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Комментарии ({items.length})</h2>
      <ul className={cn('list')}>
        {items.map(item => (
          <CommentItem
            item={item}
            key={item.value}
            children={children}
            onClick={onClick}
          />
        ))}
      </ul>
    </div>
  );
}

// CommentsList.propTypes = {
//   items: PropTypes.arrayOf(
//     PropTypes.shape({
//       key: PropTypes.number,
//       link: PropTypes.string,
//       title: PropTypes.string,
//     }),
//   ),
//   onNavigate: PropTypes.func,
// };

export default memo(CommentsList);