import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './SettingsModal.module.scss';
import {
  BreadCrumbsActions,
  Button,
  HStack,
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
import { SettingsSelectRoleAndLanguage } from 'entities/SettingsSelectRoleAndLanguage';
import { UserActions } from 'entities/User';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import i18n from 'shared/config/i18n/i18n';
import { USER_LANGUAGE } from 'shared/const/localstorage';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

const redusers: ReducersList = {
  settingsModal: settingsModalReducer,
};
export interface SettingsModalProps {
  className?: string;
  onClose?: () => void;
  roles: any;
  changeRole: (value: any) => any;
  changeLanguage: (value: any) => any;
  initialData?: any;
}

export const SettingsModal = memo(
  ({
    className,
    onClose,
    roles,
    changeRole,
    changeLanguage,
    initialData,
  }: SettingsModalProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const role = useSelector(getSettingsModalRole);
    const language = useSelector(getSettingsModalLanguage);
    const navigate = useNavigate();

    const saveSettings = useCallback(() => {
      // if (language?.code !== i18n.language) {
      if (language?.code !== undefined && language?.code !== i18n.language) {
        changeLanguage?.(language?.code).then((res: any) => {
          localStorage.setItem(USER_LANGUAGE, String(language?.code));
          dispatch(UserActions.setGlobalData(res.data));
          if (res?.data?.result === '1') {
            onClose?.();
          }
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
          if (res?.data?.result === '1') {
            onClose?.();
          }
          navigate('/');
          // onClose?.();
        });
      }
    }, [
      changeLanguage,
      changeRole,
      dispatch,
      language?.code,
      navigate,
      onClose,
      role?.code,
    ]);

    // modal change password
    const [changePasswordModal, setChangePasswordModal] = useState(false);
    const closeChangePasswordModal = useCallback(() => {
      setChangePasswordModal(false);
    }, []);

    const openChangePasswordModal = useCallback(() => {
      setChangePasswordModal(true);
      onClose?.();
    }, [onClose, setChangePasswordModal]);

    return (
      <DynamicModuleLoader reducers={redusers} removeAfterUnmaunt>
        <div className={classNames(cls.settingsModal, {}, [className])}>
          <HStack justify="between" max>
            <Texts size="sizeM" className={cls.text} title={t('Настройки')} />
            <Button theme="clear" className={cls.buttonSize} onClick={onClose}>
              &#9932;
            </Button>
          </HStack>
          <SettingsSelectRoleAndLanguage
            roles={roles}
            initialData={initialData}
            settingsModalActions={settingsModalActions}
            language={language}
            role={role}
          />

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
