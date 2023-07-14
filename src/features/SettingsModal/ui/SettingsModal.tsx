import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './SettingsModal.module.scss';
import { Button, HStack, ListBox, Texts, classNames } from 'Modules/UiKit';

export interface SettingsModalProps {
  className?: string;
  onClose?: () => void;
  roles: any[];
}

const languageOptions = [
  { value: 'ru', content: 'Русский' },
  { value: 'en', content: 'Английский' },
  { value: 'uz', content: 'Узбекский' },
];

export const SettingsModal = memo(
  ({ className, onClose, roles }: SettingsModalProps) => {
    const { t } = useTranslation();

    // language
    const [selectLanguage, setSelectLanguage] = useState(
      languageOptions[0].content
    );
    const onChageLanguageHandler = useCallback(
      (value: any) => {
        setSelectLanguage(value);
        console.log('value', value);
      },
      [setSelectLanguage]
    );

    // role
    const changeVariablesForRole = roles?.map((role) => ({
      content: role.name,
      value: String(role.code),
    }));
    const [selectRole, setSelectRole] = useState(
      changeVariablesForRole.length === roles?.length
        ? changeVariablesForRole[1].content
        : ''
    );

    const onChageRoleHandler = useCallback(
      (value: any) => {
        setSelectRole(value);
        console.log('value', value);
      },
      [setSelectRole]
    );

    return (
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
            defaultValue={languageOptions[0].content}
            label={t('Язык')}
            onChange={onChageLanguageHandler}
            value={selectLanguage}
            items={languageOptions}
          />
        </div>

        <div className={cls.select}>
          <ListBox
            className={classNames('', {}, [className])}
            defaultValue={
              changeVariablesForRole.length === roles?.length
                ? changeVariablesForRole[1].content
                : ''
            }
            label={t('Роль по умолчанию')}
            onChange={onChageRoleHandler}
            value={selectRole}
            items={
              changeVariablesForRole.length === roles?.length
                ? changeVariablesForRole
                : []
            }
          />
        </div>
      </div>
    );
  }
);
