
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import {
  redirectLegacyBasePath,
  redirectLegacyHashUrl,
} from './services/legacyUrlService';

if (!redirectLegacyBasePath()) {
  redirectLegacyHashUrl();

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
