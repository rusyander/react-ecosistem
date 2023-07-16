import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './SettingsModal.module.scss';
import {
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
  { code: 'ru', name: 'Русский', number: 1 },
  { code: 'en', name: 'Английский', number: 2 },
  { code: 'uz', name: 'Узбекский', number: 3 },
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

    // language
    const onChageLanguageHandler = useCallback(
      (lang: Language[] | any) => {
        console.log('value', lang);
        i18n.changeLanguage((i18n.language = lang.code));
        dispatch(settingsModalActions.setLanguage(lang));
      },
      [dispatch, i18n]
    );

    const onChageRoleHandler = useCallback(
      (role: Language) => {
        console.log('value', role);
        dispatch(settingsModalActions.setRole(role));
      },
      [dispatch]
    );

    // modal change password
    const [changePasswordModal, setChangePasswordModal] = useState(false);
    const openChangePasswordModal = () => {
      setChangePasswordModal(true);
      onClose?.();
    };
    const closeChangePasswordModal = () => {
      setChangePasswordModal(false);
    };

    const saveSettings = () => {
      if (language?.code !== i18n.language) {
        // changeLanguage({language: i18n.language})
        changeLanguage?.(language?.number).then((res: any) => {
          console.log('res*******************', res);

          dispatch(UserActions.setGlobalData(res.data));
        });
      }
      if (roles?.userRoleInfo?.userRoleName !== role?.name) {
        // changeRole(role?.code);
        changeRole?.(role?.code).then((res: any) => {
          dispatch(UserActions.setGlobalData(res.data));
        });
      }
    };

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
              defaultValue={languageOptions[0].name}
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
              // items={roles?.userRoles}
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
