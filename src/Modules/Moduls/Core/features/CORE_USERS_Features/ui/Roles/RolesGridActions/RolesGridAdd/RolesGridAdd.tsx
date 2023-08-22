import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './RolesGridAdd.module.scss';
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
import { SaveDataRoleM, InitPolicyDataRoleM } from '../../../../api/roleApi';
import { RolesGridAddModalContent } from 'Modules/Moduls/Core/entities/CoreUsersEntities';

interface RolesGridAddProps {
  className?: string;
  refetchGridData: () => void;
}

export const RolesGridAdd = memo((props: RolesGridAddProps) => {
  const { className, refetchGridData } = props;
  const { t } = useTranslation('core');

  const [saveDataRole, { data: saveDataRoleData }] = SaveDataRoleM();
  const [initPolicyDataRole, { data: initPolicyDataRoleData }] =
    InitPolicyDataRoleM();
  const [getInit, { data: getInitData, isLoading, isError }] = getInitM();

  const [openAddModal, setOpenAddModal] = useState(false);

  const openModalFunction = useCallback(() => {
    setOpenAddModal(true);
  }, [setOpenAddModal]);

  const closeModalFunction = useCallback(() => {
    setOpenAddModal(false);
  }, [setOpenAddModal]);

  return (
    <div className={classNames(cls.rolesGridAdd, {}, [className])}>
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

      <Modal
        isOpen={openAddModal}
        zIndex={113}
        onClose={closeModalFunction}
        lazy
      >
        {openAddModal && (
          <VStack max>
            {isLoading && <InputsDataSkeleton />}
            {isError && <IsError />}
            <RolesGridAddModalContent
              closeModalFunction={closeModalFunction}
              saveDataRole={saveDataRole}
              saveDataRoleData={saveDataRoleData}
              initPolicyDataRole={initPolicyDataRole}
              initPolicyDataRoleData={initPolicyDataRoleData}
              getInit={getInit}
              getInitData={getInitData}
              refetchGridData={refetchGridData}
            />
          </VStack>
        )}
      </Modal>
    </div>
  );
});
