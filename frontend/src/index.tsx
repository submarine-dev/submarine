import { ProviderRoot } from '@/providers/ProviderRoot';
import { RouterInstance } from '@/router/RouterInstance';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ProviderRoot>
        <RouterInstance />
      </ProviderRoot>
    </React.StrictMode>
  );
}
