import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreRolesWidgetsDelete.module.scss';
import {
  Button,
  ErrorMessage,
  HStack,
  MessagesModal,
  Modal,
  Texts,
  Toast,
  classNames,
} from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { DeleteRoleM } from '../../api/roleApi';

interface CoreRolesWidgetsDeleteProps {
  className?: string;
  selectedField: any;
  refetchGridData?: () => void;
}

export const CoreRolesWidgetsDelete = memo(
  (props: CoreRolesWidgetsDeleteProps) => {
    const { className, selectedField, refetchGridData } = props;
    const { t } = useTranslation('core');
    const [deleteRole] = DeleteRoleM();

    const [openModal, setOpenModal] = useState(false);

    const [isToast, setIsToast] = useState(false);
    const [isErrored, setIsErrored] = useState(false);

    const openModalFunction = () => {
      setOpenModal(true);
    };

    const closeModalFunction = useCallback(() => {
      setOpenModal(false);
    }, [setOpenModal]);
    const deleteRoles = () => {
      deleteRole(selectedField?.role_code).then((res: any) => {
        if (res?.data?.result === '1') {
          refetchGridData?.();
          closeModalFunction();
          setIsToast(false);
          setTimeout(() => {
            setIsToast(true);
          }, 3000);
        } else {
          setIsErrored(true);
        }
      });
    };

    return (
      <div className={classNames(cls.coreRolesWidgetsDelete, {}, [className])}>
        {isToast && <Toast isDelete />}
        {isErrored && (
          <ErrorMessage isDelete isOpen setIsError={setIsErrored} />
        )}
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
