import { getUserAuthData } from 'entities/User';
import { LoginPage } from 'pages/LoginPage';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useSelector(getUserAuthData);
  const location = useLocation();
  const [userData, setUserData] = useState(localStorage.getItem('user'));

  // console.log(userData, 'userData');

  // if (!auth) {
  //   return <Navigate to={'/'} state={{ from: location }} replace />;
  // }
  // if (!userData) {
  //   return <LoginPage />;
  // }

  return children;
};
