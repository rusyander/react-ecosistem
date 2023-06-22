import { Suspense, useEffect } from 'react';
import { classNames } from '../shared/lib/classNames/classNames';
import { useTheme } from './providers/ThemeProvider';

import { AppRouter } from './providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions, getUserInitedSelectors } from 'entities/User';

export default function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const initedUser = useSelector(getUserInitedSelectors);

  useEffect(() => {
    dispatch(UserActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={''}>
        <Navbar />

        <div className="content-page">
          <Sidebar />
          {initedUser && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
}
