import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
import { EarthoOneProvider } from '@eartho/one-client-react';
root.render(
  <StrictMode>
    <EarthoOneProvider clientId="TM0RDLKzk7fncWCdFnU1">
      <App />
    </EarthoOneProvider>
  </StrictMode>
);
