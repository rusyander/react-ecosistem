import { Suspense } from 'react';
import { AppRouter } from './providers/router';

interface CoreAppProps {
  className?: string;
}

export const CoreApp = ({ className }: CoreAppProps) => {
  return (
    <Suspense fallback={''}>
      <div className="contentMargin">
        <AppRouter />
      </div>
    </Suspense>
  );
};
