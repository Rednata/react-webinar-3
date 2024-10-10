import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import { useNavigate } from 'react-router-dom';
import './style.css';

function NonAuth() {
  const cn = bem('NonAuth');
  const navigate = useNavigate();

  const onClick = (e) => {
    e.preventDefault();
    navigate('/login', { state: { back: location.pathname } })
  }

  return (
    <div className={cn()}>
      <a onClick={onClick}
        className={cn('link')}
      >Войдите</a>
      <span>, чтобы иметь возможность комментировать</span>
    </div>
  );
}

export default memo(NonAuth);
