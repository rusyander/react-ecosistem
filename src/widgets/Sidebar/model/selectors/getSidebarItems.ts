import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userAuthData) => {
    const sidebarItems: SidebarItemType[] = [
      // {
      //   path: RoutePath.main,
      //   Icon: MainIcon,
      //   text: 'Главная',
      // },
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
