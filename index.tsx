import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Monitor Core Web Vitals
if (import.meta.env.MODE === 'production') {
  (async () => {
    const { onCLS, onFID, onFCP, onLCP, onTTFB } = await import('web-vitals');
    onCLS(console.log);
    onFID?.(console.log);
    onFCP(console.log);
    onLCP(console.log);
    onTTFB(console.log);
  })();
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);