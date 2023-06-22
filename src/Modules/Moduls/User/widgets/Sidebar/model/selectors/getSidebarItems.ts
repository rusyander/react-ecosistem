import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { SidebarItemType } from '../types/sidebar';
import MainIcon from 'shared/assets/icons/Main.svg';
import AboutIcon from 'shared/assets/icons/About.svg';
import ProfileIcon from 'shared/assets/icons/Profile.svg';
import ArticleIcon from 'shared/assets/icons/article.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userAuthData) => {
    const sidebarItems: SidebarItemType[] = [
      {
        path: RoutePath.main,
        Icon: MainIcon,
        text: 'Главная',
      },

      // {
      //   path: RoutePath.about,
      //   Icon: AboutIcon,
      //   text: 'О сайте',
      // },
    ];

    // if (userAuthData) {
    //   sidebarItems.push(
    //     {
    //       path: RoutePath.profile + userAuthData?.id,
    //       Icon: ProfileIcon,
    //       text: 'profile',
    //       authOnly: true,
    //     },

    //     {
    //       path: RoutePath.article,
    //       Icon: ArticleIcon,
    //       text: 'Статьи',
    //       authOnly: true,
    //     }
    //   );
    // }
    return sidebarItems;
  }
);
