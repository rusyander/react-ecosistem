import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { type Preview } from '@storybook/react';
import { StoreProvider } from '../../../../app/providers/StoreProvider/ui/StoreProvider';

export const ProvidersWrapper: Preview = {
  decorators: [
    (Story) => (
      <Suspense fallback={''}>
        <StoreProvider>
          <BrowserRouter>
            {/* <div className={`'app' ${Theme.DARK}`}> */}
            <div>
              <Story />
            </div>
            <Story />
          </BrowserRouter>
        </StoreProvider>
      </Suspense>
    ),
  ],
};
