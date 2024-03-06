import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'helpers/initFA';
import Main from 'Main';

const container = document.getElementById('main') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Main>
      <App />
    </Main>
  </React.StrictMode>
);
