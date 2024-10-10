import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentForm({value, onChange, onSubmit}) {
  const cn = bem('CommentForm');

  const callbacks = {
    onChange: (e) => onChange(e.target.value),
  }
  return (
    <form className={cn()} onSubmit={onSubmit}>
      <p className={cn('title')}>Новый комментарий</p>
        <textarea
          className={cn('textarea')}
          name="text"
          placeholder='Текст'
          value={value}
          onChange={callbacks.onChange}
        />
        
        <button className={cn('btn')} type='submit' >Отправить</button>
    </form>
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