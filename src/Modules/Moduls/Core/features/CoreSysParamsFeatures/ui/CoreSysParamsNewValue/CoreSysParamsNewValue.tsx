import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreSysParamsNewValue.module.scss';
import { Button, HStack, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { addDataM } from 'Modules/Moduls/Os/features/OsCountriesFeatures/api/OsCountriesApi';
import { getInitM } from 'shared/Globals/globalApi/globalApi';

interface CoreSysParamsNewValueProps {
  className?: string;
  selectedField: any;
}

export const CoreSysParamsNewValue = memo(
  (props: CoreSysParamsNewValueProps) => {
    const { className, selectedField } = props;
    const { t } = useTranslation('core');
    const [getInit, { data: getInitData }] = getInitM();
    const [addData, { data: addDataQ }] = addDataM();

    const [openModal, setOpenModal] = useState(false);

    const openModalFunction = useCallback(() => {
      setOpenModal(true);
    }, [setOpenModal]);

    const closeModalFunction = useCallback(() => {
      setOpenModal(false);
    }, [setOpenModal]);

    return (
      <div className={classNames(cls.coreSysParamsNewValue, {}, [className])}>
        <Button
          onClick={openModalFunction}
          theme="background"
          className={cls.addButtons}
        >
          <HStack gap="16">
            <Icon width={20} icon="zondicons:add-outline" />
            <Texts text={t('Задать значение')} />
          </HStack>
        </Button>

        {/* <Modal isOpen={openModal} onClose={closeModalFunction} lazy>
          {openModal && (
            <OsCountriesAddModalContent
              closeModalFunction={closeModalFunction}
              getInit={getInit}
              saveData={addData}
              getInitData={getInitData}
              saveDataQ={addDataQ}
            />
          )}
        </Modal> */}
      </div>
    );
  }
);
