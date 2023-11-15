import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import './css/components/styles.css'


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);