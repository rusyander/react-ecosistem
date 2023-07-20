import { memo, useCallback } from 'react';
import cls from './Navbar.module.scss';
import { Button, DropdownMenu, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { mutationLogout } from '../api/logout';
import { UserActions } from 'entities/User';
import { InitDataTypes } from 'shared/types/ititType';

interface NavbarProps {
  className?: string;
  navbarData?: InitDataTypes;
}

export const Navbar = memo(({ className, navbarData }: NavbarProps) => {
  const dispatch = useDispatch();
  const [logout] = mutationLogout();
  const navigate = useNavigate();

  const logouts = useCallback(() => {
    logout('');
    dispatch(UserActions.logout());
    navigate('/');
  }, [dispatch, logout, navigate]);

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
              text={navbarData?.data?.userRoleInfo?.userRoleName}
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
