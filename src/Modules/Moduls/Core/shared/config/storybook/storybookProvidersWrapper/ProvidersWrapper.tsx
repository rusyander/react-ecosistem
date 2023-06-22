import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { type Preview } from '@storybook/react';
// import { StoreProvider2 } from 'Modules/Moduls/User/app/providers/StoreProvider/ui/StoreProvider2';

export const ProvidersWrapper: Preview = {
  decorators: [
    (Story) => (
      <Suspense fallback={''}>
        {/* <StoreProvider2> */}
        <BrowserRouter>
          {/* <div className={`'app' ${Theme.DARK}`}>
              <Story />
            </div> */}
          <Story />
        </BrowserRouter>
        {/* </StoreProvider2> */}
      </Suspense>
    ),
  ],
};
