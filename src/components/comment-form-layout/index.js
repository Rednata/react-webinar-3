import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentFormLayout({title, padding, value, onSubmit, onChange, children }) {
  const cn = bem('CommentFormLayout');

  const callbacks = {
    onChange: (e) => onChange(e.target.value),
  }
  return (
    <div className={cn({padding})}>
      <p className={cn('title')}>{title}</p>
      <form className={cn('form')} onSubmit={onSubmit} id='form-comment'>
        <textarea
          className={cn('textarea')}
          name="text"
          placeholder='Текст'
          value={value}
          onChange={callbacks.onChange} />
      </form>
      <div className={cn('btns')}>
        {children}
      </div>
    </div>

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

export default memo(CommentFormLayout);