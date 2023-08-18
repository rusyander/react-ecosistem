import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsSubregionsAdd.module.scss';
import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { OsSubregionsAddModalContent } from 'Modules/Moduls/Os/entities/OsSubregionsEntities';
import { getInitM } from 'shared/Globals/globalApi/globalApi';
import { saveDataM } from '../../api/OsSubregions';

interface OsSubregionsAddProps {
  className?: string;
}

export const OsSubregionsAdd = memo((props: OsSubregionsAddProps) => {
  const { className } = props;
  const { t } = useTranslation('os');
  const [getInit, { data: getInitData }] = getInitM();
  const [saveData, { data: saveDataQ }] = saveDataM();

  const [openModal, setOpenModal] = useState(false);

  const openModalFunction = useCallback(() => {
    setOpenModal(true);
  }, [setOpenModal]);

  const closeModalFunction = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  return (
    <div className={classNames(cls.osSubregionsAdd, {}, [className])}>
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
          <OsSubregionsAddModalContent
            closeModalFunction={closeModalFunction}
            getInit={getInit}
            saveData={saveData}
            getInitData={getInitData}
            saveDataQ={saveDataQ}
          />
        )}
      </Modal>
    </div>
  );
});
