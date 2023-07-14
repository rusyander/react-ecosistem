import { Suspense } from 'react';

import { AppRouter } from './providers/router';
import { StoreProviderCore } from './providers/StoreProvider';

interface CoreAppProps {
  className?: string;
}

export const CoreApp = ({ className }: CoreAppProps) => {
  return (
    <StoreProviderCore>
      <Suspense fallback={''}>
        <div className="contentMargin">
          <AppRouter />
        </div>
      </Suspense>
    </StoreProviderCore>
  );
};
