import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsOrgStructureWidgetsFeaturesEdit.module.scss';
import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { AddDataRoleM } from 'Modules/Moduls/Core/features/CoreRolesFeatures/api/roleApi';
import { getInitM, getFgDataM } from 'shared/Globals/globalApi/globalApi';
import { saveDataM } from '../../api/OsOrgStructureWidgets';
import { OsOrgStructureEditModalContent } from 'Modules/Moduls/Os/entities/OsOrgStructureWidgetsEntities';

interface OsOrgStructureWidgetsFeaturesEditProps {
  className?: string;
  selectedField: any;
}

export const OsOrgStructureWidgetsFeaturesEdit = memo(
  (props: OsOrgStructureWidgetsFeaturesEditProps) => {
    const { className, selectedField } = props;
    const { t } = useTranslation('os');

    const [getInit, { data: getInitData }] = getInitM();
    const [saveData, { data: saveDataQ }] = saveDataM();
    const [getFgData] = getFgDataM();

    const [openModal, setOpenModal] = useState(false);

    const openModalFunction = () => {
      setOpenModal(true);
    };

    const closeModalFunction = useCallback(() => {
      setOpenModal(false);
    }, [setOpenModal]);

    return (
      <div
        className={classNames(cls.osOrgStructureWidgetsFeaturesEdit, {}, [
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
            <Icon width={20} icon="clarity:edit-line" />
            <Texts text={t('Редактировать')} />
          </HStack>
        </Button>

        <Modal isOpen={openModal} onClose={closeModalFunction}>
          {openModal && (
            <OsOrgStructureEditModalContent
              selectedField={selectedField}
              closeModalFunction={closeModalFunction}
              getInit={getInit}
              saveData={saveData}
              getFgData={getFgData}
              getInitData={getInitData}
              saveDataQ={saveDataQ}
            />
          )}
        </Modal>
      </div>
    );
  }
);
