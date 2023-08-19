import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreSysParamsNewValue.module.scss';
import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { initSysParValuesM, saveDataM } from '../../api/CoreSysParamsApi';
import { CoreSysParamsNewValueModalContent } from 'Modules/Moduls/Core/entities/CoreSysParamsEntities';

interface CoreSysParamsNewValueProps {
  className?: string;
  selectedField: any;
  fildValue: any;
}

export const CoreSysParamsNewValue = memo(
  (props: CoreSysParamsNewValueProps) => {
    const { className, selectedField, fildValue } = props;
    const { t } = useTranslation('core');
    const [initSysParValues, { data: initSysParValuesQ }] = initSysParValuesM();
    const [saveData, { data: saveDataQ }] = saveDataM();

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
          disabled={!selectedField}
        >
          <HStack gap="16">
            <Icon width={20} icon="zondicons:add-outline" />
            <Texts text={t('Задать значение')} />
          </HStack>
        </Button>

        <Modal isOpen={openModal} onClose={closeModalFunction} lazy>
          {openModal && (
            <CoreSysParamsNewValueModalContent
              closeModalFunction={closeModalFunction}
              getInit={initSysParValues}
              saveData={saveData}
              getInitData={initSysParValuesQ}
              saveDataQ={saveDataQ}
              fildValue={fildValue}
              selectedField={selectedField}
            />
          )}
        </Modal>
      </div>
    );
  }
);
