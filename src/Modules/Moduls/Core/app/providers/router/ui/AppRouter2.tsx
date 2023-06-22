import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
// import {
//   AppRouteProps2,
//   routeConfig2,
// } from 'shared/config/routeConfig/routeConfig2';
import { PageLoader } from 'widgets/PageLoader';
import { RequireAuth } from './RequireAuth';
import {
  AppRouteProps2,
  routeConfig2,
} from '../../../../shared/config/routeConfig/routeConfig2';

const AppRouter2 = () => {
  const renderWithWrapper = useCallback((route: AppRouteProps2) => {
    const element = (
      <Suspense fallback={<PageLoader />}>
        {/* <div className="page-wrapper">{route.element}</div> */}
        {route.element}
      </Suspense>
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

  return <Routes>{Object.values(routeConfig2).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter2);
