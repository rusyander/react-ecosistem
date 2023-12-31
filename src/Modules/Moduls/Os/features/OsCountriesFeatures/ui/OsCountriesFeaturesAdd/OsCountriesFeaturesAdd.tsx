import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsCountriesFeaturesAdd.module.scss';
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
import { getInitM } from 'shared/Globals/globalApi/globalApi';
import { OsCountriesAddModalContent } from 'Modules/Moduls/Os/entities/OsCountriesEntities';
import { addDataM } from '../../api/OsCountriesApi';

interface OsCountriesFeaturesAddProps {
  className?: string;
  refetchGridData?: () => void;
}

export const OsCountriesFeaturesAdd = memo(
  (props: OsCountriesFeaturesAddProps) => {
    const { className, refetchGridData } = props;
    const { t } = useTranslation('os');
    const [getInit, { data: getInitData, isLoading, isError }] = getInitM();
    const [addData, { data: addDataQ }] = addDataM();

    const [openModal, setOpenModal] = useState(false);

    const openModalFunction = useCallback(() => {
      setOpenModal(true);
    }, [setOpenModal]);

    const closeModalFunction = useCallback(() => {
      setOpenModal(false);
    }, [setOpenModal]);

    return (
      <div className={classNames(cls.osCountriesFeaturesAdd, {}, [className])}>
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
            <VStack max>
              {isLoading && <InputsDataSkeleton />}
              {isError && <IsError />}
              <OsCountriesAddModalContent
                closeModalFunction={closeModalFunction}
                getInit={getInit}
                saveData={addData}
                getInitData={getInitData}
                saveDataQ={addDataQ}
                refetchGridData={refetchGridData}
              />
            </VStack>
          )}
        </Modal>
      </div>
    );
  }
);
