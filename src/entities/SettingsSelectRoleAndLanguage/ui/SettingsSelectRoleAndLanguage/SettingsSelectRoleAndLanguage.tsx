import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './SettingsSelectRoleAndLanguage.module.scss';
import {
  BreadCrumbsActions,
  Button,
  ListBox,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { UserActions } from 'entities/User';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { USER_LANGUAGE } from 'shared/const/localstorage';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

export interface LanguageProps {
  code: string | number;
  name: string;
}

export interface RoleProps {
  code: string | number;
  name: string;
}

const languageOptions = [
  { code: '1', name: 'Русский' },
  { code: '2', name: 'Узбекский' },
  { code: '3', name: 'Английский' },
];

interface SettingsSelectRoleAndLanguageProps {
  className?: string;
  roles: any;
  changeRole: (value: any) => any;
  changeLanguage: (value: any) => any;
  initialData?: any;
  setChangePasswordModal: (value: boolean) => void;
  closeChangePasswordModal: () => void;
  getSettingsModalRole: any;
  getSettingsModalLanguage: any;
  settingsModalActions: any;
  onClose?: () => void;
}

export const SettingsSelectRoleAndLanguage = memo(
  (props: SettingsSelectRoleAndLanguageProps) => {
    const {
      className,
      roles,
      changeRole,
      changeLanguage,
      initialData,
      setChangePasswordModal,
      getSettingsModalRole,
      getSettingsModalLanguage,
      settingsModalActions,
      onClose,
    } = props;
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const role: RoleProps = useSelector(getSettingsModalRole);
    const language: LanguageProps = useSelector(getSettingsModalLanguage);
    const navigate = useNavigate();

    const openChangePasswordModal = useCallback(() => {
      setChangePasswordModal(true);
      onClose?.();
    }, [onClose, setChangePasswordModal]);

    const onChageLanguageHandler = useCallback(
      (lang: LanguageProps[] | any) => {
        dispatch(settingsModalActions.setLanguage(lang));
      },
      [dispatch, settingsModalActions]
    );

    const onChageRoleHandler = useCallback(
      (role: LanguageProps) => {
        dispatch(settingsModalActions.setRole(role));
      },
      [dispatch, settingsModalActions]
    );

    const saveSettings = useCallback(() => {
      // if (language?.code !== i18n.language) {
      if (language?.code !== undefined && language?.code !== i18n.language) {
        changeLanguage?.(language?.code).then((res: any) => {
          localStorage.setItem(USER_LANGUAGE, String(language?.code));
          dispatch(UserActions.setGlobalData(res.data));
          // onClose?.();
        });
        i18n.changeLanguage((i18n.language = String(language?.code)));
      }
      if (
        // roles?.userRoleInfo?.userRoleId !== role?.code ||
        role?.code !== undefined
        // roles?.userRoleInfo?.userRoleId !== undefined
      ) {
        changeRole?.(role?.code).then((res: any) => {
          dispatch(UserActions.setGlobalData(res.data));
          dispatch(BreadCrumbsActions.clearPathListItem());
          navigate('/');
          // onClose?.();
        });
      }
    }, [
      changeLanguage,
      changeRole,
      dispatch,
      i18n,
      language?.code,
      navigate,
      role?.code,
    ]);

    return (
      <div
        className={classNames(cls.settingsSelectRoleAndLanguage, {}, [
          className,
        ])}
      >
        <div className={cls.select}>
          <ListBox
            className={classNames('', {}, [className])}
            defaultValue={
              i18n.language === '1'
                ? 'Русский'
                : i18n.language === '2'
                ? 'Узбекский'
                : i18n.language === '3'
                ? 'Английский'
                : ''
            }
            label={t('Язык')}
            onChange={onChageLanguageHandler}
            value={language}
            items={languageOptions}
          />
        </div>

        <div className={cls.select}>
          <ListBox
            className={classNames('', {}, [className])}
            defaultValue={roles?.userRoleInfo?.userRoleName}
            label={t('Роль по умолчанию')}
            onChange={onChageRoleHandler}
            value={role}
            items={initialData?.data?.userRoles}
          />
        </div>
        <VStack gap="16">
          <Button
            theme="background"
            onClick={openChangePasswordModal}
            className={cls.changePassword}
          >
            {t('Смена пароля')}
          </Button>
          <Button onClick={saveSettings} theme="background">
            {t('Сохранить')}
          </Button>
        </VStack>
      </div>
    );
  }
);
