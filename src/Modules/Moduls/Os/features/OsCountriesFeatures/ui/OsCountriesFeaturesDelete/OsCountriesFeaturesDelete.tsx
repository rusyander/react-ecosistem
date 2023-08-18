import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsCountriesFeaturesDelete.module.scss';
import {
  Button,
  HStack,
  MessagesModal,
  Modal,
  Texts,
  classNames,
} from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { deleteDataM } from '../../api/OsCountriesApi';

interface OsCountriesFeaturesDeleteProps {
  className?: string;
  selectedField: any;
}

export const OsCountriesFeaturesDelete = memo(
  (props: OsCountriesFeaturesDeleteProps) => {
    const { className, selectedField } = props;
    const { t } = useTranslation('os');
    const [deleteData] = deleteDataM();
    // console.log('selectedField', selectedField);

    const [openModal, setOpenModal] = useState(false);

    const openModalFunction = () => {
      setOpenModal(true);
    };

    const closeModalFunction = useCallback(() => {
      setOpenModal(false);
    }, [setOpenModal]);
    const deleteRole = () => {
      deleteData(selectedField?.country_code).then((res: any) => {
        if (res?.data?.result === '1') {
          closeModalFunction();
        }
      });
    };

    return (
      <div
        className={classNames(cls.osCountriesFeaturesDelete, {}, [className])}
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
              subTitle={t('Вы уверены?')}
              onClose={closeModalFunction}
              onCall={deleteRole}
            />
          </Modal>
        )}
      </div>
    );
  }
);
