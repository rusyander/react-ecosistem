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

console.info('', Symbol_observable);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div>
    <BrowserRouter>
      <StoreProvider>
        <ErrorBoundary>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ErrorBoundary>
      </StoreProvider>
    </BrowserRouter>
  </div>
);
