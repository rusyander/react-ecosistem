import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './ChangePassword.module.scss';
import {
  Button,
  HStack,
  Input,
  Texts,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { settingsModalActions } from '../../model/slice/settingsModal';
import { useSelector } from 'react-redux';
import {
  getSettingsModalLogin,
  getSettingsModalPassword,
  getSettingsModalNewPassword,
  getSettingsModalConfirmPassword,
  getSettingsModalError,
  getSettingsModalIsLoading,
} from '../../model/selectors/getSettingsModal/getSettingsModal';
import { changePassword as changePasswordServises } from '../../model/services/fetchSettingsModal/changePassword';

interface ChangePasswordProps {
  className?: string;
  onClose?: () => void;
}

export const ChangePassword = memo((props: ChangePasswordProps) => {
  const { className, onClose } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const login = useSelector(getSettingsModalLogin);
  const password = useSelector(getSettingsModalPassword);
  const newPassword = useSelector(getSettingsModalNewPassword);
  const newPasswordConfirm = useSelector(getSettingsModalConfirmPassword);
  const error = useSelector(getSettingsModalError);
  const isLoading = useSelector(getSettingsModalIsLoading);

  const changeLogin = useCallback(
    (login: string) => {
      dispatch(settingsModalActions.setLogin(login));
    },
    [dispatch]
  );
  const changePassword = useCallback(
    (pass: string) => {
      dispatch(settingsModalActions.setPassword(pass));
    },
    [dispatch]
  );
  const changeNewPassword = useCallback(
    (newPass: string) => {
      dispatch(settingsModalActions.setNewPassword(newPass));
    },
    [dispatch]
  );
  const changeNewPasswordConfirm = useCallback(
    (confPass: string) => {
      dispatch(settingsModalActions.setConfirmPassword(confPass));
    },
    [dispatch]
  );

  const changePasswordHendler = useCallback(() => {
    if (!login || !password || !newPassword || !newPasswordConfirm) return;

    dispatch(changePasswordServises({}));
  }, [dispatch, login, newPassword, newPasswordConfirm, password]);

  return (
    <div className={classNames(cls.changePassword, {}, [className])}>
      <HStack justify="between" max>
        <Texts size="sizeM" className={cls.text} title={t('Смена пароля')} />
        <Button theme="clear" className={cls.buttonSize} onClick={onClose}>
          &#9932;
        </Button>
      </HStack>
      <VStack gap="4" max align="start" className={cls.inputFields}>
        <Input
          value={login}
          onChange={changeLogin}
          label={`${t('Логин')}:`}
          placeholder={t('Логин')}
          className={cls.input}
          isLabel
        />
        <Input
          value={password}
          onChange={changePassword}
          label={`${t('Пароль')}:`}
          placeholder={t('Пароль')}
          className={cls.input}
          isLabel
        />
        <Input
          value={newPassword}
          onChange={changeNewPassword}
          label={`${t('Новый пароль')}:`}
          placeholder={t('Новый пароль')}
          className={cls.input}
          isLabel
        />
        <Input
          value={newPasswordConfirm}
          onChange={changeNewPasswordConfirm}
          label={`${t('Подтверждение пароля')}:`}
          placeholder={t('Подтверждение пароля')}
          className={cls.input}
          isLabel
        />

        {error && (
          <Texts
            className={cls.errorText}
            size="sizeS"
            theme="error"
            title={t(String(error))}
          />
        )}

        <Button
          disabled={isLoading}
          className={cls.changePasswordButton}
          theme="background"
          onClick={changePasswordHendler}
        >
          {t('Изменить')}
        </Button>
      </VStack>
    </div>
  );
});
