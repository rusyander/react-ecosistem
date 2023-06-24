import ReactDOM from 'react-dom/client';
import App from './app/App';
import './shared/config/i18n/i18n';
import './app/styles/index.scss';
// eslint-disable-next-line
import Symbol_observable from 'symbol-observable';

import { ThemeProvider } from 'app/providers/ThemeProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { StoreProvider } from 'app/providers/StoreProvider';
import { BrowserRouter } from 'react-router-dom';
import { StoreProviderCore } from 'Modules/Moduls/Core/app/providers/StoreProvider';
import { combineReducers } from '@reduxjs/toolkit';

console.info('Symbol_observable', Symbol_observable);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div>
    <BrowserRouter>
      <StoreProvider>
        {/* <StoreProviderCore> */}
        <ErrorBoundary>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ErrorBoundary>
        {/* </StoreProviderCore> */}
      </StoreProvider>
    </BrowserRouter>
  </div>
);
