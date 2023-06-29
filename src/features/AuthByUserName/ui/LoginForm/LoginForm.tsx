import { useCallback, memo } from 'react';
import cls from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';
import { loginByUserName } from '../../model/services/loginByUserName/loginByUserName';

import {
  LoginActions,
  LoginReducer,
} from 'features/AuthByUserName/model/slice/loginSlice';
import { getLoginUsername } from '../../model/selectors/getLoginUserName/getLoginUserName';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModalLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Button, Input, Texts, classNames } from 'Modules/UiKit';

export interface LoginFormProps {
  className?: string;
}

const initialRedusers: ReducersList | any = {
  loginForm: LoginReducer,
};

const LoginForm = memo(({ className }: LoginFormProps) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  const onChangeUserName = useCallback(
    (value: string) => {
      dispatch(LoginActions.setUserName(value));
    },
    [dispatch]
  );
  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(LoginActions.setPassword(value));
    },
    [dispatch]
  );

  const onLoginClick = useCallback(async (): Promise<void> => {
    const res = await dispatch(loginByUserName({ username, password }));
    console.log(res);
    if (res.meta.requestStatus === 'fulfilled') {
      console.log('fulfilled');
    }
  }, [dispatch, password, username]);
  return (
    <DynamicModuleLoader reducers={initialRedusers} removeAfterUnmaunt>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Texts title={t('Форма авторизации')} />
        {error && (
          <Texts theme="error" text={t('Вы ввели неправельные данные')} />
        )}
        <Input
          type="text"
          className={cls.input}
          placeholder={t('Введите username')}
          autoFocus
          onChange={onChangeUserName}
          value={username}
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
