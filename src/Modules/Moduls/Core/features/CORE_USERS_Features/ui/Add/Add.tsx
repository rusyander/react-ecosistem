import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Add.module.scss';
import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { SaveDataM } from '../../api/saveData';
import { fildListAddNew } from '../../consts/const';
import { AddModalContent } from 'Modules/Moduls/Core/entities/CoreUsersEntities';

interface AddProps {
  className?: string;
  refetchGridData?: () => void;
}

export const Add = memo((props: AddProps) => {
  const { className, refetchGridData } = props;
  const { t } = useTranslation('core');
  const [saveData, { data: saveDataQ }] = SaveDataM();
  const [openModal, setOpenModal] = useState(false);
  const fildListAddNews = fildListAddNew;

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
          <AddModalContent
            closeModalFunction={closeModalFunction}
            saveData={saveData}
            saveDataQ={saveDataQ}
            refetchGridData={refetchGridData}
            fildListAddNews={fildListAddNews}
          />
        )}
      </Modal>
    </div>
  );
});
