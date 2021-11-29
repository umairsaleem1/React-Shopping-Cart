import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import CartProvider from './Context/CartProvider';

ReactDOM.render(
  <CartProvider>
    <App/>
  </CartProvider>
  ,
  document.getElementById('root')
);