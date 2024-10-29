// src/index.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import '../src/styles/GlobalStyles.scss';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container); // Create a root.
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element.');
}
