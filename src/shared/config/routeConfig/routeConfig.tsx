import { ErrorPage } from 'pages/ErrorPage';
import { LoginPage } from 'pages/LoginPage';
import { MainPage } from 'pages/MainPage';
import { type RouteProps } from 'react-router-dom';

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
};

export enum AppRoute {
  MAIN = 'main',
  LOGIN = 'login',
  // ABOUT = 'about',
  // PROFILE = 'profile',
  // ARTICLES = 'article',
  // ARTICLE_DETAILS = 'article_details',

  Not_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoute, string> = {
  [AppRoute.MAIN]: '/',
  [AppRoute.LOGIN]: '/login',
  // [AppRoute.ABOUT]: '/about',
  // [AppRoute.PROFILE]: '/profile/', // + id
  // [AppRoute.ARTICLES]: '/articles',
  // [AppRoute.ARTICLE_DETAILS]: '/articles/', // + id
  [AppRoute.Not_FOUND]: '*',
};

export const routeConfig: Record<AppRoute, AppRouteProps> = {
  [AppRoute.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
    authOnly: true,
  },
  [AppRoute.LOGIN]: {
    path: RoutePath.login,
    element: <LoginPage />,
    authOnly: false,
  },
  // [AppRoute.ABOUT]: {
  //   path: RoutePath.about,
  //   element: <AboutPage />,
  // },
  // [AppRoute.PROFILE]: {
  //   // path: RoutePath.profile,
  //   path: `${RoutePath.profile}:id`,
  //   element: <ProfilePage />,
  //   authOnly: true,
  // },
  // [AppRoute.ARTICLES]: {
  //   path: RoutePath.article,
  //   element: <ArticlePage />,
  //   authOnly: true,
  // },
  // [AppRoute.ARTICLE_DETAILS]: {
  //   path: `${RoutePath.article_details}:id`,
  //   element: <ArticleDetailsPage />,
  //   authOnly: true,
  // },
  [AppRoute.Not_FOUND]: {
    path: RoutePath.not_found,
    element: <ErrorPage />,
  },
};
