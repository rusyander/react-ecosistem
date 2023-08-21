import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreRolesWidgetsEdit.module.scss';
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
import { CoreRolesWidgetsEditModalContent } from 'Modules/Moduls/Core/entities/CoreRolesEntities';
import { getInitM, getFgDataM } from 'shared/Globals/globalApi/globalApi';
import { AddDataRoleM } from '../../api/roleApi';

interface CoreRolesWidgetsEditProps {
  className?: string;
  selectedField: any;
  refetchGridData?: () => void;
}

export const CoreRolesWidgetsEdit = memo((props: CoreRolesWidgetsEditProps) => {
  const { className, selectedField, refetchGridData } = props;
  const { t } = useTranslation('core');

  const [getInit, { data: getInitData, isLoading, isError }] = getInitM();
  const [addDataRole, { data: addDataRoleQ, isSuccess }] = AddDataRoleM();
  const [getFgData] = getFgDataM();

  const [openModal, setOpenModal] = useState(false);

  const openModalFunction = () => {
    setOpenModal(true);
  };

  const closeModalFunction = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  return (
    <div className={classNames(cls.coreRolesWidgetsEdit, {}, [className])}>
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
      {isSuccess && <Toast isEdit />}
      <Modal isOpen={openModal} onClose={closeModalFunction}>
        {openModal && (
          <VStack max>
            {isLoading && <InputsDataSkeleton />}
            {isError && <IsError />}
            <CoreRolesWidgetsEditModalContent
              selectedField={selectedField}
              closeModalFunction={closeModalFunction}
              getInit={getInit}
              addDataRole={addDataRole}
              getFgData={getFgData}
              getInitData={getInitData}
              addDataRoleQ={addDataRoleQ}
              refetchGridData={refetchGridData}
            />
          </VStack>
        )}
      </Modal>
    </div>
  );
});
