import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ShoppingCart from './Components/ShoppingCart';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ShoppingCart />, document.getElementById('app'));
registerServiceWorker();
