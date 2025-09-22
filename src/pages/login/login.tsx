import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectAuthError, selectAuthLoading } from '@selectors';
import { Preloader } from '@ui';
import { loginUser } from '../../slices/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthLoading);

  // путь для redirect после логина (если был переход с другой страницы)
  const from = location.state?.from || '/';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((userData) => {
        // Возвращаем на предыдущую страницу или на главную
        navigate(from, { replace: true });
      });
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
