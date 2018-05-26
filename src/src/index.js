import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
//import './bootstrap.min.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from 'react-router-dom';



ReactDOM.render((
    <HashRouter>
    <App />
    </HashRouter>
), document.getElementById('root'));
registerServiceWorker();