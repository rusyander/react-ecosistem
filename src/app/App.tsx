import { Suspense, useEffect } from 'react';
import { useTheme } from './providers/ThemeProvider';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserActions,
  getUserAuthData,
  getUserInitedSelectors,
  getUserIsAuth,
} from 'entities/User';
import { LoginPage } from 'pages/LoginPage';
import { classNames } from 'Modules/UiKit';
import { MainPage } from 'pages/MainPage';

export default function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const isAuth = useSelector(getUserIsAuth);

  const userData = useSelector(getUserAuthData);

  useEffect(() => {
    dispatch(UserActions.initAuthData());
  }, [dispatch]);

  const initedUser = useSelector(getUserInitedSelectors);
  const initialData = localStorage.getItem('user');

  console.log('userData', userData);

  if (!initialData && !userData) {
    return <LoginPage />;
  }

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={''}>
        {initialData && (
          <>
            <MainPage />
          </>
        )}
      </Suspense>
    </div>
  );
}
