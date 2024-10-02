import { memo } from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileCard(props) {

  const cn = bem('ProfileCard')

  return (
    <div className={cn()}>
      <div className={cn('prop')}>
        <div className={cn('label')}>Имя: </div>
        <div className={cn('value')}>{props.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Телефон: </div>
        <div className={cn('value')}>{props.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email: </div>
        <div className={cn('value')}>{props.email}</div>
      </div>
      
    </div>
    
  )
}


export default memo(ProfileCard);