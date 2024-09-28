import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function ControlLang() {
  const cn = bem('ControlLang');

  const store = useStore();
  const select = useSelector(state => ({
      lang: state.catalog.lang
    }));

  const handleChangeLang = () => {
    select.lang === 'RU' ? store.actions.catalog.changeLang('EN') : store.actions.catalog.changeLang('RU')
  }

  return (
    <div className={cn()}>
      <button className="" onClick={handleChangeLang}>{select.lang}</button>
    </div>
  )
}

export default React.memo(ControlLang);
