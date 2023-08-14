import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreRolesWidgetsEdit.module.scss';
import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { CoreRolesWidgetsEditModalContent } from 'Modules/Moduls/Core/entities/CoreRolesEntities';

interface CoreRolesWidgetsEditProps {
  className?: string;
  selectedField: any;
}

export const CoreRolesWidgetsEdit = memo((props: CoreRolesWidgetsEditProps) => {
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
    <div className={classNames(cls.coreRolesWidgetsEdit, {}, [className])}>
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

      <Modal isOpen={openModal} onClose={closeModalFunction}>
        {openModal && (
          <CoreRolesWidgetsEditModalContent
            selectedField={selectedField}
            closeModalFunction={closeModalFunction}
          />
        )}
      </Modal>
    </div>
  );
});
