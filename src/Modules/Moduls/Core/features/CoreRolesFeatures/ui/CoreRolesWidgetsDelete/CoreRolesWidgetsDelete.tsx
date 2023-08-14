import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreRolesWidgetsDelete.module.scss';
import {
  Button,
  HStack,
  MessagesModal,
  Modal,
  Texts,
  classNames,
} from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { DeleteRoleM } from '../../api/roleApi';

interface CoreRolesWidgetsDeleteProps {
  className?: string;
  selectedField: any;
}

export const CoreRolesWidgetsDelete = memo(
  (props: CoreRolesWidgetsDeleteProps) => {
    const { className, selectedField } = props;
    const { t } = useTranslation('core');
    const [deleteRole] = DeleteRoleM();

    const [openModal, setOpenModal] = useState(false);

    const openModalFunction = () => {
      setOpenModal(true);
    };

    const closeModalFunction = useCallback(() => {
      setOpenModal(false);
    }, [setOpenModal]);
    const deleteRoles = () => {
      deleteRole(selectedField?.role_code).then((res: any) => {
        if (res?.data?.result === '1') {
          closeModalFunction();
        }
      });
    };
    console.log('selectedField ++++++++', selectedField);

    return (
      <div className={classNames(cls.coreRolesWidgetsDelete, {}, [className])}>
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
              subTitle={`${t('Вы действительно хотите удалить роль')} ${
                selectedField?.role_name
              }?`}
              onClose={closeModalFunction}
              onCall={deleteRoles}
            />
          </Modal>
        )}
      </div>
    );
  }
);
