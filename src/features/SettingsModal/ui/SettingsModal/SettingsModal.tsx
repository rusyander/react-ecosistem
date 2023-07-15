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
import { Language, Role } from '../../model/types/settingsModal';

const redusers: ReducersList = {
  settingsModal: settingsModalReducer,
};
export interface SettingsModalProps {
  className?: string;
  onClose?: () => void;
  roles: Role[];
}

const languageOptions = [
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'Английский' },
  { code: 'uz', name: 'Узбекский' },
];

export const SettingsModal = memo(
  ({ className, onClose, roles }: SettingsModalProps) => {
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const role = useSelector(getSettingsModalRole);
    const language = useSelector(getSettingsModalLanguage);

    // language
    const onChageLanguageHandler = useCallback(
      (lang: Language[] | any) => {
        console.log('value', lang);
        i18n.changeLanguage((i18n.language = lang.value));
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
              defaultValue={role?.name}
              label={t('Роль по умолчанию')}
              onChange={onChageRoleHandler}
              value={role}
              items={roles}
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
            <Button theme="background">{t('Сохранить')}</Button>
          </VStack>

          <Modal
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
