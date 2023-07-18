import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './SettingsSelectRoleAndLanguage.module.scss';
import { ListBox, classNames } from 'Modules/UiKit';
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
  initialData?: any;
  settingsModalActions: any;
  language: any;
  role: any;
}

export const SettingsSelectRoleAndLanguage = memo(
  (props: SettingsSelectRoleAndLanguageProps) => {
    const {
      className,
      roles,
      initialData,
      settingsModalActions,
      language,
      role,
    } = props;
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();

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
      </div>
    );
  }
);
