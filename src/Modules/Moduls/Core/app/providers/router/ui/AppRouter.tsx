import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './RequireAuth';
import {
  AppRoutePropsCore,
  routeConfigCore,
} from '../../../../shared/config/routeConfig/routeConfigCore';
import { PageLoader } from 'Modules/UiKit';

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutePropsCore) => {
    const element = (
      <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
        }
      />
    );
  }, []);

  return (
    <Routes>{Object.values(routeConfigCore).map(renderWithWrapper)}</Routes>
  );
};

export default memo(AppRouter);
