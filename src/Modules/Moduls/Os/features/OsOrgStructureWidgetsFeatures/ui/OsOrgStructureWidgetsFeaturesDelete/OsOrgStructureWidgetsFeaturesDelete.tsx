import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsOrgStructureWidgetsFeaturesDelete.module.scss';
import {
  Button,
  HStack,
  MessagesModal,
  Modal,
  Texts,
  classNames,
} from 'Modules/UiKit';
import { Icon } from '@iconify/react';

interface OsOrgStructureWidgetsFeaturesDeleteProps {
  className?: string;
  selectedField: any;
}

export const OsOrgStructureWidgetsFeaturesDelete = memo(
  (props: OsOrgStructureWidgetsFeaturesDeleteProps) => {
    const { className, selectedField } = props;
    const { t } = useTranslation('os');
    // const [deleteUserRoleData] = DeleteUserRoleDataM();
    // console.log('selectedField', selectedField);

    const [openModal, setOpenModal] = useState(false);

    const openModalFunction = () => {
      setOpenModal(true);
    };

    const closeModalFunction = useCallback(() => {
      setOpenModal(false);
    }, [setOpenModal]);
    const deleteRole = () => {
      // deleteUserRoleData(selectedField?.user_role_id).then((res: any) => {
      //   if (res?.data?.result === '1') {
      //     closeModalFunction();
      //   }
      // });
    };

    return (
      <div
        className={classNames(cls.osOrgStructureWidgetsFeaturesDelete, {}, [
          className,
        ])}
      >
        <Button
          onClick={openModalFunction}
          theme="background"
          disabled={!selectedField}
          className={cls.addButtons}
        >
          <HStack gap="16">
            <Icon width={20} icon="mi:delete" />
            <Texts text={t('Удалить')} />
          </HStack>
        </Button>

        {openModal && (
          <Modal zIndex={113} isOpen={openModal} onClose={closeModalFunction}>
            <MessagesModal
              title={t('Внимание')}
              subTitle={`${t('Вы действительно хотите удалить организацию')} ${
                selectedField?.name
              }`}
              onClose={closeModalFunction}
              onCall={deleteRole}
            />
          </Modal>
        )}
      </div>
    );
  }
);
