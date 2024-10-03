import { memo, useState } from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function InputForm({ data, onHandleChange }) {

  const cn = bem('InputForm')
  return (
    <div className={cn()}>
      <label htmlFor={data.id} className={cn('label')}>{data.label}</label>
      <input
        className={cn('input')}
        onChange={onHandleChange}
        type={data.type}
        name={data.name}
        id={data.id}
      />

    </div>
  )
}

export default memo(InputForm);
