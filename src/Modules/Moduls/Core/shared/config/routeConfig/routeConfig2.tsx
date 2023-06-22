import { ErrorPage } from 'pages/ErrorPage';
import { UserPage } from '../../../pages/UserPage';
// import { UserPage } from 'pages/UserPage';
import { type RouteProps } from 'react-router-dom';

export type AppRouteProps2 = RouteProps & {
  authOnly?: boolean;
};

export enum AppRoute {
  USER = 'user',
  // ABOUT = 'about',
  // PROFILE = 'profile',
  // ARTICLES = 'article',
  // ARTICLE_DETAILS = 'article_details',

  Not_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoute, string> = {
  [AppRoute.USER]: '/user',
  // [AppRoute.ABOUT]: '/about',
  // [AppRoute.PROFILE]: '/profile/', // + id
  // [AppRoute.ARTICLES]: '/articles',
  // [AppRoute.ARTICLE_DETAILS]: '/articles/', // + id
  [AppRoute.Not_FOUND]: '/*',
};

export const routeConfig2: Record<AppRoute, AppRouteProps2> = {
  [AppRoute.USER]: {
    path: RoutePath.user,
    element: <UserPage />,
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
