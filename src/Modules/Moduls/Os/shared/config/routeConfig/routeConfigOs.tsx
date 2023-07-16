import { ErrorPage } from "../../../pages/ErrorPage";
import { type RouteProps } from "react-router-dom";
import { OS_ORG_STRUCTURE } from "../../../pages/OS_ORG_STRUCTURE";
import { OS_POPULATED_LOCALITIES } from "../../../pages/OS_POPULATED_LOCALITIES";
import { OS_REGIONS } from "../../../pages/OS_REGIONS";
import { OS_SUBREGIONS } from "../../../pages/OS_SUBREGIONS";
import { OS_COUNTRIES } from "../../../pages/OS_COUNTRIES";

import Main from "../../../pages/Main/Main";

export type AppRoutePropsOs = RouteProps & {
  authOnly?: boolean;
};

export enum AppRoute {
  OS_REGIONS = "OS_REGIONS",
  OS_SUBREGIONS = "OS_SUBREGIONS",
  OS_ORG_STRUCTURE = "OS_ORG_STRUCTURE",
  OS_COUNTRIES = "OS_COUNTRIES",
  OS_POPULATED_LOCALITIES = "OS_POPULATED_LOCALITIES",
  MAIN = "main",

  Not_FOUND = "not_found",
}

export const RoutePath: Record<AppRoute, string> = {
  [AppRoute.MAIN]: "/",
  [AppRoute.OS_REGIONS]: "/OS_REGIONS",
  [AppRoute.OS_POPULATED_LOCALITIES]: "/OS_POPULATED_LOCALITIES",
  [AppRoute.OS_SUBREGIONS]: "/OS_SUBREGIONS",
  [AppRoute.OS_ORG_STRUCTURE]: "/OS_ORG_STRUCTURE",
  [AppRoute.OS_COUNTRIES]: "/OS_COUNTRIES",

  [AppRoute.Not_FOUND]: "*",
};

export const routeConfigOs: Record<AppRoute, AppRoutePropsOs> = {
  [AppRoute.MAIN]: {
    path: RoutePath.main,
    element: <Main />,
    authOnly: true,
  },
  [AppRoute.OS_REGIONS]: {
    path: RoutePath.OS_REGIONS,
    element: <OS_REGIONS />,
    authOnly: true,
  },
  [AppRoute.OS_POPULATED_LOCALITIES]: {
    path: RoutePath.OS_POPULATED_LOCALITIES,
    element: <OS_POPULATED_LOCALITIES />,
    authOnly: true,
  },

  [AppRoute.OS_SUBREGIONS]: {
    path: RoutePath.OS_SUBREGIONS,
    element: <OS_SUBREGIONS />,
    authOnly: true,
  },
  [AppRoute.OS_ORG_STRUCTURE]: {
    path: RoutePath.OS_ORG_STRUCTURE,
    element: <OS_ORG_STRUCTURE />,
    authOnly: true,
  },
  [AppRoute.OS_COUNTRIES]: {
    path: RoutePath.OS_COUNTRIES,
    element: <OS_COUNTRIES />,
    authOnly: true,
  },

  [AppRoute.Not_FOUND]: {
    path: RoutePath.not_found,
    element: <ErrorPage />,
  },
};
