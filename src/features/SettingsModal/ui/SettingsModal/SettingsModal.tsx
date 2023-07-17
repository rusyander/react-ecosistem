import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './SettingsModal.module.scss';
import {
  BreadCrumbsActions,
  Button,
  HStack,
  ListBox,
  Modal,
  Texts,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { ChangePassword } from '../ChangePassword/ChangePassword';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  settingsModalActions,
  settingsModalReducer,
} from '../../model/slice/settingsModal';
import {
  getSettingsModalRole,
  getSettingsModalLanguage,
} from '../../model/selectors/getSettingsModal/getSettingsModal';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Language } from '../../model/types/settingsModal';
import { UserActions } from 'entities/User';
import { USER_LANGUAGE } from 'shared/const/localstorage';
import { useNavigate } from 'react-router-dom';

const redusers: ReducersList = {
  settingsModal: settingsModalReducer,
};
export interface SettingsModalProps {
  className?: string;
  onClose?: () => void;
  roles: any;
  changeRole: any;
  changeLanguage: any;
  initialData?: any;
}

const languageOptions = [
  { code: '1', name: 'Русский' },
  { code: '2', name: 'Узбекский' },
  { code: '3', name: 'Английский' },
];

export const SettingsModal = memo(
  ({
    className,
    onClose,
    roles,
    changeRole,
    changeLanguage,
    initialData,
  }: SettingsModalProps) => {
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const role = useSelector(getSettingsModalRole);
    const language = useSelector(getSettingsModalLanguage);
    const navigate = useNavigate();

    // language
    const onChageLanguageHandler = useCallback(
      (lang: Language[] | any) => {
        dispatch(settingsModalActions.setLanguage(lang));
      },
      [dispatch]
    );

    const onChageRoleHandler = useCallback(
      (role: Language) => {
        dispatch(settingsModalActions.setRole(role));
      },
      [dispatch]
    );

    // modal change password
    const [changePasswordModal, setChangePasswordModal] = useState(false);
    const openChangePasswordModal = useCallback(() => {
      setChangePasswordModal(true);
      onClose?.();
    }, [onClose]);
    const closeChangePasswordModal = useCallback(() => {
      setChangePasswordModal(false);
    }, []);
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
      <DynamicModuleLoader reducers={redusers} removeAfterUnmaunt>
        <div className={classNames(cls.settingsModal, {}, [className])}>
          <HStack justify="between" max>
            <Texts size="sizeM" className={cls.text} title={t('Настройки')} />
            <Button theme="clear" className={cls.buttonSize} onClick={onClose}>
              &#9932;
            </Button>
          </HStack>

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

          <Modal
            lazy
            isOpen={changePasswordModal}
            onClose={closeChangePasswordModal}
          >
            <ChangePassword onClose={closeChangePasswordModal} />
          </Modal>
        </div>
      </DynamicModuleLoader>
    );
  }
);
