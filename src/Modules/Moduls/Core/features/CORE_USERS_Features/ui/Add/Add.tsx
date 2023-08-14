import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Add.module.scss';
import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { AddModalContent } from '../AddModalContent/AddModalContent';

interface AddProps {
  className?: string;
}

export const Add = memo((props: AddProps) => {
  const { className } = props;
  const { t } = useTranslation('core');

  const [openModal, setOpenModal] = useState(false);

  const openModalFunction = useCallback(() => {
    setOpenModal(true);
  }, [setOpenModal]);

  const closeModalFunction = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  return (
    <div className={classNames(cls.add, {}, [className])}>
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

      <Modal isOpen={openModal} onClose={closeModalFunction} lazy>
        {openModal && (
          <AddModalContent closeModalFunction={closeModalFunction} />
        )}
      </Modal>
    </div>
  );
});
