import { Suspense, memo, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import {
  AppRoutePropsOs,
  routeConfigOs,
} from "../../../../shared/config/routeConfig/routeConfigOs";
import { PageLoader } from "Modules/UiKit";

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutePropsOs) => {
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

  return <Routes>{Object.values(routeConfigOs).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
