import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentItem({ item, children, onClick }) {
  const cn = bem('CommentItem');

  const callbacks = {
    onClick: () => onClick(item)
  }

  return (
    <li className={cn('item')} style={{marginLeft: (item.level-1)*30 + 'px'}}>
      <div className={cn('header')}>
        <span className={cn('author')}>{item.author.profile.name}</span>
        <span className={cn('date')}>{item.date}</span>
      </div>
      <div className={cn('body')}>
        <div className="" >{item.text}</div>
      </div>
      <div className={cn('footer')}>
        <button
          className={cn('btn')}
          onClick={callbacks.onClick}
        >Ответить</button>
        {item.showAnsqwer && children}
      </div>

    </li>
  )
}

export default memo(CommentItem)