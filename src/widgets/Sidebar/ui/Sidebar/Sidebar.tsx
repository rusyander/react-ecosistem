import { memo, useEffect, useState } from 'react';
import cls from './Sidebar.module.scss';

import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import { AppVersionModal } from 'entities/AppVersionModal';
import { SettingsModal, settingsModalActions } from 'features/SettingsModal';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { SearchFavorite } from 'features/SearchFavorite';
import { SearchRole } from 'features/SearchRole';
import { changeRoleM, changeLanguageM } from '../../api/SidebarApi';

interface SidebarProps {
  className?: string;
  sidebarData?: any;
  initialData?: any;
}

export const Sidebar = memo(
  ({ className, sidebarData, initialData }: SidebarProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(
        settingsModalActions.setRole({
          name: sidebarData?.data?.userRoleInfo?.userRoleName,
          code: sidebarData?.data?.userRoleInfo?.userRoleId,
        })
      );
    }, []);
    const [collapsed, setCollapsed] = useState(true);

    const onToggle = () => {
      setCollapsed((prev) => !prev);
    };
    const [changeRole] = changeRoleM();
    const [changeLanguage] = changeLanguageM();

    // // --- modal app
    const [appVersionModal, setAppVersionModal] = useState(false);
    const openAppVersionModal = () => {
      setAppVersionModal(true);
    };
    const closeAppVersionModal = () => {
      setAppVersionModal(false);
    };

    // --- modal settings
    const [appSettingsModal, setAppSettingsModal] = useState(false);
    const openAppSettingsModal = () => {
      setAppSettingsModal(true);
      setCollapsed(true);
    };
    const closeAppSettingsModal = () => {
      setAppSettingsModal(false);
    };

    return (
      <menu
        data-testid="sidebar"
        className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
          className,
        ])}
      >
        <Button
          data-testid="sidebar-toggle"
          onClick={onToggle}
          className={cls.collapseBtn}
          theme="backgroundInverted"
          size="size_l"
          square
        >
          {collapsed ? '>' : '<'}
        </Button>
        {!collapsed && (
          <div>
            <HStack
              max
              justify="between"
              align="center"
              className={cls.menuHeight}
            >
              <div />
              <Texts size="sizeM" title={t('Меню')} className={cls.menu} />
              <Icon
                onClick={openAppVersionModal}
                icon="fe:warning"
                className={cls.icons}
              />
            </HStack>
            <SearchRole
              sidebarData={sidebarData}
              changeRole={changeRole}
              setCollapsed={setCollapsed}
              initialData={initialData}
            />
            <SearchFavorite />
            <Button
              theme="background"
              className={cls.button}
              onClick={openAppSettingsModal}
            >
              {t('Настройки')}
            </Button>
          </div>
        )}
        <Modal lazy isOpen={appVersionModal} onClose={closeAppVersionModal}>
          <AppVersionModal
            appVerion={sidebarData?.data?.userRoleInfo?.applicationVersion}
          />
        </Modal>
        <Modal lazy isOpen={appSettingsModal} onClose={closeAppSettingsModal}>
          <SettingsModal
            onClose={closeAppSettingsModal}
            roles={sidebarData?.data}
            changeRole={changeRole}
            changeLanguage={changeLanguage}
            initialData={initialData}
          />
        </Modal>
      </menu>
    );
  }
);
