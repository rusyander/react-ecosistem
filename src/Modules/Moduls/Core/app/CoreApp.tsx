import { Suspense } from 'react';

import { AppRouter } from './providers/router';
import { StoreProviderCore } from './providers/StoreProvider';
import { Navbar } from '../widgets/Navbar';
import { BreadCrumbs } from 'Modules/UiKit';

export const CoreApp = () => {
  return (
    <StoreProviderCore>
      <Suspense fallback={''}>
        <div>
          <Navbar />
          <BreadCrumbs />
        </div>

        <div className="contentMargin">
          <AppRouter />
        </div>
      </Suspense>
    </StoreProviderCore>
  );
};
