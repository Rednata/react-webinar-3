import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsList({ items = [], children }) {
  console.log('items: ', items);

  const cn = bem('CommentsList');
  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Комментарии ({items.length})</h2>
      <ul className={cn('list')}>
        {items.map(item => (
          <li key={item.value} className={cn('item')} style={{marginLeft: (item.level-1)*30 + 'px'}}>
            <div className={cn('header')}>
              <span className={cn('author')}>{item.author.profile.name}</span>
              <span className={cn('date')}>{item.date}</span>
            </div>
            <div className={cn('body')}>
              {/* <div className='' style={{width: 100 + 'px'}}></div> */}
              <div className="" >{item.text}</div>
            </div>
            <div className={cn('footer')}>
              <button className={cn('btn')}>Ответить</button>
            </div>
          </li>
        ))}
      </ul>
      {children}
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