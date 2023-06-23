import { Suspense, useEffect } from 'react';

import { AppRouter } from './providers/router';
import { useDispatch } from 'react-redux';
import { StoreProvider } from './providers/StoreProvider';
import { Navbar } from '../widgets/Navbar';
import { BreadCrumbs, StoreProviderUiKit } from 'Modules/UiKit';

export const UserApp = () => {
  const dispatch = useDispatch();

  return (
    // <StoreProviderUiKit>
    <StoreProvider>
      <Suspense fallback={''}>
        <div className="navBatHeight">
          <Navbar />
          <BreadCrumbs />
        </div>

        <div className="contentMargin">
          <AppRouter />
        </div>
      </Suspense>
    </StoreProvider>
    // </StoreProviderUiKit>
  );
};
