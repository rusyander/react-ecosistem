import { useCallback, memo, useEffect } from 'react';
import cls from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { authByUser } from '../../model/services/loginByUserName/authByUser';
import {
  AuthSliceActions,
  AuthSliceReducer,
} from '../../model/slice/authSlice';
import { getLoginLogin } from '../../model/selectors/getLoginUserLogin/getLoginUserLogin';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';

import { Button, Input, Texts, classNames } from 'Modules/UiKit';
import {
  ReducersList,
  DynamicModuleLoader,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

export interface LoginFormProps {
  className?: string;
}

const initialRedusers: ReducersList | any = {
  auth: AuthSliceReducer,
};

const LoginForm = memo(({ className }: LoginFormProps) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const login = useSelector(getLoginLogin);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  const onChangeLogin = useCallback(
    (value: string) => {
      dispatch(AuthSliceActions.setLoginName(value));
    },
    [dispatch]
  );
  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(AuthSliceActions.setPassword(value));
    },
    [dispatch]
  );

  const onLoginClick = useCallback(async (): Promise<void> => {
    if (!login || !password) return;
    const res = await dispatch(authByUser({ login, password }));
    if (res.meta.requestStatus === 'fulfilled') {
      console.log('fulfilled');
    }
  }, [dispatch, password, login]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent | any) => {
      if (e.key === 'Enter') {
        console.log('onKeyDown');
        onLoginClick();
      }
    },
    [onLoginClick]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <DynamicModuleLoader reducers={initialRedusers} removeAfterUnmaunt>
      <div
        className={classNames(cls.LoginForm, {}, [className])}
        onKeyUp={onKeyDown}
      >
        <Texts title={t('Форма авторизации')} />
        {/* {error && (
          <Texts theme="error" text={t('Вы ввели неправельные данные')} />
        )} */}
        {error && <Texts theme="error" text={t(error)} />}
        <Input
          type="text"
          className={cls.input}
          placeholder={t('Введите логин')}
          autoFocus
          onChange={onChangeLogin}
          value={login}
        />
        <Input
          type="text"
          className={cls.input}
          placeholder={t('Введите пароль')}
          onChange={onChangePassword}
          value={password}
        />
        <Button
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={onLoginClick}
          theme="outline"
          className={cls.loginBtn}
          disabled={isLoading}
        >
          {t('Войти')}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
