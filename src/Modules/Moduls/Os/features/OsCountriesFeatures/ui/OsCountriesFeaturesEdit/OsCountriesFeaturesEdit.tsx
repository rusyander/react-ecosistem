import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsCountriesFeaturesEdit.module.scss';
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
import { getInitM, getFgDataM } from 'shared/Globals/globalApi/globalApi';
import { OsCountriesEditModalContent } from 'Modules/Moduls/Os/entities/OsCountriesEntities';
import { editDataM } from '../../api/OsCountriesApi';

interface OsCountriesFeaturesEditProps {
  className?: string;
  selectedField: any;
  refetchGridData?: () => void;
}

export const OsCountriesFeaturesEdit = memo(
  (props: OsCountriesFeaturesEditProps) => {
    const { className, selectedField, refetchGridData } = props;
    const { t } = useTranslation('os');

    const [getInit, { data: getInitData, isLoading, isError }] = getInitM();
    const [editData, { data: editDataQ }] = editDataM();
    const [getFgData] = getFgDataM();

    const [openModal, setOpenModal] = useState(false);

    const openModalFunction = () => {
      setOpenModal(true);
    };

    const closeModalFunction = useCallback(() => {
      setOpenModal(false);
    }, [setOpenModal]);

    return (
      <div className={classNames(cls.osCountriesFeaturesEdit, {}, [className])}>
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
              <OsCountriesEditModalContent
                selectedField={selectedField}
                closeModalFunction={closeModalFunction}
                getInit={getInit}
                saveData={editData}
                getFgData={getFgData}
                getInitData={getInitData}
                saveDataQ={editDataQ}
                refetchGridData={refetchGridData}
              />{' '}
            </VStack>
          )}
        </Modal>
      </div>
    );
  }
);
