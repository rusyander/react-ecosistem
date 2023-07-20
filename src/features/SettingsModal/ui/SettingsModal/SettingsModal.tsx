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
import { InitDataTypes } from 'shared/types/ititType';

const redusers: ReducersList = {
  settingsModal: settingsModalReducer,
};
export interface SettingsModalProps {
  className?: string;
  onClose?: () => void;
  roles: InitDataTypes;
  changeRole?: (item: number) => any;
  changeLanguage: (value: number) => any;
  initialData?: InitDataTypes;
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
      if (
        language?.code !== undefined &&
        String(language?.code) !== i18n.language
      ) {
        changeLanguage?.(language?.code).then((res: InitDataTypes) => {
          localStorage.setItem(USER_LANGUAGE, String(language?.code));
          dispatch(UserActions.setGlobalData(res.data));
          // @ts-ignore
          const tsIgnoreInitData = res?.data?.result;
          if (tsIgnoreInitData === '1') {
            onClose?.();
          }
        });
        i18n.changeLanguage((i18n.language = String(language?.code)));
      }
      if (role?.code !== undefined) {
        setTimeout(() => {
          changeRole?.(role?.code || 0).then((res: InitDataTypes) => {
            dispatch(UserActions.setGlobalData(res.data));
            dispatch(BreadCrumbsActions.clearPathListItem());
            // @ts-ignore
            const tsIgnoreInitData = res?.data?.result;
            if (tsIgnoreInitData === '1') {
              onClose?.();
            }
            navigate('/');
          });
        }, 100);
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
    }, [setChangePasswordModal]);

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
            language={language ?? {}}
            role={role ?? {}}
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
            zIndex={11}
          >
            <ChangePassword onClose={closeChangePasswordModal} />
          </Modal>
        </div>
      </DynamicModuleLoader>
    );
  }
);
