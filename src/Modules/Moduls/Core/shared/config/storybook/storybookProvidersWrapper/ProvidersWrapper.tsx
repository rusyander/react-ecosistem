import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { type Preview } from '@storybook/react';
import { StoreProviderCore } from '../../../../app/providers/StoreProvider/ui/StoreProviderCore';

export const ProvidersWrapper: Preview = {
  decorators: [
    (Story) => (
      <Suspense fallback={''}>
        <StoreProviderCore>
          <BrowserRouter>
            {/* <div className={`'app' ${Theme.DARK}`}> */}
            <div>
              <Story />
            </div>
            <Story />
          </BrowserRouter>
        </StoreProviderCore>
      </Suspense>
    ),
  ],
};
