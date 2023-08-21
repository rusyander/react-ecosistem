import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './FormsAndActions.module.scss';
import {
  Button,
  CheckFormEnterM,
  HStack,
  IsError,
  Modal,
  Texts,
  Toast,
  TreeDataSkeleton,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { FormsAndActionsModalContents } from 'Modules/Moduls/Core/entities/CoreRolesEntities';
import { SaveAccessDataM, getAccessTreeM } from '../../api/roleApi';

interface FormsAndActionsProps {
  className?: string;
  selectedField?: string;
}

export const FormsAndActions = memo((props: FormsAndActionsProps) => {
  const { className, selectedField } = props;
  const { t } = useTranslation('core');

  const [getAccessTree, { data: getAccessTreeData, isLoading, error }] =
    getAccessTreeM();
  const [saveAccessData, { isSuccess }] = SaveAccessDataM();

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
        disabled={!selectedField}
        className={cls.addButtons}
      >
        <HStack gap="16">
          <Icon width={20} icon="fluent:form-48-regular" />
          <Texts text={t('Формы и действия')} />
        </HStack>
      </Button>
      {isSuccess && <Toast isEdit />}

      <Modal isOpen={openModal} onClose={closeModalFunction}>
        {openModal && (
          <VStack max>
            <CheckFormEnterM checkFormEnterName={'CORE_ROLE_FORMS_ACTIONS'} />

            {isLoading && <TreeDataSkeleton />}
            {error && <IsError />}
            <FormsAndActionsModalContents
              selectedField={selectedField}
              closeModalFunction={closeModalFunction}
              getAccessTree={getAccessTree}
              getAccessTreeData={getAccessTreeData}
              saveAccessData={saveAccessData}
            />
          </VStack>
        )}
      </Modal>
    </div>
  );
});
