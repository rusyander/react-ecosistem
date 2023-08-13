import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './RolesGridDelete.module.scss';
import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { RolesGridDeleteModalContent } from '../RolesGridDeleteModalContent/RolesGridDeleteModalContent';
import { Icon } from '@iconify/react';

interface RolesGridDeleteProps {
  className?: string;
  selectedField: any;
}

export const RolesGridDelete = memo((props: RolesGridDeleteProps) => {
  const { className, selectedField } = props;
  const { t } = useTranslation('core');

  const [openModal, setOpenModal] = useState(false);

  const openModalFunction = () => {
    setOpenModal(true);
  };

  const closeModalFunction = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  return (
    <div className={classNames(cls.rolesGridDelete, {}, [className])}>
      <Button
        onClick={openModalFunction}
        theme="background"
        disabled={!selectedField}
        className={cls.addButtons}
      >
        <HStack gap="16">
          <Icon width={20} icon="mi:delete" />
          <Texts text={t('Удалить')} />
        </HStack>
      </Button>

      {openModal && (
        <Modal zIndex={113} isOpen={openModal} onClose={closeModalFunction}>
          {/* {openEditModal && (
            <RolesGridDeleteModalContent
              selectedField={selectedField}
              closeModalFunction={closeModalFunction}
            />
          )} */}
        </Modal>
      )}
    </div>
  );
});
