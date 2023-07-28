import ReactDom from 'react-dom/client';
import App from './App';
import React from 'react';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDom.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
serviceWorker.unregister();
