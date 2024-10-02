import { memo, useState } from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Form({ onHandleSubmit }) {

  const [data, setData]= useState({login: '', password: ''});

  const callbacks = {
    onHandleSubmit: (e) => {
      e.preventDefault();
      onHandleSubmit(data);
      e.target.reset();
    }
  }

  const onHandleChange = ({target}) => {
    if (target.name === 'login') {
    setData(prevData => ({...prevData, login: target.value}))
    } else {
      setData(prevData => ({...prevData, password: target.value}))
    }
  }

  const cn = bem('Form')
  return (
    <div className={cn()}>
      <form className={cn('form')} onSubmit={callbacks.onHandleSubmit}>
        <fieldset className={cn('fieldset')}>
          <legend className={cn('title')}>Вход</legend>
          <div className={cn('item')}>
            <label className={cn('label')}>Логин
              <input onChange={onHandleChange} type="text" className={cn('input')} name='login'/>
            </label>
          </div>

          <div className={cn('item')}>
            <label className={cn('label')}>Пароль
              <input onChange={onHandleChange} type="password" className={cn('input')} name='password'/>
            </label>
          </div>
        </fieldset>
        <button className={cn('btn')}>Войти</button>
      </form>
    </div>
  )
}

export default memo(Form);
