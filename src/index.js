import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CurrContext from './Contexts/CurrCont';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CurrContext>
        <App />
    </CurrContext>
);
