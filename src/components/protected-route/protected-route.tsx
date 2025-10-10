import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { useSelector } from '../../services/store';
import {
  selectIsAuthChecked,
  selectIsUserAuthenticated
} from '../../services/selectors';

type ProtectedRouteProps = {
  children: React.ReactElement;
  unAuthOnly?: boolean;
};

export const ProtectedRoute = ({
  children,
  unAuthOnly
}: ProtectedRouteProps) => {
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!unAuthOnly && !isUserAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (unAuthOnly && isUserAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
