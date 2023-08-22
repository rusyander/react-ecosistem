import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreAuditSessionsFeatures.module.scss';
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
import { KillSessionM } from '../../../../widgets/CoreAuditSessionsWidgets/api/CoreAuditSessionsWidgets';

interface CoreAuditSessionsFeaturesProps {
  className?: string;
  selectedField: any;
  refetchGridData?: () => void;
}

export const CoreAuditSessionsFeatures = memo(
  (props: CoreAuditSessionsFeaturesProps) => {
    const { className, selectedField, refetchGridData } = props;
    const { t } = useTranslation('core');
    const [killSession, { isSuccess }] = KillSessionM();
    const [isErrored, setIsErrored] = useState(false);

    const [openModal, setOpenModal] = useState(false);

    const openModalFunction = () => {
      setOpenModal(true);
    };

    const closeModalFunction = useCallback(() => {
      setOpenModal(false);
    }, [setOpenModal]);
    const deleteRole = () => {
      killSession(selectedField?.login_id).then((res: any) => {
        if (res?.data?.result === '1') {
          refetchGridData?.();
          closeModalFunction();
        } else {
          setIsErrored(true);
        }
      });
    };

    return (
      <div
        className={classNames(cls.coreAuditSessionsFeatures, {}, [className])}
      >
        <Button
          onClick={openModalFunction}
          theme="background"
          disabled={!selectedField}
          className={cls.addButtons}
        >
          <HStack gap="16">
            <Texts text={t('Завершить сеанс')} />
          </HStack>
        </Button>
        {isSuccess && <Toast isDelete />}

        <Modal zIndex={113} isOpen={openModal} onClose={closeModalFunction}>
          {isErrored && (
            <ErrorMessage isDelete isOpen setIsError={setIsErrored} />
          )}
          {openModal && (
            <MessagesModal
              title={t('Внимание')}
              subTitle={t(
                'Вы действительно хотите завершить сеанс Системный администратор?'
              )}
              onClose={closeModalFunction}
              onCall={deleteRole}
            />
          )}
        </Modal>
      </div>
    );
  }
);
