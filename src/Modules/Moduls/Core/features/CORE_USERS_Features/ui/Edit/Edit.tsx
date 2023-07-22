import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Edit.module.scss';
import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';

interface EditProps {
  className?: string;
}

export const Edit = memo((props: EditProps) => {
  const { className } = props;
  const { t } = useTranslation('core');

  const [openEditModal, setOpenEditModal] = useState(false);

  const openModalFunction = useCallback(() => {
    setOpenEditModal(true);
  }, [setOpenEditModal]);

  const closeModalFunction = useCallback(() => {
    setOpenEditModal(false);
  }, [setOpenEditModal]);

  return (
    <div className={classNames(cls.edit, {}, [className])}>
      <Button
        onClick={openModalFunction}
        theme="background"
        className={cls.addButtons}
      >
        <HStack gap="16">
          <Icon width={20} icon="clarity:edit-line" />
          <Texts text={t('Редактировать')} />
        </HStack>
      </Button>

      <Modal isOpen={openEditModal} onClose={closeModalFunction} lazy></Modal>
    </div>
  );
});
