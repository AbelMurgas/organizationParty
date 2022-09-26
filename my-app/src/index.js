// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './component/App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

