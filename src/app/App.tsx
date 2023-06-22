import { Suspense, useEffect, useState } from 'react';
import { useTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserActions,
  getUserInitedSelectors,
  getUserIsAuth,
} from 'entities/User';
import { classNames } from 'Modules/UiKit';
import { UserApp } from 'Modules/Moduls/Core';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ErrorPage } from 'pages/ErrorPage';

export default function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const initedUser = useSelector(getUserInitedSelectors);
  const isAuth = useSelector(getUserIsAuth);

  const [notFound, setNotFound] = useState(false);

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
              <div>
                <BrowserRouter>
                  <AppRouter />
                </BrowserRouter>

                <BrowserRouter>
                  <UserApp />
                </BrowserRouter>
              </div>
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
