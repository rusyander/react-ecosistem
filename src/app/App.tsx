import { Suspense, useEffect } from 'react';
import { useTheme } from './providers/ThemeProvider';
import { useSelector } from 'react-redux';
import {
  UserActions,
  getDefaultDataQ,
  getUserAuthData,
  getUserInitedSelectors,
} from 'entities/User';
import { LoginPage } from 'pages/LoginPage';
import { classNames } from 'Modules/UiKit';
import { MainPage } from 'pages/MainPage';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

export default function App() {
  const { theme } = useTheme();
  const { data } = getDefaultDataQ({});
  console.log('data+++++', data);

  const dispatch = useAppDispatch();

  const userData = useSelector(getUserAuthData);

  useEffect(() => {
    dispatch(UserActions.initAuthData());
  }, [dispatch]);

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
