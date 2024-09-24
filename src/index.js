import React from 'react';
import { createRoot } from 'react-dom/client';
import { generateCode } from './utils.js';

import Store from './store/index.js';
import App from './app/index.js';
// import { store } from './store/instance.js';

const store = new Store({});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
