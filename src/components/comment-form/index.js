import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentForm() {
  const cn = bem('CommentForm');

  return (
    <form className={cn()}>
      <p className={cn('title')}>Новый комментарий</p>
      {/* <form className={cn('form')}> */}
        <textarea className={cn('textarea')} name="" placeholder='Текст'>

        </textarea>
        <button className={cn('btn')} type='submit'>Отправить</button>
    </form>
    // </form>
  );
}

// CommentForm.propTypes = {
//   items: PropTypes.arrayOf(
//     PropTypes.shape({
//       key: PropTypes.number,
//       link: PropTypes.string,
//       title: PropTypes.string,
//     }),
//   ),
//   onNavigate: PropTypes.func,
// };

export default memo(CommentForm);