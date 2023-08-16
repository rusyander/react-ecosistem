import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreRolesWidgetsAdd.module.scss';
import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { CoreRolesWidgetsAddModalContent } from 'Modules/Moduls/Core/entities/CoreRolesEntities';
import { getInitM } from 'shared/Globals/globalApi/globalApi';
import { AddDataRoleM } from '../../api/roleApi';

interface CoreRolesWidgetsAddProps {
  className?: string;
}

export const CoreRolesWidgetsAdd = memo((props: CoreRolesWidgetsAddProps) => {
  const { className } = props;
  const { t } = useTranslation('core');
  const [getInit, { data: getInitData }] = getInitM();
  const [addDataRole, { data: addDataRoleQ }] = AddDataRoleM();

  const [openModal, setOpenModal] = useState(false);

  const openModalFunction = useCallback(() => {
    setOpenModal(true);
  }, [setOpenModal]);

  const closeModalFunction = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  return (
    <div className={classNames(cls.coreRolesWidgetsAdd, {}, [className])}>
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
          <CoreRolesWidgetsAddModalContent
            closeModalFunction={closeModalFunction}
            getInit={getInit}
            addDataRole={addDataRole}
            getInitData={getInitData}
            addDataRoleQ={addDataRoleQ}
          />
        )}
      </Modal>
    </div>
  );
});
