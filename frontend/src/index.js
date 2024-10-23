import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';  // Corrected import path

// Get the root element from the HTML
const container = document.getElementById('root');

// Ensure the element exists before creating root
if (!container) {
  throw new Error(
    'Failed to find the root element. Make sure there is a <div id="root"></div> in your HTML file.'
  );
}

// Create root and render app
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);