import { memo, useState } from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import InputForm from "../input-form";

function Form({ inputData, formData, error, onHandleSubmit }) {

  const [data, setData]= useState(formData);

  const callbacks = {
    onHandleSubmit: (e) => {
      e.preventDefault();
      onHandleSubmit(data);
      e.target.reset();
    }
  }

  const onHandleChange = ({target}) => {
    setData(prevState => ({...prevState, [target.name]: target.value}))
  }

  const cn = bem('Form')
  return (
    <div className={cn({size: 'small'})}>
      <form className={cn('form')} onSubmit={callbacks.onHandleSubmit}>
        <fieldset className={cn('fieldset')}>
          <legend className={cn('title')}>Вход</legend>
            {
              inputData.map(
                input => (<InputForm key={input.id} data={input} onHandleChange={onHandleChange} />))
            }
            {
              error && <p className={cn('error')}>{error}</p>
            }
          <button className={cn('btn', {size: 'small'})}>Войти</button>
        </fieldset>
      </form>
    </div>
  )
}

export default memo(Form);
