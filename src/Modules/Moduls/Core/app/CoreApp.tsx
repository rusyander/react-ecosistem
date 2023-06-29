import { Suspense } from 'react';

import { AppRouter } from './providers/router';
import { StoreProviderCore } from './providers/StoreProvider';
import { Navbar } from '../widgets/Navbar';
import { BreadCrumbs } from 'Modules/UiKit';

interface CoreAppProps {
  logout: () => void;
}

export const CoreApp = ({ logout }: CoreAppProps) => {
  return (
    <StoreProviderCore>
      <Suspense fallback={''}>
        <div>
          <Navbar logout={logout} />
          <BreadCrumbs />
        </div>

        <div className="contentMargin">
          <AppRouter />
        </div>
      </Suspense>
    </StoreProviderCore>
  );
};
