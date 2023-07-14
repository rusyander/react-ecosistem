import { memo, useCallback, useState } from 'react';
import cls from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, DropdownMenu, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { mutationLogout } from '../api/logout';
import { getInitialDataList } from '../../../pages/MainPage/api/getInitialData';
import { UserActions } from 'entities/User';

interface NavbarProps {
  className?: string;
  navbarData?: any;
}

export const Navbar = memo(({ className, navbarData }: NavbarProps) => {
  const [t] = useTranslation();

  const dispatch = useDispatch();
  const [logout] = mutationLogout();

  const logouts = useCallback(() => {
    logout('');
    dispatch(UserActions.logout());
  }, [dispatch, logout]);

  const dropdownMenuData =
    navbarData?.data?.menu !== undefined
      ? JSON.parse(navbarData?.data?.menu)
      : [];

  console.log(
    'navbarData?.userRoleInfo?.applicationName',
    navbarData?.data?.userRoleInfo?.applicationName
  );

  return (
    <header className={classNames(cls.navbar, {}, [className])}>
      <div className={cls.navigationLine}>
        <Link to="/">
          <p className={cls.bisnessSuite}>Bisness Suite </p>
          <p className={cls.baseSuite}>
            {navbarData?.data?.userRoleInfo?.applicationName}
          </p>
          {/* <Texts
            size="sizeS"
            title="Bisness Suite"
            className={cls.bisnessSuite}
          />
          <Texts
            size="sizeS"
            title="Базовый функционал"
            className={cls.baseSuite}
          /> */}
        </Link>
        <DropdownMenu menuItems={dropdownMenuData} />
      </div>
      <div onClick={logouts}>
        <Button theme="clear" className={cls.navigationLogout}>
          <div className={cls.logoutsInfo}>
            <p className={cls.bisnessSuite}>
              {/* {navbarData?.userRoleInfo?.userRoleName} */}
              {t('Системный администратор')}
            </p>
            <p className={cls.baseSuite}>
              {navbarData?.data?.userRoleInfo?.orgName}
            </p>
          </div>
          <Icon className={cls.logoutIcon} icon="tabler:logout" />
        </Button>
      </div>
    </header>
  );
});
