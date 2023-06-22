import ReactDom from 'react-dom/client';
import App from './App';
import React from 'react';
import * as serviceWorker from './serviceWorker';


const root = ReactDom.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
serviceWorker.unregister();

