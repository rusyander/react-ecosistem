import { ErrorPage } from '../../../pages/ErrorPage';
import { UserPage } from '../../../pages/UserPage';
import { type RouteProps } from 'react-router-dom';
import { CORE_AUDIT_ACTIONS } from 'Modules/Moduls/Core/pages/CORE_AUDIT_ACTIONS';
import { CORE_AUDIT_FORMS } from 'Modules/Moduls/Core/pages/CORE_AUDIT_FORMS';
import { CORE_AUDIT_LOGIN } from 'Modules/Moduls/Core/pages/CORE_AUDIT_LOGIN';
import { CORE_AUDIT_SESSIONS } from 'Modules/Moduls/Core/pages/CORE_AUDIT_SESSIONS';
import { CORE_ROLES } from 'Modules/Moduls/Core/pages/CORE_ROLES';
import { CORE_SCHEDULER_ADMIN } from 'Modules/Moduls/Core/pages/CORE_SCHEDULER_ADMIN';
import { CORE_SCHEDULER_TASKS } from 'Modules/Moduls/Core/pages/CORE_SCHEDULER_TASKS';
import { CORE_SCHED_TASKS } from 'Modules/Moduls/Core/pages/CORE_SCHED_TASKS';
import { CORE_SET_FORM_ACTION_AUDIT } from 'Modules/Moduls/Core/pages/CORE_SET_FORM_ACTION_AUDIT';
import { CORE_SYS_PARAMS } from 'Modules/Moduls/Core/pages/CORE_SYS_PARAMS';
import { CORE_USERS } from 'Modules/Moduls/Core/pages/CORE_USERS';
import Main from '../../../pages/Main/Main';

export type AppRoutePropsCore = RouteProps & {
  authOnly?: boolean;
};

export enum AppRoute {
  MAIN = 'main',
  USER = 'user',
  CORE_AUDIT_LOGIN = 'CORE_AUDIT_LOGIN',
  CORE_AUDIT_FORMS = 'CORE_AUDIT_FORMS',
  CORE_AUDIT_ACTIONS = 'CORE_AUDIT_ACTIONS',
  CORE_AUDIT_SESSIONS = 'CORE_AUDIT_SESSIONS',
  CORE_SET_FORM_ACTION_AUDIT = 'CORE_SET_FORM_ACTION_AUDIT',
  CORE_SYS_PARAMS = 'CORE_SYS_PARAMS',
  CORE_SCHEDULER_ADMIN = 'CORE_SCHEDULER_ADMIN',
  CORE_USERS = 'CORE_USERS',
  CORE_SCHED_TASKS = 'CORE_SCHED_TASKS',
  CORE_ROLES = 'CORE_ROLES',
  CORE_SCHEDULER_TASKS = 'CORE_SCHEDULER_TASKS',

  Not_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoute, string> = {
  [AppRoute.MAIN]: '/',
  [AppRoute.USER]: '/user',
  [AppRoute.CORE_AUDIT_LOGIN]: '/CORE_AUDIT_LOGIN',
  [AppRoute.CORE_AUDIT_FORMS]: '/CORE_AUDIT_FORMS',
  [AppRoute.CORE_AUDIT_ACTIONS]: '/CORE_AUDIT_ACTIONS',
  [AppRoute.CORE_AUDIT_SESSIONS]: '/CORE_AUDIT_SESSIONS',
  [AppRoute.CORE_SET_FORM_ACTION_AUDIT]: '/CORE_SET_FORM_ACTION_AUDIT',
  [AppRoute.CORE_SYS_PARAMS]: '/CORE_SYS_PARAMS',
  [AppRoute.CORE_SCHEDULER_ADMIN]: '/CORE_SCHEDULER_ADMIN',
  [AppRoute.CORE_USERS]: '/CORE_USERS',
  [AppRoute.CORE_SCHED_TASKS]: '/CORE_SCHED_TASKS',
  [AppRoute.CORE_ROLES]: '/CORE_ROLES',
  [AppRoute.CORE_SCHEDULER_TASKS]: '/CORE_SCHEDULER_TASKS',

  [AppRoute.Not_FOUND]: '*',
};

export const routeConfigCore: Record<AppRoute, AppRoutePropsCore> = {
  [AppRoute.MAIN]: {
    path: RoutePath.main,
    element: <Main />,
    authOnly: true,
  },

  [AppRoute.USER]: {
    path: RoutePath.user,
    element: <UserPage />,
    authOnly: true,
  },
  [AppRoute.CORE_AUDIT_LOGIN]: {
    path: RoutePath.CORE_AUDIT_LOGIN,
    element: <CORE_AUDIT_LOGIN />,
    authOnly: true,
  },
  [AppRoute.CORE_AUDIT_FORMS]: {
    path: RoutePath.CORE_AUDIT_FORMS,
    element: <CORE_AUDIT_FORMS />,
    authOnly: true,
  },
  [AppRoute.CORE_AUDIT_ACTIONS]: {
    path: RoutePath.CORE_AUDIT_ACTIONS,
    element: <CORE_AUDIT_ACTIONS />,
    authOnly: true,
  },
  [AppRoute.CORE_AUDIT_SESSIONS]: {
    path: RoutePath.CORE_AUDIT_SESSIONS,
    element: <CORE_AUDIT_SESSIONS />,
    authOnly: true,
  },
  [AppRoute.CORE_SET_FORM_ACTION_AUDIT]: {
    path: RoutePath.CORE_SET_FORM_ACTION_AUDIT,
    element: <CORE_SET_FORM_ACTION_AUDIT />,
    authOnly: true,
  },
  [AppRoute.CORE_SYS_PARAMS]: {
    path: RoutePath.CORE_SYS_PARAMS,
    element: <CORE_SYS_PARAMS />,
    authOnly: true,
  },
  [AppRoute.CORE_SCHEDULER_ADMIN]: {
    path: RoutePath.CORE_SCHEDULER_ADMIN,
    element: <CORE_SCHEDULER_ADMIN />,
    authOnly: true,
  },
  [AppRoute.CORE_USERS]: {
    path: RoutePath.CORE_USERS,
    element: <CORE_USERS />,
    authOnly: true,
  },
  [AppRoute.CORE_SCHED_TASKS]: {
    path: RoutePath.CORE_SCHED_TASKS,
    element: <CORE_SCHED_TASKS />,
    authOnly: true,
  },
  [AppRoute.CORE_ROLES]: {
    path: RoutePath.CORE_ROLES,
    element: <CORE_ROLES />,
    authOnly: true,
  },
  [AppRoute.CORE_SCHEDULER_TASKS]: {
    path: RoutePath.CORE_SCHEDULER_TASKS,
    element: <CORE_SCHEDULER_TASKS />,
    authOnly: true,
  },

  [AppRoute.Not_FOUND]: {
    path: RoutePath.not_found,
    element: <ErrorPage />,
  },
};
