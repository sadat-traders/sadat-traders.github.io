import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { VisitorProvider } from './context/VisitorContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <VisitorProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </VisitorProvider>
    </HashRouter>
  </React.StrictMode>
);
