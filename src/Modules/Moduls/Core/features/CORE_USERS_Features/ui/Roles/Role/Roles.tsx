import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Roles.module.scss';
import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { CheckFormEnterM } from 'Modules/Moduls/Core/entities/CheckFormE';
import { ModalHeader } from 'Modules/Moduls/Core/entities/ModalHeader';
import { RoleGrid } from '../RoleGrid/RoleGrid';

interface RolesProps {
  className?: string;
}

export const Roles = memo((props: RolesProps) => {
  const { className } = props;
  const { t } = useTranslation('core');

  const [openRoleModal, setOpenRoleModal] = useState(false);

  const openModalFunction = useCallback(() => {
    setOpenRoleModal(true);
  }, [setOpenRoleModal]);

  const closeModalFunction = useCallback(() => {
    setOpenRoleModal(false);
  }, [setOpenRoleModal]);

  return (
    <div className={classNames(cls.roles, {}, [className])}>
      <Button
        onClick={openModalFunction}
        theme="background"
        className={cls.addButtons}
      >
        <HStack gap="16">
          <Icon width={20} icon="solar:user-id-bold" />
          <Texts text={t('Роли')} />
        </HStack>
      </Button>

      <Modal isOpen={openRoleModal} onClose={closeModalFunction} lazy>
        <CheckFormEnterM checkFormEnterName="CORE_USER_ROLES" />
        <ModalHeader
          title={t('Роли пользователя') || ''}
          onClose={closeModalFunction}
        />
        <RoleGrid />
      </Modal>
    </div>
  );
});
