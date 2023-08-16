import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './FormsAndActions.module.scss';
import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { FormsAndActionsModalContents } from 'Modules/Moduls/Core/entities/CoreRolesEntities';
import { getAccessTreeM } from 'shared/Globals/globalApi/globalApi';

interface FormsAndActionsProps {
  className?: string;
  selectedField?: string;
}

export const FormsAndActions = memo((props: FormsAndActionsProps) => {
  const { className, selectedField } = props;
  const { t } = useTranslation('core');

  // const [getInit, { data: getInitData }] = getInitM();
  // const [addDataRole, { data: addDataRoleQ }] = AddDataRoleM();
  // const [getFgData] = getFgDataM();

  const [getAccessTree, { data: getAccessTreeData }] = getAccessTreeM();

  const [openModal, setOpenModal] = useState(false);

  const openModalFunction = () => {
    setOpenModal(true);
  };

  const closeModalFunction = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  return (
    <div className={classNames(cls.formsAndActions, {}, [className])}>
      <Button
        onClick={openModalFunction}
        theme="background"
        // disabled={!selectedField}
        className={cls.addButtons}
      >
        <HStack gap="16">
          <Icon width={20} icon="fluent:form-48-regular" />
          <Texts text={t('Формы и действия')} />
        </HStack>
      </Button>

      <Modal isOpen={openModal} onClose={closeModalFunction}>
        {openModal && (
          <FormsAndActionsModalContents
            selectedField={selectedField}
            closeModalFunction={closeModalFunction}
            getAccessTree={getAccessTree}
            getAccessTreeData={getAccessTreeData}
            // getInit={getInit}
            // addDataRole={addDataRole}
            // getFgData={getFgData}
            // getInitData={getInitData}
            // addDataRoleQ={addDataRoleQ}
          />
        )}
      </Modal>
    </div>
  );
});
