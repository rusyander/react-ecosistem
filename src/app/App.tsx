import { Suspense, useEffect } from 'react';
import { useTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserActions,
  getUserInitedSelectors,
  getUserIsAuth,
} from 'entities/User';
import { classNames } from 'Modules/UiKit';
import { LoginPage } from 'pages/LoginPage';
import { MainPage } from 'pages/MainPage';

export default function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const initedUser = useSelector(getUserInitedSelectors);
  const isAuth = useSelector(getUserIsAuth);

  console.log(initedUser);

  useEffect(() => {
    dispatch(UserActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={''}>
        {/* {isAuth && <LoginPage />} */}
        <>
          {/* {!isAuth && ( */}
          <div>
            {/* <Navbar /> */}

            <div className="content-page">
              <Sidebar />
              <AppRouter />
              {/* <MainPage /> */}
              {/* {initedUser && <MainPage />} */}
            </div>
          </div>
          {/* )} */}
        </>
      </Suspense>
    </div>
  );
}
