import { Suspense, useEffect } from 'react';
import { useTheme } from './providers/ThemeProvider';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserActions,
  getUserInitedSelectors,
  getUserIsAuth,
} from 'entities/User';
import { CoreApp } from 'Modules/Moduls/Core';
import { LoginPage } from 'pages/LoginPage';
import { classNames } from 'Modules/UiKit';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const initedUser = useSelector(getUserInitedSelectors);
  const isAuth = useSelector(getUserIsAuth);
  const navigate = useNavigate();

  console.log(initedUser);

  useEffect(() => {
    dispatch(UserActions.initAuthData());
  }, [dispatch]);

  if (!isAuth) {
    return <LoginPage />;
  }
  // if (isAuth) {
  //   navigate('/user');
  // }

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={''}>
        {/* {!isAuth && ( */}
        <div className="content-page">
          <Sidebar />
          <>
            <CoreApp />
          </>
        </div>
        {/* )} */}
      </Suspense>
    </div>
  );
}
