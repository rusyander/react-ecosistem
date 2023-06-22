import { FC, Suspense } from 'react';
import { StoreProvider } from '../../../../app/providers/StoreProvider';
import { BrowserRouter } from 'react-router-dom';
import { Theme } from '../../../../app/providers/ThemeProvider';
import { type Preview } from '@storybook/react';

export const ProvidersWrapper: Preview = {
  decorators: [
    (Story) => (
      <Suspense fallback={''}>
        <StoreProvider>
          <BrowserRouter>
            <div className={`'app' ${Theme.DARK}`}>
              <Story />
            </div>
          </BrowserRouter>
        </StoreProvider>
      </Suspense>
    ),
  ],
};
