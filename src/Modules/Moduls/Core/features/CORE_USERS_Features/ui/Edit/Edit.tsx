import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Edit.module.scss';
import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { EditModalContent } from '../EditModalContent/EditModalContent';

interface EditProps {
  className?: string;
  selectedField: any;
}

export const Edit = memo((props: EditProps) => {
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
    <div className={classNames(cls.edit, {}, [className])}>
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
          <EditModalContent
            selectedField={selectedField}
            closeModalFunction={closeModalFunction}
          />
        )}
      </Modal>
    </div>
  );
});
