import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './SearchRole.module.scss';
import { Input, Modal, Texts, VStack, classNames } from 'Modules/UiKit';
import { Role } from 'features/SettingsModal';
import { ChangeRoleModal } from 'entities/ChangeRoleModal';

interface SearchRoleProps {
  className?: string;
  sidebarData: any;
  changeRole?: (item: any) => void;
  setCollapsed: (item: boolean) => void;
  onToggle?: () => void;
  initialData?: any;
}

export const SearchRole = memo((props: SearchRoleProps) => {
  const {
    className,
    sidebarData,
    changeRole,
    setCollapsed,
    onToggle = () => null,
    initialData,
  } = props;
  const { t } = useTranslation();

  // --- modal changeRole
  const [appChangeRoleModal, setAppChangeRoleModal] = useState(false);
  const openAppChangeRoleModal = useCallback(() => {
    // onToggle();
    setAppChangeRoleModal(true);
    // setCollapsed(true);
  }, []);
  const closeAppChangeRoleModal = useCallback(() => {
    setAppChangeRoleModal(false);
  }, []);

  useEffect(() => {
    setSelectedRole({
      name: sidebarData?.data?.userRoleInfo?.userRoleName,
      code: sidebarData?.data?.userRoleInfo?.userRoleId,
    });
  }, []);

  const [search, setSearch] = useState('');

  const searchValue = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const [selectedRole, setSelectedRole] = useState<Role>({
    name: '',
    code: '0',
  });
  const selectRoles = useCallback(
    (value: { name: string; code: number }) => {
      setSelectedRole(value);
      if (sidebarData?.data?.userRoleInfo?.userRoleId !== value.code) {
        openAppChangeRoleModal();
      }
      //setCollapsed(false);
    },
    [openAppChangeRoleModal, sidebarData?.data?.userRoleInfo?.userRoleId]
  );

  return (
    <div className={classNames(cls.searchRole, {}, [className])}>
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
        {initialData?.data?.userRoles?.map((role: any) => (
          <div
            onClick={() => selectRoles(role)}
            key={role?.code}
            className={classNames(
              cls.ItemSelect,
              {
                [cls.ItemSelectActive]: role?.code === selectedRole?.code,
              },
              [className]
            )}
          >
            <Texts size="sizeS" text={role?.name} />
          </div>
        ))}
      </div>
      <Modal lazy isOpen={appChangeRoleModal} onClose={closeAppChangeRoleModal}>
        <ChangeRoleModal
          onClose={closeAppChangeRoleModal}
          selectedRole={selectedRole}
          changeRole={changeRole}
        />
      </Modal>
    </div>
  );
});
