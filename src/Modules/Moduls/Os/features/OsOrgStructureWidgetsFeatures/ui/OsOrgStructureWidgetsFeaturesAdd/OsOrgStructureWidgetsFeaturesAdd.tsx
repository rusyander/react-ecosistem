import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsOrgStructureWidgetsFeaturesAdd.module.scss';
import {
  Button,
  HStack,
  InputsDataSkeleton,
  IsError,
  Modal,
  Texts,
  Toast,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { OsOrgStructureAddModalContent } from 'Modules/Moduls/Os/entities/OsOrgStructureWidgetsEntities';
import { getInitM } from 'shared/Globals/globalApi/globalApi';
import { saveDataM } from '../../api/OsOrgStructureWidgets';

interface OsOrgStructureWidgetsFeaturesAddProps {
  className?: string;
  selectedField: any;
  refetchData?: () => void;
}

export const OsOrgStructureWidgetsFeaturesAdd = memo(
  (props: OsOrgStructureWidgetsFeaturesAddProps) => {
    const { className, selectedField = undefined, refetchData } = props;
    const { t } = useTranslation('os');
    const [getInit, { data: getInitData, isLoading, isError }] = getInitM();
    const [saveData, { data: saveDataQ, isSuccess }] = saveDataM();

    const [openModal, setOpenModal] = useState(false);

    const openModalFunction = useCallback(() => {
      setOpenModal(true);
    }, [setOpenModal]);

    const closeModalFunction = useCallback(() => {
      setOpenModal(false);
    }, [setOpenModal]);

    return (
      <div
        className={classNames(cls.osOrgStructureWidgetsFeaturesAdd, {}, [
          className,
        ])}
      >
        <Button
          onClick={openModalFunction}
          theme="background"
          className={cls.addButtons}
          disabled={!selectedField}
        >
          <HStack gap="16">
            <Icon width={20} icon="zondicons:add-outline" />
            <Texts text={t('Добавить')} />
          </HStack>
        </Button>

        {/* {isSuccess && <Toast isAdd />} */}
        <Modal isOpen={openModal} onClose={closeModalFunction} lazy>
          {openModal && (
            <VStack>
              {isLoading && <InputsDataSkeleton />}
              {isError && <IsError />}
              <OsOrgStructureAddModalContent
                selectedField={selectedField}
                closeModalFunction={closeModalFunction}
                getInit={getInit}
                saveData={saveData}
                getInitData={getInitData}
                saveDataQ={saveDataQ}
                refetchData={refetchData}
              />
            </VStack>
          )}
        </Modal>
      </div>
    );
  }
);
