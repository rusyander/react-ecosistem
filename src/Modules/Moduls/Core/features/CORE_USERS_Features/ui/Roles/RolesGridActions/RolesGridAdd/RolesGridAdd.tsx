import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './RolesGridAdd.module.scss';
import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { RolesGridAddModalContent } from '../RolesGridAddModalContent/RolesGridAddModalContent';

interface RolesGridAddProps {
  className?: string;
}

export const RolesGridAdd = memo((props: RolesGridAddProps) => {
  const { className } = props;
  const { t } = useTranslation('core');

  const [openAddModal, setOpenAddModal] = useState(false);

  const openModalFunction = useCallback(() => {
    setOpenAddModal(true);
  }, [setOpenAddModal]);

  const closeModalFunction = useCallback(() => {
    setOpenAddModal(false);
  }, [setOpenAddModal]);

  return (
    <div className={classNames(cls.rolesGridAdd, {}, [className])}>
      <Button
        onClick={openModalFunction}
        theme="background"
        className={cls.addButtons}
      >
        <HStack gap="16">
          <Icon width={20} icon="zondicons:add-outline" />
          <Texts text={t('Добавить')} />
        </HStack>
      </Button>

      <Modal
        isOpen={openAddModal}
        zIndex={113}
        onClose={closeModalFunction}
        lazy
      >
        {openAddModal && (
          <RolesGridAddModalContent closeModalFunction={closeModalFunction} />
        )}
      </Modal>
    </div>
  );
});
