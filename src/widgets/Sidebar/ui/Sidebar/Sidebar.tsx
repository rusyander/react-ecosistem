import { memo, useMemo, useState } from 'react';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { LanguageSwitcher } from 'features/LanguageSwitcher';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { useSelector } from 'react-redux';
import {
  Button,
  HStack,
  Input,
  Modal,
  Texts,
  VStack,
  classNames,
  useHover,
} from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import { AppVersionModal } from 'entities/AppVersionModal';
import { SettingsModal } from 'features/SettingsModal';

interface SidebarProps {
  className?: string;
  sidebarData?: any;
}

export const Sidebar = memo(({ className, sidebarData }: SidebarProps) => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(true);

  const sidebarItemsList = useSelector(getSidebarItems);
  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const [search, setSearch] = useState('');
  const [favorite, setFavorite] = useState('');

  const searchValue = (value: string) => {
    setSearch(value);
  };

  const searchFavorite = (value: string) => {
    setFavorite(value);
  };

  const [selectedRole, setSelectedRole] = useState({ name: '', code: 0 });
  const selectRoles = (value: { name: string; code: number }) => {
    setSelectedRole(value);
  };

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem item={item} collapsed={collapsed} key={item.path} />
      )),
    [collapsed, sidebarItemsList]
  );

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
          {/* Top sidebar */}
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
          <VStack max className={cls.menuRole} gap="4">
            <Texts size="sizeM" title={t('Роль')} className={cls.menu} />
            <Texts
              size="sizeS"
              text={sidebarData?.data?.userRoleInfo?.userRoleName}
              className={cls.menu}
            />
          </VStack>

          <div className={cls.sidebarContent}>
            <Input value={search} onChange={searchValue} search />
          </div>

          <div className={cls.divider} />

          <div className={cls.selectRole}>
            {/* <div className={cls.ItemSelect}>
              <Texts size="sizeS" text="Суперпользователь системы" />
            </div>
            <div className={cls.ItemSelect}>
              <Texts size="sizeS" text="Суперпользователь системы" />
            </div> */}
            {sidebarData?.data?.userRoles?.map((role: any) => (
              <div
                onClick={() => selectRoles(role)}
                key={role?.code}
                className={classNames(
                  cls.ItemSelect,
                  { [cls.ItemSelectActive]: role?.code === selectedRole?.code },
                  [className]
                )}
              >
                <Texts size="sizeS" text={role?.name} />
              </div>
            ))}
          </div>

          {/* Bottom sidebar */}

          <VStack max className={cls.menuFavorite} gap="4">
            <Texts size="sizeM" title={t('Избранное')} className={cls.menu} />
          </VStack>

          <div className={cls.sidebarContent}>
            <Input value={favorite} onChange={searchFavorite} search />
          </div>

          <div className={cls.divider} />

          {/* Bottom sidebar */}

          {/* <div className={cls.items}>{itemsList}</div>
          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LanguageSwitcher short={collapsed} className={cls.lang} />
          </div> */}
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
