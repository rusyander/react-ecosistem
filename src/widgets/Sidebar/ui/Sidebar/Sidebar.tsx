import { memo, useCallback, useEffect, useRef, useState } from 'react';
import cls from './Sidebar.module.scss';
import { Button, Modal, classNames, useHover } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';
import { SettingsModal, settingsModalActions } from 'features/SettingsModal';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { SearchFavorite } from 'features/SearchFavorite';
import { SearchRole } from 'features/SearchRole';
import { changeRoleM, changeLanguageM } from '../../api/SidebarApi';
import { SidebarHeader } from '../SidebarHeader/SidebarHeader';
import { InitDataTypes } from 'shared/types/initType';

interface SidebarProps {
  className?: string;
  sidebarData?: InitDataTypes;
  initialData?: InitDataTypes;
}

export const Sidebar = memo(
  ({ className, sidebarData, initialData }: SidebarProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(
        settingsModalActions.setRole({
          name: sidebarData?.data?.userRoleInfo?.userRoleName || '',
          code: sidebarData?.data?.userRoleInfo?.userRoleId || 0,
        })
      );
    }, []);
    const [collapsed, setCollapsed] = useState(true);

    const onToggle = () => {
      setCollapsed((prev) => !prev);
    };
    const [changeRole] = changeRoleM();
    const [changeLanguage] = changeLanguageM();

    // --- modal settings
    const [appSettingsModal, setAppSettingsModal] = useState(false);
    const openAppSettingsModal = useCallback(() => {
      setAppSettingsModal(true);
      setCollapsed(true);
    }, []);
    const closeAppSettingsModal = useCallback(() => {
      setAppSettingsModal(false);
    }, []);

    const divRef = useRef<any>(null);
    const [isHover, bindHover] = useHover();

    useEffect(() => {
      if (isHover) {
        setCollapsed(false);
      }
      if (!isHover) {
        setCollapsed(true);
      }
      //
    }, [isHover]);

    return (
      <menu
        ref={divRef}
        data-testid="sidebar"
        className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
          className,
        ])}
        {...bindHover}
      >
        {/* <Button
          data-testid="sidebar-toggle"
          onClick={onToggle}
          className={cls.collapseBtn}
          theme="backgroundInverted"
          size="size_l"
          square
        >
          {collapsed ? '>' : '<'}
        </Button> */}
        {!collapsed && (
          <div>
            <SidebarHeader
              applicationVersion={
                sidebarData?.data?.userRoleInfo?.applicationVersion
              }
            />
            <SearchRole
              sidebarData={sidebarData || {}}
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
        <Modal lazy isOpen={appSettingsModal} onClose={closeAppSettingsModal}>
          <SettingsModal
            onClose={closeAppSettingsModal}
            roles={sidebarData || {}}
            changeRole={changeRole}
            changeLanguage={changeLanguage}
            initialData={initialData}
          />
        </Modal>
      </menu>
    );
  }
);
