import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsOrgStructureWidgetsFeaturesDelete.module.scss';
import {
  Button,
  ErrorMessage,
  HStack,
  IsError,
  MessagesModal,
  Modal,
  Texts,
  Toast,
  classNames,
} from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { deleteDataM } from '../../api/OsOrgStructureWidgets';

interface OsOrgStructureWidgetsFeaturesDeleteProps {
  className?: string;
  selectedField: any;
  refetchData?: () => void;
}

export const OsOrgStructureWidgetsFeaturesDelete = memo(
  (props: OsOrgStructureWidgetsFeaturesDeleteProps) => {
    const { className, selectedField, refetchData } = props;
    const { t } = useTranslation('os');
    const [deleteData, { isError }] = deleteDataM();

    const [openModal, setOpenModal] = useState(false);
    const [isErrored, setIsErrored] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const openModalFunction = () => {
      setOpenModal(true);
    };

    const closeModalFunction = useCallback(() => {
      setOpenModal(false);
    }, [setOpenModal]);
    const deleteRole = () => {
      deleteData(selectedField?.organizationId).then((res: any) => {
        if (res?.data?.result === '1') {
          refetchData?.();
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            closeModalFunction();
          }, 1000);
        } else {
          setIsErrored(true);
        }
      });
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
        {isErrored && (
          <ErrorMessage isDelete isOpen setIsError={setIsErrored} />
        )}
        {isSuccess && <Toast isDelete />}
        {isError && <IsError />}

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
