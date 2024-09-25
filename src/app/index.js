import React, { useContext, useEffect, useState } from 'react';
import Basket from './basket';
import Main from './main';
import { StoreContext } from '../store/context';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ }) {

  const activeModal = useSelector(state => state.modals.name, 'App');


  return (
    <>
      <Main />
      {
        activeModal === 'basket' && <Basket />
      }
    </>
  );
}

export default App;
