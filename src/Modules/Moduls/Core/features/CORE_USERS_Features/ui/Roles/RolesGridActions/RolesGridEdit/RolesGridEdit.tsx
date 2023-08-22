import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './RolesGridEdit.module.scss';
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
import { getFgDataM, getInitM } from 'shared/Globals/globalApi/globalApi';
import { SaveDataRoleM, InitPolicyDataRoleM } from '../../../../api/roleApi';
import { RolesGridEditModalContent } from 'Modules/Moduls/Core/entities/CoreUsersEntities';

interface RolesGridEditProps {
  className?: string;
  selectedField: any;
  refetchGridData?: () => void;
}

export const RolesGridEdit = memo((props: RolesGridEditProps) => {
  const { className, selectedField, refetchGridData } = props;
  const { t } = useTranslation('core');

  const [saveDataRole, { data: saveDataRoleData }] = SaveDataRoleM();
  const [initPolicyDataRole, { data: initPolicyDataRoleData }] =
    InitPolicyDataRoleM();
  const [getFgData] = getFgDataM();

  const [getInit, { data: getInitData, isLoading, isError }] = getInitM();

  const [openEditModal, setOpenEditModal] = useState(false);

  const openModalFunction = () => {
    setOpenEditModal(true);
  };

  const closeModalFunction = useCallback(() => {
    setOpenEditModal(false);
  }, [setOpenEditModal]);

  return (
    <div className={classNames(cls.rolesGridEdit, {}, [className])}>
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

      {openEditModal && (
        <Modal zIndex={113} isOpen={openEditModal} onClose={closeModalFunction}>
          {openEditModal && (
            <VStack max>
              {isLoading && <InputsDataSkeleton />}
              {isError && <IsError />}
              <RolesGridEditModalContent
                selectedField={selectedField}
                closeModalFunction={closeModalFunction}
                saveDataRole={saveDataRole}
                saveDataRoleData={saveDataRoleData}
                initPolicyDataRole={initPolicyDataRole}
                initPolicyDataRoleData={initPolicyDataRoleData}
                getFgData={getFgData}
                getInit={getInit}
                getInitData={getInitData}
                refetchGridData={refetchGridData}
              />
            </VStack>
          )}
        </Modal>
      )}
    </div>
  );
});
