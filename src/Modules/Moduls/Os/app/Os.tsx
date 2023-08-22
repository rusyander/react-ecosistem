import { Suspense } from 'react';
import { AppRouter } from './providers/router';

interface OsProps {
  className?: string;
}

export const Os = ({ className }: OsProps) => {
  return (
    <Suspense fallback={''}>
      <div className="contentMargin">
        <AppRouter />
      </div>
    </Suspense>
  );
};
