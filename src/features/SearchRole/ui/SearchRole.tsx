import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './SearchRole.module.scss';
import { Input, Texts, VStack, classNames } from 'Modules/UiKit';
import { Role } from 'features/SettingsModal';

interface SearchRoleProps {
  className?: string;
  sidebarData: any;
}

export const SearchRole = memo((props: SearchRoleProps) => {
  const { className, sidebarData } = props;
  const { t } = useTranslation();

  useEffect(() => {
    setSelectedRole({
      name: sidebarData?.data?.userRoleInfo?.userRoleName,
      code: sidebarData?.data?.userRoleInfo?.userRoleId,
    });
  }, []);

  const [search, setSearch] = useState('');

  const searchValue = (value: string) => {
    setSearch(value);
  };

  const [selectedRole, setSelectedRole] = useState<Role>({
    name: '',
    code: '0',
  });
  const selectRoles = (value: { name: string; code: number }) => {
    setSelectedRole(value);
  };

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
        {sidebarData?.data?.userRoles?.map((role: any) => (
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
    </div>
  );
});
