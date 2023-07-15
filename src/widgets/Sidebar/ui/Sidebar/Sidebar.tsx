import { memo, useEffect, useState } from 'react';
import cls from './Sidebar.module.scss';

import {
  Button,
  HStack,
  Modal,
  Texts,
  classNames,
  useHover,
} from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import { AppVersionModal } from 'entities/AppVersionModal';
import { SettingsModal, settingsModalActions } from 'features/SettingsModal';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { SearchFavorite } from 'features/SearchFavorite';
import { SearchRole } from 'features/SearchRole';

interface SidebarProps {
  className?: string;
  sidebarData?: any;
}

export const Sidebar = memo(({ className, sidebarData }: SidebarProps) => {
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

  const [isHover, bindHover] = useHover();

  const onHover = () => {
    // if (collapsed) {
    //   setCollapsed(false);
    // }
  };
  // if (collapsed) {
  //   if (isHover) {
  //     setCollapsed(false);
  //   }
  // }

  // --- modal app
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
      {...bindHover}
      onMouseMove={onHover}
      data-testid="sidebar"
      // className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
      //   className,
      // ])}
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

          <SearchRole sidebarData={sidebarData} />

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
      <Modal isOpen={appVersionModal} onClose={closeAppVersionModal}>
        <AppVersionModal
          appVerion={sidebarData?.data?.userRoleInfo?.applicationVersion}
        />
      </Modal>

      <Modal isOpen={appSettingsModal} onClose={closeAppSettingsModal}>
        <SettingsModal
          onClose={closeAppSettingsModal}
          roles={sidebarData?.data?.userRoles}
        />
      </Modal>
    </menu>
  );
});
