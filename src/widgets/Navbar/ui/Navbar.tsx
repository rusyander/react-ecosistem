import { memo, useCallback, useState } from 'react';
import cls from './Navbar.module.scss';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions, getUserAuthData } from 'entities/User';
import { Button, classNames } from 'Modules/UiKit';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const [t] = useTranslation();
  // const [isAuthModal, setIsAuthModal] = useState(false);
  // const authData = useSelector(getUserAuthData);
  // const dispatch = useDispatch();

  // const onOpenModal = useCallback(() => {
  //   setIsAuthModal(true);
  // }, [setIsAuthModal]);

  // const onLogout = useCallback(() => {
  //   dispatch(UserActions.logout());
  // }, [dispatch]);

  // if (authData) {
  //   return (
  //     <header className={classNames(cls.navbar, {}, [className])}>
  //       <Button theme="clearInvert" onClick={onLogout}>
  //         {t('Выйти')}
  //       </Button>
  //     </header>
  //   );
  // }

  return (
    <header className={classNames(cls.navbar, {}, [className])}>
      {/* <Button theme="clearInvert" onClick={onOpenModal}>
        {t('Войти')}
      </Button> */}
      asdas
    </header>
  );
});
