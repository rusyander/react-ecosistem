import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsSubregionsEdit.module.scss';
import {
  Button,
  HStack,
  InputsDataSkeleton,
  IsError,
  Modal,
  Texts,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { OsSubregionsEditModalContent } from 'Modules/Moduls/Os/entities/OsSubregionsEntities';
import { getInitM, getFgDataM } from 'shared/Globals/globalApi/globalApi';
import { saveDataM } from '../../api/OsSubregions';

interface OsSubregionsEditProps {
  className?: string;
  selectedField: any;
  refetchGridData?: () => void;
}

export const OsSubregionsEdit = memo((props: OsSubregionsEditProps) => {
  const { className, selectedField, refetchGridData } = props;
  const { t } = useTranslation('os');

  const [getInit, { data: getInitData, isLoading, isError }] = getInitM();
  const [saveData, { data: saveDataQ }] = saveDataM();
  const [getFgData] = getFgDataM();

  const [openModal, setOpenModal] = useState(false);

  const openModalFunction = () => {
    setOpenModal(true);
  };

  const closeModalFunction = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  return (
    <div className={classNames(cls.osSubregionsEdit, {}, [className])}>
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
          <VStack max>
            {isLoading && <InputsDataSkeleton />}
            {isError && <IsError />}
            <OsSubregionsEditModalContent
              selectedField={selectedField}
              closeModalFunction={closeModalFunction}
              getInit={getInit}
              saveData={saveData}
              getFgData={getFgData}
              getInitData={getInitData}
              saveDataQ={saveDataQ}
              refetchGridData={refetchGridData}
            />
          </VStack>
        )}
      </Modal>
    </div>
  );
});
