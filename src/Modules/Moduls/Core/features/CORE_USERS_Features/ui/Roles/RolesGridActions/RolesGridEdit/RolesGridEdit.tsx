import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './RolesGridEdit.module.scss';
import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { RolesGridEditModalContent } from '../RolesGridEditModalContent/RolesGridEditModalContent';

interface RolesGridEditProps {
  className?: string;
  selectedField: any;
}

export const RolesGridEdit = memo((props: RolesGridEditProps) => {
  const { className, selectedField } = props;
  const { t } = useTranslation('core');

  const [openEditModal, setOpenEditModal] = useState(false);

  const openModalFunction = () => {
    setOpenEditModal(true);
  };

  const closeModalFunction = useCallback(() => {
    setOpenEditModal(false);
  }, [setOpenEditModal]);

  return (
    <div className={classNames(cls.rolesGridEdit, {}, [className])}>
      <Button
        onClick={openModalFunction}
        theme="background"
        disabled={!selectedField}
        className={cls.addButtons}
      >
        <HStack gap="16">
          <Icon width={20} icon="clarity:edit-line" />
          <Texts text={t('Редактировать')} />
        </HStack>
      </Button>

      {openEditModal && (
        <Modal zIndex={113} isOpen={openEditModal} onClose={closeModalFunction}>
          {openEditModal && (
            <RolesGridEditModalContent
              selectedField={selectedField}
              closeModalFunction={closeModalFunction}
            />
          )}
        </Modal>
      )}
    </div>
  );
});
