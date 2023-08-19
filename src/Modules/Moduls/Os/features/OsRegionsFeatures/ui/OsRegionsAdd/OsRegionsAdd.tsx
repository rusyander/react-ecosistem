import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsRegionsAdd.module.scss';
import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { OsRegionsAddModalContent } from 'Modules/Moduls/Os/entities/OsRegionsEntities';
import { getInitM } from 'shared/Globals/globalApi/globalApi';
import { saveDataM } from '../../api/OsRegionsWidgets';
import { Icon } from '@iconify/react';

interface OsRegionsAddProps {
  className?: string;
}

export const OsRegionsAdd = memo((props: OsRegionsAddProps) => {
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
    <div className={classNames(cls.osRegionsAdd, {}, [className])}>
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
          <OsRegionsAddModalContent
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
