import { memo, useCallback } from 'react';
import cls from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, DropdownMenu, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { mutationLogout } from '../api/logout';
import { UserActions } from 'entities/User';

interface NavbarProps {
  className?: string;
  navbarData?: any;
}

export const Navbar = memo(({ className, navbarData }: NavbarProps) => {
  console.log('navbarData', navbarData);

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

  return (
    <header className={classNames(cls.navbar, {}, [className])}>
      <div className={cls.navigationLine}>
        <Link to="/">
          <Texts
            size="sizeS"
            title="Bisness Suite"
            className={cls.bisnessSuite}
          />
          <Texts
            size="sizeS"
            text={navbarData?.data?.userRoleInfo?.applicationName}
            className={cls.baseSuite}
          />
        </Link>
        <DropdownMenu menuItems={dropdownMenuData} />
      </div>
      <div onClick={logouts}>
        <Button theme="clear" className={cls.navigationLogout}>
          <div className={cls.logoutsInfo}>
            <Texts
              size="sizeS"
              title={t('Системный администратор')}
              className={cls.bisnessSuite}
            />
            <Texts
              size="sizeS"
              text={navbarData?.data?.userRoleInfo?.orgName}
              className={cls.baseSuite}
            />
          </div>
          <Icon className={cls.logoutIcon} icon="tabler:logout" />
        </Button>
      </div>
    </header>
  );
});
