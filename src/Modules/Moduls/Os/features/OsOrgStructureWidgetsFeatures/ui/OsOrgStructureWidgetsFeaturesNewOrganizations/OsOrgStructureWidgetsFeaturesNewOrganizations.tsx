import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsOrgStructureWidgetsFeaturesNewOrganizations.module.scss';
import {
  Button,
  HStack,
  InputsDataSkeleton,
  IsError,
  Modal,
  Texts,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { getInitM } from 'shared/Globals/globalApi/globalApi';
import { saveDataM } from '../../api/OsOrgStructureWidgets';
import { OsOrgStructureNewOrganizationsModelContent } from 'Modules/Moduls/Os/entities/OsOrgStructureWidgetsEntities';

interface OsOrgStructureWidgetsFeaturesNewOrganizationsProps {
  className?: string;
  refetchData?: () => void;
}

export const OsOrgStructureWidgetsFeaturesNewOrganizations = memo(
  (props: OsOrgStructureWidgetsFeaturesNewOrganizationsProps) => {
    const { className, refetchData } = props;
    const { t } = useTranslation('os');
    const [getInit, { data: getInitData, isLoading, isError }] = getInitM();
    const [saveData, { data: saveDataQ }] = saveDataM();

    const [openModal, setOpenModal] = useState(false);

    const openModalFunction = useCallback(() => {
      setOpenModal(true);
    }, [setOpenModal]);

    const closeModalFunction = useCallback(() => {
      setOpenModal(false);
    }, [setOpenModal]);

    return (
      <div
        className={classNames(
          cls.osOrgStructureWidgetsFeaturesNewOrganizations,
          {},
          [className]
        )}
      >
        <Button
          onClick={openModalFunction}
          theme="background"
          className={cls.addButtons}
        >
          <HStack gap="16">
            <Icon width={20} icon="zondicons:add-outline" />
            <Texts text={t('Добавить самостоятульную организацию')} />
          </HStack>
        </Button>

        <Modal isOpen={openModal} onClose={closeModalFunction} lazy>
          {openModal && (
            <VStack max>
              {isLoading && <InputsDataSkeleton />}
              {isError && <IsError />}
              <OsOrgStructureNewOrganizationsModelContent
                closeModalFunction={closeModalFunction}
                getInit={getInit}
                saveData={saveData}
                getInitData={getInitData}
                saveDataQ={saveDataQ}
                refetchData={refetchData}
              />
            </VStack>
          )}
        </Modal>
      </div>
    );
  }
);
