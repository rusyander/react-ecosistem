import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useSelector(getUserAuthData);
  const location = useLocation();

  if (!auth) {
    return <Navigate to={'/'} state={{ from: location }} replace />;
  }

  return children;
};
