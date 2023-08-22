import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsSubregionsDelete.module.scss';
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
import { deleteDataM } from '../../api/OsSubregions';

interface OsSubregionsDeleteProps {
  className?: string;
  selectedField: any;
  refetchGridData?: () => void;
}

export const OsSubregionsDelete = memo((props: OsSubregionsDeleteProps) => {
  const { className, selectedField, refetchGridData } = props;
  const { t } = useTranslation('os');
  const [deleteData, { isError }] = deleteDataM();
  const [isErrored, setIsErrored] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const openModalFunction = () => {
    setOpenModal(true);
  };

  const closeModalFunction = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);
  const deleteRole = () => {
    deleteData(selectedField?.subregion_id).then((res: any) => {
      if (res?.data?.result === '1') {
        refetchGridData?.();
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
    <div className={classNames(cls.osSubregionsDelete, {}, [className])}>
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
      {isError && <IsError />}
      {isErrored && <ErrorMessage isDelete isOpen setIsError={setIsErrored} />}
      {isSuccess && <Toast isDelete />}

      {openModal && (
        <Modal zIndex={113} isOpen={openModal} onClose={closeModalFunction}>
          <MessagesModal
            title={t('Внимание')}
            subTitle={t('Вы уверены?')}
            onClose={closeModalFunction}
            onCall={deleteRole}
          />
        </Modal>
      )}
    </div>
  );
});
