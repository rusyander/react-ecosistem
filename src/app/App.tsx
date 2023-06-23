import { Suspense, useEffect } from 'react';
import { useTheme } from './providers/ThemeProvider';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserActions,
  getUserInitedSelectors,
  getUserIsAuth,
} from 'entities/User';
import { classNames } from 'Modules/UiKit';
import { UserApp } from 'Modules/Moduls/Core';
import { LoginPage } from 'pages/LoginPage';

export default function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const initedUser = useSelector(getUserInitedSelectors);
  const isAuth = useSelector(getUserIsAuth);

  console.log(initedUser);

  useEffect(() => {
    dispatch(UserActions.initAuthData());
  }, [dispatch]);

  if (!isAuth) {
    return <LoginPage />;
  }
  // if (isAuth) {
  //   novigate('/user');
  // }

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={''}>
        <>
          {/* {!isAuth && ( */}
          <div>
            {/* <Navbar /> */}

            <div className="content-page">
              <Sidebar />
              <div>
                {/* <BrowserRouter>
                  <AppRouter />
                </BrowserRouter> */}

                {/* <BrowserRouter> */}
                <UserApp />
                {/* </BrowserRouter> */}
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
