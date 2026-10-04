import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './visuals.css';
import './air-visuals.css';
import './bio-visuals.css';
import './warming-visuals.css';
import './responsive-visuals.css';
import './conservation-visuals.css';
import './mobile-responsive.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
