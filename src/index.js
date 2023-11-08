import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // App 컴포넌트의 경로를 확인해주세요.
import './css/styles.css'; // CSS 파일의 경로를 확인해주세요.

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
