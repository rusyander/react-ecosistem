import { Suspense, useCallback, useEffect, useState } from 'react';
import { useTheme } from './providers/ThemeProvider';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserActions,
  getUserAuthData,
  getUserInitedSelectors,
  getUserIsAuth,
} from 'entities/User';
import { CoreApp } from 'Modules/Moduls/Core';
import { LoginPage } from 'pages/LoginPage';
import { classNames } from 'Modules/UiKit';

export default function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const initedUser = useSelector(getUserInitedSelectors);
  const isAuth = useSelector(getUserIsAuth);

  // const [userData, setUserData] = useState(localStorage.getItem('user'));

  const userData = useSelector(getUserAuthData);
  console.log(userData);

  useEffect(() => {
    dispatch(UserActions.initAuthData());
  }, [dispatch]);

  const logout = useCallback(() => {
    console.log('asd');

    dispatch(UserActions.logout());
  }, [dispatch]);

  // if (!isAuth) {
  //   return <LoginPage />;
  // }
  if (!userData) {
    return <LoginPage />;
  }

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={''}>
        {userData && (
          <>
            <Sidebar />
            <CoreApp logout={logout} />
          </>
        )}
      </Suspense>
    </div>
  );
}
