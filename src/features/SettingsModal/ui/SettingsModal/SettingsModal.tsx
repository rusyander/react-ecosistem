import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './SettingsModal.module.scss';
import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
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
    // modal change password
    const [changePasswordModal, setChangePasswordModal] = useState(false);
    const closeChangePasswordModal = useCallback(() => {
      setChangePasswordModal(false);
    }, []);
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
            changeRole={changeRole}
            changeLanguage={changeLanguage}
            initialData={initialData}
            setChangePasswordModal={setChangePasswordModal}
            closeChangePasswordModal={closeChangePasswordModal}
            getSettingsModalRole={getSettingsModalRole}
            getSettingsModalLanguage={getSettingsModalLanguage}
            settingsModalActions={settingsModalActions}
            onClose={onClose}
          />

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
