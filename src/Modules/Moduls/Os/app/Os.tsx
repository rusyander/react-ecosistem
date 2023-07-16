import { Suspense } from 'react';

import { AppRouter } from './providers/router';
import { StoreProviderOs } from './providers/StoreProvider';

interface OsProps {
  className?: string;
}

export const Os = ({ className }: OsProps) => {
  return (
    <StoreProviderOs>
      <Suspense fallback={''}>
        <div className="contentMargin">
          <h1>OS</h1>
          <AppRouter />
        </div>
      </Suspense>
    </StoreProviderOs>
  );
};