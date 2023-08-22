import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreSysParamsAllValue.module.scss';
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
import {
  getAttrValuesM,
  getSysParValuesGridDataM,
} from '../../api/CoreSysParamsApi';
import { CoreSysParamsAllValueModalContent } from 'Modules/Moduls/Core/entities/CoreSysParamsEntities';

interface CoreSysParamsAllValueProps {
  className?: string;
  selectedField: any;
}

export const CoreSysParamsAllValue = memo(
  (props: CoreSysParamsAllValueProps) => {
    const { className, selectedField } = props;
    const { t } = useTranslation('core');
    const [getAttrValues, { data: getAttrValuesQ }] = getAttrValuesM();
    const [
      getSysParValuesGridData,
      { data: getSysParValuesGridDataQ, isLoading, isError },
    ] = getSysParValuesGridDataM();

    const [openModal, setOpenModal] = useState(false);

    const openModalFunction = useCallback(() => {
      setOpenModal(true);
    }, [setOpenModal]);

    const closeModalFunction = useCallback(() => {
      setOpenModal(false);
    }, [setOpenModal]);

    return (
      <div className={classNames(cls.coreSysParamsAllValue, {}, [className])}>
        <Button
          onClick={openModalFunction}
          theme="background"
          className={cls.addButtons}
          disabled={!selectedField}
        >
          <HStack gap="16">
            <Icon width={20} icon="zondicons:add-outline" />
            <Texts text={t('Все значения')} />
          </HStack>
        </Button>

        <Modal isOpen={openModal} onClose={closeModalFunction} lazy>
          {openModal && (
            <VStack max>
              {isLoading && <InputsDataSkeleton />}
              {isError && <IsError />}
              <CoreSysParamsAllValueModalContent
                closeModalFunction={closeModalFunction}
                getAttrValues={getAttrValues}
                getAttrValuesQ={getAttrValuesQ}
                getSysParValuesGridData={getSysParValuesGridData}
                getSysParValuesGridDataQ={getSysParValuesGridDataQ}
                selectedField={selectedField}
              />
            </VStack>
          )}
        </Modal>
      </div>
    );
  }
);
