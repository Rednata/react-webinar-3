import React from 'react';
import Basket from './basket';
import Main from './main';


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const state = store.getState();
  console.log('state: ', state);

  return (
    <>
      <Main store={store} />
      {
        state.modals.name === 'basket' && <Basket store={store}/>
      }
    </>
  );
}

export default App;
